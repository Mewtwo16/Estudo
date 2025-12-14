# 🗄️ Documentação do Backend - RH-OS

## Parte 2: Banco de Dados e Schema

---

## Índice

1. [Visão Geral do Banco](#visão-geral-do-banco)
2. [Diagrama de Relacionamentos](#diagrama-de-relacionamentos)
3. [Tabelas](#tabelas)
4. [Relacionamentos](#relacionamentos)
5. [Queries Comuns](#queries-comuns)
6. [Configuração Knex.js](#configuração-knexjs)
7. [Transações](#transações)
8. [Dados Iniciais](#dados-iniciais)

---

## 1. Visão Geral do Banco

### 1.1 Informações Gerais

- **SGBD**: MySQL 8.0+
- **Schema**: `RHOS`
- **Charset**: UTF-8
- **Engine**: InnoDB (suporte a transações e foreign keys)
- **Query Builder**: Knex.js

### 1.2 Tabelas do Sistema

| Tabela | Tipo | Registros Típicos | Descrição |
|--------|------|-------------------|-----------|
| `users` | Entidade | 10-1000+ | Usuários do sistema |
| `roles` | Entidade | 5-50 | Cargos/funções |
| `allowed` | Entidade | 10-100 | Permissões disponíveis |
| `role_users` | Associativa | 10-1000+ | N:N entre usuários e cargos |
| `roles_allowed` | Associativa | 20-500 | N:N entre cargos e permissões |
| `audit_logs` | Auditoria | 100-100000+ | Logs de todas as ações |

---

## 2. Diagrama de Relacionamentos

### 2.1 Diagrama ER

```
┌─────────────────────┐
│      users          │
│─────────────────────│
│ id (PK)             │
│ full_name           │
│ email (UNIQUE)      │
│ login (UNIQUE)      │
│ password_hash       │
│ cpf (UNIQUE)        │
│ birth_date          │
│ status              │
│ creation_date       │
└──────────┬──────────┘
           │
           │ N:N
           │
┌──────────▼──────────┐
│    role_users       │
│─────────────────────│
│ users_id (FK)       │
│ roles_id (FK)       │
│ (PK: users_id +     │
│      roles_id)      │
└──────────┬──────────┘
           │
           │
┌──────────▼──────────┐
│      roles          │
│─────────────────────│
│ id (PK)             │
│ role_name (UNIQUE)  │
│ description         │
└──────────┬──────────┘
           │
           │ N:N
           │
┌──────────▼──────────┐
│  roles_allowed      │
│─────────────────────│
│ roles_id (FK)       │
│ allowed_id (FK)     │
│ (PK: roles_id +     │
│      allowed_id)    │
└──────────┬──────────┘
           │
           │
┌──────────▼──────────┐
│     allowed         │
│─────────────────────│
│ id (PK)             │
│ permission_name     │
│ (UNIQUE)            │
└─────────────────────┘

┌─────────────────────┐
│   audit_logs        │
│─────────────────────│
│ id (PK)             │
│ user_id (FK/NULL)   │──┐
│ who                 │  │ FK para users.id
│ where               │  │ (ON DELETE SET NULL)
│ when                │  │
│ what                │◄─┘
└─────────────────────┘
```

### 2.2 Modelo Relacional Simplificado

```
Users ──┬── Role_Users ──┬── Roles ──┬── Roles_Allowed ──┬── Allowed
        │                │           │                    │
        └────────────────┴───────────┴────────────────────┘
                     (N:N via tabelas associativas)

Users ──┬── Audit_Logs (1:N com ON DELETE SET NULL)
```

---

## 3. Tabelas

### 3.1 Tabela: `users`

**Propósito**: Armazena todos os usuários do sistema.

#### Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | Identificador único |
| `full_name` | VARCHAR(255) | NOT NULL | Nome completo |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Email único |
| `login` | VARCHAR(45) | NOT NULL, UNIQUE | Nome de usuário (login) |
| `password_hash` | VARCHAR(255) | NOT NULL | Senha hasheada (bcrypt) |
| `cpf` | VARCHAR(11) | NOT NULL, UNIQUE | CPF (apenas números) |
| `birth_date` | DATE | NOT NULL | Data de nascimento |
| `status` | TINYINT | NOT NULL | 1 = Ativo, 0 = Inativo |
| `creation_date` | DATETIME | NOT NULL | Data de criação |

#### Índices

- **PRIMARY KEY**: `id`
- **UNIQUE INDEX**: `email`
- **UNIQUE INDEX**: `login`
- **UNIQUE INDEX**: `cpf`

#### Exemplo de Registro

```sql
id: 1
full_name: "João Silva"
email: "joao.silva@empresa.com"
login: "joao.silva"
password_hash: "$2b$10$..."  -- bcrypt hash
cpf: "12345678901"
birth_date: "1990-05-15"
status: 1  -- Ativo
creation_date: "2025-11-14 10:30:00"
```

#### Constraints de Negócio

- CPF deve ter exatamente 11 dígitos (validado no backend)
- Email deve ser válido (validado por Joi)
- Senha deve ter no mínimo 6 caracteres (validado no backend)
- Status 1 = Ativo, 0 = Inativo
- Login deve ser único e alfanumérico

---

### 3.2 Tabela: `roles`

**Propósito**: Define os cargos/funções do sistema.

#### Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | Identificador único |
| `role_name` | VARCHAR(255) | NOT NULL, UNIQUE | Nome do cargo |
| `description` | VARCHAR(255) | NULL | Descrição do cargo |

#### Índices

- **PRIMARY KEY**: `id`
- **UNIQUE INDEX**: `role_name`

#### Exemplo de Registro

```sql
id: 1
role_name: "Administrador"
description: "Administrador do sistema com acesso total"
```

#### Cargos Típicos

```
1. Administrador     - Acesso total
2. Gerente           - Gerenciamento de equipe
3. RH                - Recursos Humanos
4. Financeiro        - Departamento financeiro
5. Suporte           - Suporte técnico
6. Operador          - Operações básicas
```

---

### 3.3 Tabela: `allowed`

**Propósito**: Armazena todas as permissões disponíveis no sistema.

#### Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | INT | PK, AUTO_INCREMENT | Identificador único |
| `permission_name` | VARCHAR(255) | NOT NULL, UNIQUE | Nome da permissão |

#### Índices

- **PRIMARY KEY**: `id`
- **UNIQUE INDEX**: `permission_name`

#### Exemplo de Registros

```sql
id: 1,  permission_name: "users:create"
id: 2,  permission_name: "users:read"
id: 3,  permission_name: "users:update"
id: 4,  permission_name: "users:delete"
id: 5,  permission_name: "users:view"
id: 6,  permission_name: "roles:create"
id: 7,  permission_name: "roles:read"
id: 8,  permission_name: "roles:update"
id: 9,  permission_name: "roles:delete"
id: 10, permission_name: "roles:view"
id: 11, permission_name: "logs:read"
id: 12, permission_name: "logs:view"
```

#### Formato de Permissões

```
<entidade>:<ação>

Entidades:
- users   → Usuários
- roles   → Cargos
- logs    → Logs de auditoria

Ações:
- create  → Criar novo registro
- read    → Ler detalhes de um registro
- update  → Atualizar registro
- delete  → Deletar registro
- view    → Visualizar lista de registros
```

---

### 3.4 Tabela: `role_users`

**Propósito**: Tabela associativa N:N entre usuários e cargos.

#### Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `users_id` | INT UNSIGNED | PK, FK → users.id | ID do usuário |
| `roles_id` | INT UNSIGNED | PK, FK → roles.id | ID do cargo |

#### Índices

- **PRIMARY KEY**: (`users_id`, `roles_id`)
- **INDEX**: `users_id`
- **INDEX**: `roles_id`

#### Foreign Keys

```sql
CONSTRAINT `fk_role_users_users`
  FOREIGN KEY (`users_id`) 
  REFERENCES `users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION

CONSTRAINT `fk_role_users_roles`
  FOREIGN KEY (`roles_id`) 
  REFERENCES `roles` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
```

#### Exemplo de Registros

```sql
-- Usuário 1 tem cargo 1 (Administrador)
users_id: 1, roles_id: 1

-- Usuário 2 tem cargos 2 e 3 (Gerente + RH)
users_id: 2, roles_id: 2
users_id: 2, roles_id: 3
```

#### Comportamento

- Um usuário pode ter **múltiplos cargos**
- Um cargo pode ser atribuído a **múltiplos usuários**
- Chave primária composta garante que não há duplicatas
- ON DELETE NO ACTION: Não permite deletar usuário/cargo se houver vínculo

---

### 3.5 Tabela: `roles_allowed`

**Propósito**: Tabela associativa N:N entre cargos e permissões.

#### Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `roles_id` | INT UNSIGNED | PK, FK → roles.id | ID do cargo |
| `allowed_id` | INT | PK, FK → allowed.id | ID da permissão |

#### Índices

- **PRIMARY KEY**: (`roles_id`, `allowed_id`)
- **INDEX**: `roles_id`
- **INDEX**: `allowed_id`

#### Foreign Keys

```sql
CONSTRAINT `fk_roles_allowed_roles`
  FOREIGN KEY (`roles_id`) 
  REFERENCES `roles` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION

CONSTRAINT `fk_roles_allowed_allowed`
  FOREIGN KEY (`allowed_id`) 
  REFERENCES `allowed` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
```

#### Exemplo de Registros

```sql
-- Cargo Administrador (id=1) tem todas as permissões
roles_id: 1, allowed_id: 1   -- users:create
roles_id: 1, allowed_id: 2   -- users:read
roles_id: 1, allowed_id: 3   -- users:update
...
roles_id: 1, allowed_id: 12  -- logs:view

-- Cargo Operador (id=6) tem apenas leitura
roles_id: 6, allowed_id: 2   -- users:read
roles_id: 6, allowed_id: 5   -- users:view
roles_id: 6, allowed_id: 7   -- roles:read
```

---

### 3.6 Tabela: `audit_logs`

**Propósito**: Registra todas as ações importantes do sistema para auditoria.

#### Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | Identificador único |
| `user_id` | INT UNSIGNED | NULL, FK → users.id | ID do usuário (NULL se sistema) |
| `who` | VARCHAR(255) | NULL | Nome do usuário ou 'system' |
| `where` | VARCHAR(255) | NOT NULL | Módulo (auth, users, roles, logs) |
| `when` | DATETIME | NOT NULL, DEFAULT NOW | Timestamp da ação |
| `what` | TEXT | NOT NULL | Descrição da ação |

#### Índices

- **PRIMARY KEY**: `id`
- **INDEX**: `user_id`

#### Foreign Keys

```sql
CONSTRAINT `fk_audit_logs_users`
  FOREIGN KEY (`user_id`) 
  REFERENCES `users` (`id`)
  ON DELETE SET NULL  -- ⚠️ Se usuário deletado, mantém log mas seta NULL
  ON UPDATE NO ACTION
```

#### Exemplo de Registros

```sql
-- Login bem-sucedido
id: 1
user_id: 1
who: "admin"
where: "auth"
when: "2025-11-14 10:30:00"
what: "Login successful"

-- Criação de usuário
id: 2
user_id: 1
who: "admin"
where: "users"
when: "2025-11-14 10:35:00"
what: "Criou usuário joao.silva com cargo Operador"

-- Ação do sistema (sem usuário)
id: 3
user_id: NULL
who: "system"
where: "auth"
when: "2025-11-14 10:40:00"
what: "Login failed: user not found"
```

#### Módulos (`where`)

| Módulo | Descrição |
|--------|-----------|
| `auth` | Autenticação (login, logout) |
| `users` | Operações com usuários |
| `roles` | Operações com cargos |
| `logs` | Acesso aos logs |
| `system` | Ações automáticas do sistema |

---

## 4. Relacionamentos

### 4.1 Users ↔ Roles (N:N)

**Relação**: Um usuário pode ter múltiplos cargos, e um cargo pode ser atribuído a múltiplos usuários.

**Via**: Tabela `role_users`

#### Query: Obter cargos de um usuário

```typescript
const roles = await db('roles')
  .join('role_users', 'roles.id', '=', 'role_users.roles_id')
  .where('role_users.users_id', userId)
  .distinct('roles.role_name')
  .pluck('role_name')

// Resultado: ['Administrador', 'Gerente']
```

#### Query: Obter usuários de um cargo

```typescript
const users = await db('users')
  .join('role_users', 'users.id', '=', 'role_users.users_id')
  .where('role_users.roles_id', roleId)
  .select('users.id', 'users.full_name', 'users.login')
```

---

### 4.2 Roles ↔ Allowed (N:N)

**Relação**: Um cargo pode ter múltiplas permissões, e uma permissão pode estar em múltiplos cargos.

**Via**: Tabela `roles_allowed`

#### Query: Obter permissões de um cargo

```typescript
const permissions = await db('allowed')
  .join('roles_allowed', 'allowed.id', '=', 'roles_allowed.allowed_id')
  .where('roles_allowed.roles_id', roleId)
  .distinct('allowed.permission_name')
  .pluck('permission_name')

// Resultado: ['users:create', 'users:read', 'users:update', ...]
```

#### Query: Obter cargos com uma permissão específica

```typescript
const roles = await db('roles')
  .join('roles_allowed', 'roles.id', '=', 'roles_allowed.roles_id')
  .join('allowed', 'allowed.id', '=', 'roles_allowed.allowed_id')
  .where('allowed.permission_name', 'users:delete')
  .select('roles.id', 'roles.role_name')
```

---

### 4.3 Users ↔ Allowed (N:N Indireto)

**Relação**: Usuários obtêm permissões através de seus cargos.

**Via**: `role_users` + `roles_allowed`

#### Query: Obter todas as permissões de um usuário

```typescript
const permissions = await db('allowed')
  .join('roles_allowed', 'allowed.id', '=', 'roles_allowed.allowed_id')
  .join('role_users', 'roles_allowed.roles_id', '=', 'role_users.roles_id')
  .where('role_users.users_id', userId)
  .distinct('allowed.permission_name')
  .pluck('permission_name')

// Resultado: ['users:create', 'users:read', 'users:update', 'roles:read', ...]
```

**Lógica**:
```
User (id=1)
  ↓ role_users
Roles (id=1, Administrador)
  ↓ roles_allowed
Allowed (users:create, users:read, ...)
```

---

### 4.4 Users ↔ Audit_Logs (1:N)

**Relação**: Um usuário pode ter múltiplos logs, mas cada log pertence a um usuário (ou NULL).

**Comportamento**: `ON DELETE SET NULL` - Se usuário for deletado, logs são mantidos mas `user_id` vira NULL.

#### Query: Obter logs de um usuário

```typescript
const logs = await db('audit_logs')
  .where('user_id', userId)
  .orderBy('when', 'desc')
  .limit(100)
```

#### Query: Obter logs com nome do usuário

```typescript
const logs = await db('audit_logs as al')
  .leftJoin('users as u', 'al.user_id', 'u.id')
  .select(
    'al.id',
    'al.user_id',
    db.raw('COALESCE(al.who, u.login, "unknown") as who'),
    'al.where',
    'al.when',
    'al.what'
  )
  .orderBy('al.when', 'desc')
```

---

## 5. Queries Comuns

### 5.1 Listar Usuários com Cargos

```typescript
const users = await db('users as u')
  .leftJoin('role_users as ru', 'ru.users_id', 'u.id')
  .leftJoin('roles as r', 'r.id', 'ru.roles_id')
  .select(
    'u.id',
    'u.full_name',
    'u.email',
    'u.login',
    'u.status',
    db.raw('GROUP_CONCAT(r.role_name) as roles')
  )
  .groupBy('u.id')
  .orderBy('u.full_name', 'asc')

// Resultado:
// [
//   { id: 1, full_name: "João Silva", login: "joao", roles: "Administrador,Gerente" },
//   { id: 2, full_name: "Maria Santos", login: "maria", roles: "RH" },
//   ...
// ]
```

### 5.2 Listar Cargos com Permissões

```typescript
const roles = await db('roles as r')
  .select('r.id', 'r.role_name', 'r.description')

const rolesWithPermissions = await Promise.all(
  roles.map(async (role) => {
    const permissions = await db('allowed as a')
      .join('roles_allowed as ra', 'a.id', '=', 'ra.allowed_id')
      .where('ra.roles_id', role.id)
      .pluck('a.permission_name')
    
    return { ...role, permissions }
  })
)

// Resultado:
// [
//   { 
//     id: 1, 
//     role_name: "Administrador", 
//     permissions: ["users:create", "users:read", ...] 
//   },
//   ...
// ]
```

### 5.3 Verificar Permissão de Usuário

```typescript
const hasPermission = async (userId: number, permission: string): Promise<boolean> => {
  const result = await db('allowed')
    .join('roles_allowed', 'allowed.id', '=', 'roles_allowed.allowed_id')
    .join('role_users', 'roles_allowed.roles_id', '=', 'role_users.roles_id')
    .where('role_users.users_id', userId)
    .where('allowed.permission_name', permission)
    .first()

  return !!result
}

// Uso:
const canCreate = await hasPermission(1, 'users:create')  // true ou false
```

### 5.4 Criar Usuário com Cargo (Transação)

```typescript
await db.transaction(async (trx) => {
  // 1. Criar usuário
  const [userId] = await trx('users').insert({
    full_name: 'João Silva',
    email: 'joao@email.com',
    login: 'joao',
    password_hash: await bcrypt.hash('senha123', 10),
    cpf: '12345678901',
    birth_date: '1990-01-01',
    status: 1,
    creation_date: new Date()
  })

  // 2. Buscar cargo
  const role = await trx('roles')
    .where({ role_name: 'Operador' })
    .first()

  // 3. Associar usuário ao cargo
  await trx('role_users').insert({
    users_id: userId,
    roles_id: role.id
  })

  // 4. Registrar log
  await trx('audit_logs').insert({
    user_id: 1,  // Usuário que fez a ação
    who: 'admin',
    where: 'users',
    what: `Criou usuário João Silva com cargo Operador`
  })
})
```

---

## 6. Configuração Knex.js

### 6.1 Arquivo db.ts

```typescript
import knex from 'knex'
import dotenv from 'dotenv'
import type { Knex } from 'knex'

dotenv.config()

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST!,      // localhost
      port: Number(process.env.DB_PORT!),  // 3306
      user: process.env.DB_USER!,      // root
      password: process.env.DB_PASSWORD!,  // sua_senha
      database: process.env.DB_DATABASE!   // RHOS
    }
  }
}

const db = knex(config.development)

export default db
```

### 6.2 Métodos Knex.js Comuns

#### SELECT
```typescript
// Todos os registros
const users = await db('users').select('*')

// Campos específicos
const users = await db('users').select('id', 'full_name', 'login')

// Com WHERE
const user = await db('users').where({ id: 1 }).first()

// Com LIKE
const users = await db('users').where('full_name', 'like', '%Silva%')

// Com ORDER BY
const users = await db('users').orderBy('full_name', 'asc')

// Com LIMIT
const users = await db('users').limit(10)
```

#### INSERT
```typescript
// Retorna array com IDs inseridos
const [userId] = await db('users').insert({
  full_name: 'João Silva',
  email: 'joao@email.com',
  login: 'joao',
  password_hash: 'hash...',
  cpf: '12345678901',
  birth_date: '1990-01-01',
  status: 1,
  creation_date: new Date()
})
```

#### UPDATE
```typescript
// Atualiza e retorna número de linhas afetadas
const affected = await db('users')
  .where({ id: 1 })
  .update({
    full_name: 'João Silva Atualizado',
    status: 0
  })
```

#### DELETE
```typescript
// Deleta e retorna número de linhas deletadas
const deleted = await db('users')
  .where({ id: 1 })
  .delete()
```

#### JOIN
```typescript
const users = await db('users as u')
  .join('role_users as ru', 'u.id', '=', 'ru.users_id')
  .join('roles as r', 'r.id', '=', 'ru.roles_id')
  .select('u.full_name', 'r.role_name')
```

#### RAW SQL
```typescript
const users = await db.raw(`
  SELECT u.*, r.role_name
  FROM users u
  LEFT JOIN role_users ru ON u.id = ru.users_id
  LEFT JOIN roles r ON r.id = ru.roles_id
`)
```

---

## 7. Transações

### 7.1 Propósito

Transações garantem que operações sejam **atômicas** (tudo ou nada):

```
✅ Cenário de Sucesso:
   1. Criar usuário
   2. Associar cargo
   3. Registrar log
   4. COMMIT → Tudo persistido

❌ Cenário de Erro:
   1. Criar usuário → OK
   2. Associar cargo → ERRO
   3. ROLLBACK → Usuário não criado (desfeito)
```

### 7.2 Sintaxe Knex.js

```typescript
await db.transaction(async (trx) => {
  // Todas as queries usam trx ao invés de db
  const [id] = await trx('users').insert({ ... })
  await trx('role_users').insert({ users_id: id, ... })
  await trx('audit_logs').insert({ ... })
  
  // Se chegar aqui sem erro → COMMIT automático
  // Se houver erro → ROLLBACK automático
})
```

### 7.3 Exemplo Real

```typescript
async addUser(userData: addUser): Promise<AnyResponse> {
  try {
    await db.transaction(async (trx) => {
      // 1. Hash da senha
      const senhaHash = await bcrypt.hash(userData.password, 10)
      
      // 2. Inserir usuário
      const [newUserID] = await trx('users').insert({
        full_name: userData.full_name,
        email: userData.email,
        login: userData.user,
        password_hash: senhaHash,
        cpf: userData.cpf,
        birth_date: userData.birth_date,
        status: userData.status,
        creation_date: new Date()
      })

      // 3. Buscar cargo
      const role = await trx('roles')
        .where({ role_name: userData.role })
        .first()

      if (!role) {
        throw new Error(`Cargo '${userData.role}' não encontrado`)
      }

      // 4. Associar cargo
      await trx('role_users').insert({
        users_id: newUserID,
        roles_id: role.id
      })

      // 5. Registrar log
      await trx('audit_logs').insert({
        user_id: loggedUser?.id || null,
        who: loggedUser?.usuario || 'system',
        where: 'users',
        what: `Criou usuário ${userData.user} com cargo ${userData.role}`
      })

      // COMMIT implícito aqui
    })

    return { success: true, message: 'Usuário criado com sucesso' }
  } catch (error: any) {
    // ROLLBACK já foi feito automaticamente
    return { success: false, message: error.message }
  }
}
```

---

## 8. Dados Iniciais

### 8.1 Script de Inicialização

O arquivo `database.sql` inclui dados iniciais:

#### Cargo Administrador
```sql
INSERT INTO RHOS.roles (role_name, description)
VALUES ('Administrador', 'Administrador do sistema')
ON DUPLICATE KEY UPDATE description = VALUES(description);
```

#### Usuário Admin
```sql
-- Login: admin
-- Senha: admin123
INSERT INTO RHOS.users (full_name, email, login, password_hash, cpf, birth_date, status, creation_date)
VALUES (
  'Admin Teste', 
  'admin@teste.com', 
  'admin', 
  '$2b$10$DeecaPnSsA.AVxygB6oIdu3hbNoQVmIysbYEdg5/9rKrsuw7JEzdC',  -- admin123
  '12345678901', 
  '1990-01-01', 
  1, 
  NOW()
);
```

#### Associação Admin → Administrador
```sql
INSERT INTO RHOS.role_users (users_id, roles_id)
SELECT u.id, r.id
FROM RHOS.users u
JOIN RHOS.roles r ON r.role_name = 'Administrador'
WHERE u.login = 'admin'
ON DUPLICATE KEY UPDATE users_id = users_id;
```

#### Permissões
```sql
INSERT INTO RHOS.allowed (permission_name) VALUES
  ('users:create'),
  ('users:read'),
  ('users:update'),
  ('users:delete'),
  ('users:view'),
  ('roles:create'),
  ('roles:read'),
  ('roles:update'),
  ('roles:delete'),
  ('roles:view'),
  ('logs:read'),
  ('logs:view')
ON DUPLICATE KEY UPDATE permission_name = VALUES(permission_name);
```

#### Permissões do Administrador
```sql
INSERT INTO RHOS.roles_allowed (roles_id, allowed_id)
SELECT r.id, a.id
FROM RHOS.roles r
JOIN RHOS.allowed a ON a.permission_name IN (
  'users:create', 'users:read', 'users:update', 'users:delete', 'users:view',
  'roles:create', 'roles:read', 'roles:update', 'roles:delete', 'roles:view',
  'logs:read', 'logs:view'
)
WHERE r.role_name = 'Administrador'
ON DUPLICATE KEY UPDATE roles_id = roles_id;
```

### 8.2 Credenciais Padrão

**⚠️ IMPORTANTE**: Alterar em produção!

```
Login: admin
Senha: admin123
Cargo: Administrador
Permissões: Todas
```

---

## Conclusão

O banco de dados do RH-OS é bem estruturado, normalizado e com relacionamentos claros. A arquitetura N:N permite flexibilidade máxima para usuários com múltiplos cargos e cargos com múltiplas permissões.

### Pontos Fortes

- ✅ Normalização adequada (3FN)
- ✅ Foreign keys com integridade referencial
- ✅ Índices em campos críticos
- ✅ Auditoria completa
- ✅ Transações para consistência
- ✅ Type-safe com Knex.js

---

**Próximo**: [BACKEND-03-AUTH.md] - Autenticação e Autorização
