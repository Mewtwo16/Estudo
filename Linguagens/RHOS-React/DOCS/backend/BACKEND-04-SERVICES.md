# ⚙️ Documentação do Backend - RH-OS

## Parte 4: Serviços e Lógica de Negócio

---

## Índice

1. [Visão Geral](#visão-geral)
2. [AuthService](#authservice)
3. [UserService](#userservice)
4. [RoleService](#roleservice)
5. [LogService](#logservice)
6. [Padrões de Service](#padrões-de-service)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Transações](#transações)

---

## 1. Visão Geral

A **Service Layer** é o coração da aplicação, onde toda a lógica de negócio reside. Services são classes singleton que:

- ✅ Encapsulam operações complexas
- ✅ Gerenciam transações do banco
- ✅ Implementam regras de negócio
- ✅ Registram logs de auditoria
- ✅ Retornam respostas padronizadas

### Diagrama de Fluxo

```
Route Handler
     ↓
   Service
     ↓
   ┌─────────────────┐
   │  Validações     │
   └────────┬────────┘
            ↓
   ┌─────────────────┐
   │   Transação     │
   │  ┌──────────┐   │
   │  │ Query 1  │   │
   │  │ Query 2  │   │
   │  │ Query 3  │   │
   │  │   Log    │   │
   │  └──────────┘   │
   │   Commit/       │
   │   Rollback      │
   └────────┬────────┘
            ↓
   { success, message, data }
```

---

## 2. AuthService

**Arquivo**: `src/main/services/authService.ts`

**Propósito**: Gerencia autenticação e geração de tokens JWT.

### 2.1 Método: login()

```typescript
async login(usuario: string, senha: string): Promise<LoginResponse>
```

**Fluxo Completo**:

```
1. Busca usuário por login
   ↓
2. Valida existência
   ↓
3. Verifica status (ativo/inativo)
   ↓
4. Compara senha (bcrypt.compare)
   ↓
5. Busca permissões do usuário
   ↓
6. Busca cargos do usuário
   ↓
7. Gera token JWT (8h de expiração)
   ↓
8. Registra log de sucesso
   ↓
9. Retorna { success: true, token }
```

**Código Completo**:

```typescript
async login(usuario: string, senha: string): Promise<LoginResponse> {
  try {
    // 1. Busca usuário
    const user = await db('users').where({ login: usuario }).first()
    
    if (!user) {
      await logService.write({
        user_id: null,
        who: usuario,
        where: 'auth',
        what: 'Login failed: user not found'
      })
      return { success: false, message: 'Usuário inválido ou inexistente' }
    }

    // 2. Verifica status
    if (user.status !== 1) {
      await logService.write({
        user_id: user.id,
        who: usuario,
        where: 'auth',
        what: 'Login failed: user inactive'
      })
      return { success: false, message: 'Usuário desativado' }
    }
    
    // 3. Compara senha
    const senhaOk = await bcrypt.compare(senha, user.password_hash)
    
    if (!senhaOk) {
      await logService.write({
        user_id: user.id,
        who: usuario,
        where: 'auth',
        what: 'Login failed: invalid password'
      })
      return { success: false, message: 'Senha inválida' }
    }

    // 4. Busca permissões e cargos
    const permissions = await this.getUserPermissions(user.id)
    const roles = await this.getUserRoles(user.id)

    // 5. Valida JWT_SECRET
    const secret = process.env.JWT_SECRET
    if (!secret) {
      return { success: false, message: 'Configuração interna ausente (JWT_SECRET)' }
    }

    // 6. Gera JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        user: user.login, 
        role: roles, 
        perm: permissions 
      },
      secret,
      { expiresIn: '8h' }
    )
    
    // 7. Log de sucesso
    await logService.write({
      user_id: user.id,
      who: usuario,
      where: 'auth',
      what: 'Login successful'
    })
    
    return { success: true, message: 'Login bem-sucedido', token }
    
  } catch (error) {
    return { success: false, message: 'Falha interna ao autenticar' }
  }
}
```

### 2.2 Métodos Privados

#### getUserPermissions()

```typescript
private async getUserPermissions(userId: number): Promise<string[]> {
  try {
    const permissions = await db('allowed')
      .join('roles_allowed', 'allowed.id', '=', 'roles_allowed.allowed_id')
      .join('role_users', 'roles_allowed.roles_id', '=', 'role_users.roles_id')
      .where('role_users.users_id', userId)
      .distinct('allowed.permission_name')
      .pluck('permission_name')
    
    return permissions as string[]
  } catch {
    return []
  }
}
```

**Query SQL Equivalente**:
```sql
SELECT DISTINCT a.permission_name
FROM allowed a
JOIN roles_allowed ra ON a.id = ra.allowed_id
JOIN role_users ru ON ra.roles_id = ru.roles_id
WHERE ru.users_id = ?
```

#### getUserRoles()

```typescript
private async getUserRoles(userId: number): Promise<string[]> {
  try {
    const roles = await db('roles')
      .join('role_users', 'roles.id', '=', 'role_users.roles_id')
      .where('role_users.users_id', userId)
      .distinct('roles.role_name')
      .pluck('role_name')
    
    return roles as string[]
  } catch {
    return []
  }
}
```

**Query SQL Equivalente**:
```sql
SELECT DISTINCT r.role_name
FROM roles r
JOIN role_users ru ON r.id = ru.roles_id
WHERE ru.users_id = ?
```

### 2.3 Casos de Uso

```typescript
// Login bem-sucedido
const result = await authService.login('admin', 'admin123')
// { 
//   success: true, 
//   message: "Login bem-sucedido",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
// }

// Usuário não encontrado
const result = await authService.login('usuario_inexistente', 'senha')
// { success: false, message: "Usuário inválido ou inexistente" }

// Senha incorreta
const result = await authService.login('admin', 'senha_errada')
// { success: false, message: "Senha inválida" }

// Usuário inativo
const result = await authService.login('usuario_inativo', 'senha_correta')
// { success: false, message: "Usuário desativado" }
```

---

## 3. UserService

**Arquivo**: `src/main/services/userService.ts`

**Propósito**: CRUD de usuários com associação de cargos.

### 3.1 Método: addUser()

```typescript
async addUser(userData: addUser, loggedUser?: AuthUser): Promise<AnyResponse>
```

**Fluxo**:

```
1. Hash da senha (bcrypt, 10 salt rounds)
   ↓
2. Inicia transação
   ↓
3. Insere usuário na tabela users
   ↓
4. Busca cargo por nome
   ↓
5. Associa usuário ao cargo (role_users)
   ↓
6. Registra log
   ↓
7. Commit
   ↓
8. Retorna { success: true }
```

**Código**:

```typescript
async addUser(userData: addUser, loggedUser?: AuthUser): Promise<AnyResponse> {
  try {
    const senhaHash = await bcrypt.hash(userData.password, 10)
    
    await db.transaction(async (trx) => {
      // Inserir usuário
      const [newUserID] = await trx('users').insert({
        full_name: userData.full_name,
        email: userData.email,
        cpf: userData.cpf,
        birth_date: userData.birth_date,
        login: userData.user,
        password_hash: senhaHash,
        status: userData.status,
        creation_date: new Date()
      })

      // Buscar cargo
      const role = await trx('roles').where({ role_name: userData.role }).first()
      if (!role) throw new Error(`Cargo '${userData.role}' não encontrado`)

      // Associar cargo
      await trx('role_users').insert({
        users_id: newUserID,
        roles_id: role.id
      })

      // Log
      await logService.write({
        user_id: loggedUser?.id || null,
        who: loggedUser?.usuario || 'system',
        where: 'users',
        what: `Criou usuário ${userData.user} com cargo ${userData.role}`
      }, trx)
    })

    return { success: true, message: 'Usuário criado com sucesso' }
  } catch (error: any) {
    return { success: false, message: error.message || 'Erro ao criar usuário' }
  }
}
```

### 3.2 Método: showUser()

```typescript
async showUser(options: {
  id?: number
  full_name?: string
  email?: string
  login?: string
  cpf?: string
  role?: string
})
```

**Busca Usuário por um dos Parâmetros**:

```typescript
const query = db('users as u')
  .leftJoin('role_users as ru', 'ru.users_id', 'u.id')
  .leftJoin('roles as r', 'r.id', 'ru.roles_id')
  .select(
    'u.id',
    'u.full_name',
    'u.email',
    'u.login',
    'u.cpf',
    'u.birth_date',
    'u.status',
    db.raw('COALESCE(r.role_name, "") as role')
  )

if (options.id) query.where('u.id', options.id)
else if (options.full_name) query.where('u.full_name', 'like', `%${options.full_name}%`)
else if (options.email) query.where('u.email', 'like', `%${options.email}%`)
else if (options.login) query.where('u.login', 'like', `%${options.login}%`)
else if (options.cpf) query.where('u.cpf', 'like', `${options.cpf.replace(/\D+/g, '')}%`)
else if (options.role) query.where('r.role_name', 'like', `%${options.role}%`)
else return null

return await query.first()
```

**Exemplos de Uso**:

```typescript
// Por ID
const user = await userService.showUser({ id: 1 })

// Por nome (parcial)
const user = await userService.showUser({ full_name: 'João' })

// Por email
const user = await userService.showUser({ email: 'joao@email.com' })

// Por cargo
const user = await userService.showUser({ role: 'Administrador' })
```

### 3.3 Método: listAllUsers()

```typescript
async listAllUsers()
```

**Lista Todos os Usuários com Cargos**:

```typescript
const users = await db('users as u')
  .leftJoin('role_users as ru', 'ru.users_id', 'u.id')
  .leftJoin('roles as r', 'r.id', 'ru.roles_id')
  .select(
    'u.id',
    'u.full_name',
    'u.email',
    'u.login',
    'u.cpf',
    'u.birth_date',
    'u.status',
    'u.creation_date',
    db.raw('COALESCE(r.role_name, "") as role')
  )
  .orderBy('u.full_name', 'asc')

return users
```

### 3.4 Método: updateUser()

```typescript
async updateUser(
  userId: number, 
  userData: Partial<addUser>, 
  loggedUser?: AuthUser
): Promise<AnyResponse>
```

**Fluxo**:

```
1. Inicia transação
   ↓
2. Verifica se usuário existe
   ↓
3. Monta objeto com campos a atualizar
   ↓
4. Hash de senha (se fornecida)
   ↓
5. Atualiza usuário
   ↓
6. Se cargo fornecido:
   - Remove cargo antigo
   - Adiciona novo cargo
   ↓
7. Registra log
   ↓
8. Commit
```

**Código**:

```typescript
async updateUser(userId: number, userData: Partial<addUser>, loggedUser?: AuthUser): Promise<AnyResponse> {
  try {
    await db.transaction(async (trx) => {
      // Verifica existência
      const existingUser = await trx('users').where({ id: userId }).first()
      if (!existingUser) {
        throw new Error('Usuário não encontrado')
      }

      // Prepara dados
      const updateData: any = {}
      
      if (userData.full_name) updateData.full_name = userData.full_name
      if (userData.email) updateData.email = userData.email
      if (userData.cpf) updateData.cpf = userData.cpf
      if (userData.birth_date) updateData.birth_date = userData.birth_date
      if (userData.status !== undefined) updateData.status = userData.status
      
      // Hash de senha (se fornecida)
      if (userData.password) {
        const senhaHash = await bcrypt.hash(userData.password, 10)
        updateData.password_hash = senhaHash
      }

      // Atualiza usuário
      if (Object.keys(updateData).length > 0) {
        await trx('users').where({ id: userId }).update(updateData)
      }

      // Atualiza cargo (se fornecido)
      if (userData.role) {
        const role = await trx('roles').where({ role_name: userData.role }).first()
        if (!role) throw new Error(`Cargo '${userData.role}' não encontrado`)

        // Remove cargo antigo
        await trx('role_users').where({ users_id: userId }).delete()

        // Adiciona novo cargo
        await trx('role_users').insert({
          users_id: userId,
          roles_id: role.id
        })
      }

      // Log
      await logService.write({
        user_id: loggedUser?.id || null,
        who: loggedUser?.usuario || 'system',
        where: 'users',
        what: `Atualizou usuário ${userData.user || existingUser.login}`
      }, trx)
    })

    return { success: true, message: 'Usuário atualizado com sucesso' }
  } catch (error: any) {
    return { success: false, message: error.message || 'Erro ao atualizar usuário' }
  }
}
```

---

## 4. RoleService

**Arquivo**: `src/main/services/roleService.ts`

**Propósito**: CRUD de cargos com gerenciamento de permissões.

### 4.1 Método: addRole()

```typescript
async addRole(roleData: addRole, loggedUser?: AuthUser): Promise<AnyResponse>
```

**Fluxo**:

```
1. Inicia transação
   ↓
2. Insere cargo
   ↓
3. Para cada permissão:
   - Busca na tabela allowed
   - Se não existe, cria
   - Associa ao cargo (roles_allowed)
   ↓
4. Registra log
   ↓
5. Commit
```

**Código**:

```typescript
async addRole(roleData: addRole, loggedUser?: AuthUser): Promise<AnyResponse> {
  try {
    const result = await db.transaction(async (trx) => {
      // Inserir cargo
      const [roleId] = await trx('roles').insert({
        role_name: roleData.role_name,
        description: roleData.description || null
      })

      const permissions = roleData.permissions || []
      const assigned: string[] = []

      // Processar permissões
      for (const perm of permissions) {
        // Busca ou cria permissão
        let allowed = await trx('allowed').where({ permission_name: perm }).first()
        
        if (!allowed) {
          const [newId] = await trx('allowed').insert({ permission_name: perm })
          allowed = { id: newId, permission_name: perm }
        }

        // Verifica duplicata
        const exists = await trx('roles_allowed')
          .where({ roles_id: roleId, allowed_id: allowed.id })
          .first()

        if (!exists) {
          await trx('roles_allowed').insert({ 
            roles_id: roleId, 
            allowed_id: allowed.id 
          })
          assigned.push(perm)
        }
      }

      // Log
      await logService.write({
        user_id: loggedUser?.id || null,
        who: loggedUser?.usuario || 'system',
        where: 'roles',
        what: `Criou cargo ${roleData.role_name} com ${assigned.length} permissões`
      }, trx)

      return { roleId, assigned }
    })

    return {
      success: true,
      message: `Cargo criado com ${result.assigned.length} permissões`
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Erro ao criar cargo'
    }
  }
}
```

### 4.2 Método: searchRoles()

```typescript
async searchRoles(options: { 
  id?: number
  role_name?: string
  description?: string 
}): Promise<AnyResponse>
```

**Busca Cargo e suas Permissões**:

```typescript
const query = db('roles as r')
  .select('r.id', 'r.role_name', 'r.description')

if (options.id) {
  query.where('r.id', options.id)
} else if (options.role_name) {
  query.where('r.role_name', 'like', `%${options.role_name}%`)
} else if (options.description) {
  query.where('r.description', 'like', `%${options.description}%`)
} else {
  return { success: false, message: 'Parâmetro de busca inválido' }
}

const role = await query.first()
if (!role) return { success: true, data: null }

// Buscar permissões do cargo
const permissions = await db('allowed as a')
  .join('roles_allowed as ra', 'ra.allowed_id', 'a.id')
  .where('ra.roles_id', role.id)
  .distinct('a.permission_name')
  .pluck('permission_name')

return { 
  success: true, 
  data: { ...role, permissions } 
}
```

### 4.3 Método: listAllRoles()

```typescript
async listAllRoles(): Promise<AnyResponse>
```

**Lista Todos os Cargos com Permissões**:

```typescript
const roles = await db('roles')
  .select('id', 'role_name', 'description')
  .orderBy('role_name', 'asc')

// Para cada cargo, busca permissões
const rolesWithPermissions = await Promise.all(
  roles.map(async (role) => {
    const permissions = await db('allowed as a')
      .join('roles_allowed as ra', 'ra.allowed_id', 'a.id')
      .where('ra.roles_id', role.id)
      .distinct('a.permission_name')
      .pluck('permission_name')
    
    return { ...role, permissions }
  })
)

return { success: true, data: rolesWithPermissions }
```

### 4.4 Método: updateRole()

```typescript
async updateRole(
  roleId: number, 
  roleData: Partial<addRole>, 
  loggedUser?: AuthUser
): Promise<AnyResponse>
```

**Fluxo**:

```
1. Inicia transação
   ↓
2. Verifica se cargo existe
   ↓
3. Atualiza descrição (se fornecida)
   ↓
4. Se permissões fornecidas:
   - Remove todas permissões antigas
   - Para cada nova permissão:
     - Busca ou cria na tabela allowed
     - Associa ao cargo
   ↓
5. Registra log
   ↓
6. Commit
```

---

## 5. LogService

**Arquivo**: `src/main/services/logService.ts`

**Propósito**: Gerenciamento de logs de auditoria.

### 5.1 Método: write()

```typescript
async write(entry: LogEntry, trx?: Knex.Transaction)
```

**Registra Log de Auditoria**:

```typescript
const query = trx ? trx('audit_logs') : db('audit_logs')

await query.insert({
  user_id: entry.user_id || null,
  who: entry.who || null,
  where: entry.where,
  what: entry.what
})

return { success: true }
```

**Uso em Transação**:

```typescript
await db.transaction(async (trx) => {
  // Operações...
  
  // Log usa mesma transação
  await logService.write({
    user_id: 1,
    who: 'admin',
    where: 'users',
    what: 'Criou usuário João'
  }, trx)  // ← Passa transação
})
```

### 5.2 Método: list()

```typescript
async list(limit?: number)
```

**Lista Logs**:

```typescript
const query = db('audit_logs')
  .select('id', 'user_id', 'who', 'where', 'when', 'what')
  .orderBy('when', 'desc')

const logs = limit ? await query.limit(limit) : await query

return { success: true, data: logs }
```

---

## 6. Padrões de Service

### 6.1 Estrutura Padrão

```typescript
class ServiceName {
  // Método principal
  async mainMethod(data: InputType, loggedUser?: AuthUser): Promise<ResponseType> {
    try {
      await db.transaction(async (trx) => {
        // 1. Validações
        // 2. Operações no banco
        // 3. Logs
      })

      return { success: true, message: '...' }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }

  // Métodos auxiliares (privados)
  private async helperMethod() {
    // ...
  }
}

// Singleton
export default new ServiceName()
```

### 6.2 Retorno Padronizado

```typescript
// Sucesso
{ 
  success: true, 
  message: "Operação realizada com sucesso",
  data: { ... }  // Opcional
}

// Erro
{ 
  success: false, 
  message: "Descrição do erro" 
}
```

### 6.3 Injeção de Usuário Logado

```typescript
async method(data: InputType, loggedUser?: AuthUser): Promise<ResponseType> {
  // loggedUser é injetado pelo middleware requirePermissions
  
  await logService.write({
    user_id: loggedUser?.id || null,
    who: loggedUser?.usuario || 'system',
    where: 'module',
    what: 'Ação realizada'
  })
}
```

---

## 7. Tratamento de Erros

### 7.1 Try/Catch em Services

```typescript
async addUser(userData: addUser): Promise<AnyResponse> {
  try {
    // Operações
    return { success: true, message: 'Sucesso' }
  } catch (error: any) {
    // Captura qualquer erro
    return { 
      success: false, 
      message: error.message || 'Erro desconhecido' 
    }
  }
}
```

### 7.2 Erros de Validação

```typescript
// Dentro de transação
const role = await trx('roles').where({ role_name: userData.role }).first()

if (!role) {
  throw new Error(`Cargo '${userData.role}' não encontrado`)
  // Causa rollback automático da transação
}
```

### 7.3 Propagação para Route Handler

```typescript
// Service retorna { success: false }
const result = await userService.addUser(userData)

// Route handler verifica
if (result.success) {
  res.json(result)  // 200 OK
} else {
  res.status(400).json(result)  // 400 Bad Request
}
```

---

## 8. Transações

### 8.1 Importância

Transações garantem **atomicidade** (tudo ou nada):

```
✅ Cenário de Sucesso:
   1. Criar usuário → OK
   2. Associar cargo → OK
   3. Registrar log → OK
   4. COMMIT → Tudo salvo

❌ Cenário de Erro:
   1. Criar usuário → OK
   2. Associar cargo → ERRO!
   3. ROLLBACK → Usuário não criado (desfeito)
```

### 8.2 Sintaxe

```typescript
await db.transaction(async (trx) => {
  // Todas as queries usam trx
  const [id] = await trx('users').insert({ ... })
  await trx('role_users').insert({ users_id: id, ... })
  await trx('audit_logs').insert({ ... })
  
  // COMMIT automático ao final
  // ROLLBACK automático se houver erro
})
```

### 8.3 Passando Transação para LogService

```typescript
await db.transaction(async (trx) => {
  // Operações...
  
  // Log participa da mesma transação
  await logService.write({
    user_id: 1,
    who: 'admin',
    where: 'users',
    what: 'Ação'
  }, trx)  // ← Importante!
})
```

**Por quê?**
- Se operação falhar, log não é salvo
- Mantém consistência total

---

## Conclusão

A Service Layer do RH-OS é bem estruturada com responsabilidades claras, uso de transações para garantir consistência e logging completo de ações. Os services encapsulam toda a lógica de negócio e fornecem interfaces simples para os route handlers.

### Pontos Fortes

- ✅ Singleton pattern
- ✅ Transações para atomicidade
- ✅ Logging em todas as operações
- ✅ Retornos padronizados
- ✅ Tratamento de erros robusto
- ✅ Code reuse (DRY)

---

**Próximo**: [BACKEND-05-API.md] - Endpoints e Rotas
