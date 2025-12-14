# 🔐 Documentação do Backend - RH-OS

## Parte 3: Autenticação e Autorização

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Fluxo de Autenticação](#fluxo-de-autenticação)
3. [JWT (JSON Web Tokens)](#jwt-json-web-tokens)
4. [Criptografia de Senhas](#criptografia-de-senhas)
5. [Middleware de Autorização](#middleware-de-autorização)
6. [Validação de Payloads](#validação-de-payloads)
7. [Sistema de Permissões](#sistema-de-permissões)
8. [Segurança](#segurança)

---

## 1. Visão Geral

O sistema de autenticação e autorização do RH-OS é baseado em:

- **JWT** - Tokens stateless para autenticação
- **bcrypt** - Hash de senhas com salt
- **Permissões Granulares** - Sistema `entidade:ação`
- **Middleware Chain** - Validação → Autenticação → Autorização

### Diagrama de Fluxo

```
┌─────────────────┐
│     Cliente      │
│  (Frontend)      │
└────────┬─────────┘
         │
         │ 1. POST /api/login
         │    { usuario, senha }
         ▼
┌─────────────────────────────┐
│    authService.login()       │
│  - Valida usuário            │
│  - Compara senha (bcrypt)    │
│  - Busca cargos              │
│  - Busca permissões          │
│  - Gera JWT                  │
└────────┬────────────────────┘
         │
         │ 2. { token: "eyJhbGc..." }
         ▼
┌─────────────────┐
│     Cliente      │
│  localStorage    │
│  .setItem(token) │
└────────┬─────────┘
         │
         │ 3. GET /api/users
         │    Headers: { Authorization: Bearer <token> }
         ▼
┌────────────────────────────┐
│  requirePermissions()       │
│  - Extrai token             │
│  - Valida JWT               │
│  - Verifica permissão       │
│  - Injeta req.user          │
└────────┬───────────────────┘
         │
         │ 4. next()
         ▼
┌────────────────────────────┐
│    Route Handler            │
│  - Executa lógica           │
│  - Usa req.user             │
└────────┬───────────────────┘
         │
         │ 5. Response
         ▼
┌─────────────────┐
│     Cliente      │
└─────────────────┘
```

---

## 2. Fluxo de Autenticação

### 2.1 Etapas do Login

#### Etapa 1: Cliente Envia Credenciais

```typescript
// Frontend
const response = await fetch('http://localhost:4040/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    usuario: 'admin',
    senha: 'admin123'
  })
})

const data = await response.json()
// { success: true, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

#### Etapa 2: Backend Valida Payload

```typescript
// Middleware: loginIsValid(loginSchema)
const loginSchema = Joi.object({
  usuario: Joi.string().required(),
  senha: Joi.string().required()
})

// Se inválido → 400 Bad Request
```

#### Etapa 3: AuthService Processa Login

```typescript
class AuthService {
  async login(usuario: string, senha: string): Promise<LoginResponse> {
    try {
      // 1. Busca usuário no banco
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

      // 5. Gera JWT
      const secret = process.env.JWT_SECRET
      if (!secret) {
        return { success: false, message: 'Configuração interna ausente (JWT_SECRET)' }
      }

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
      
      // 6. Registra sucesso
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

  // Busca permissões do usuário via cargos
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

  // Busca cargos do usuário
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
}
```

#### Etapa 4: Cliente Armazena Token

```typescript
// Frontend
if (data.success && data.token) {
  localStorage.setItem('authToken', data.token)
  window.api.notifyLoginSuccess()
  navigate('/home')
}
```

---

## 3. JWT (JSON Web Tokens)

### 3.1 Estrutura do Token

Um JWT é dividido em 3 partes separadas por pontos:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImFkbWluIiwicm9sZSI6WyJBZG1pbmlzdHJhZG9yIl0sInBlcm0iOlsidXNlcnM6Y3JlYXRlIiwidXNlcnM6cmVhZCJdLCJpYXQiOjE3MzE1MDE2MDAsImV4cCI6MTczMTUzMDQwMH0.signature_hash_here

│─────────── Header ───────────│────────────────────── Payload ──────────────────────│───── Signature ─────│
```

### 3.2 Header (Base64 encoded)

```json
{
  "alg": "HS256",      // Algoritmo HMAC SHA-256
  "typ": "JWT"         // Tipo do token
}
```

### 3.3 Payload (Base64 encoded)

```json
{
  "id": 1,                                      // ID do usuário
  "user": "admin",                              // Login
  "role": ["Administrador", "Gerente"],         // Cargos (array)
  "perm": [                                     // Permissões (array)
    "users:create",
    "users:read",
    "users:update",
    "users:delete",
    "users:view",
    "roles:create",
    "roles:read",
    "roles:update",
    "roles:delete",
    "roles:view",
    "logs:read",
    "logs:view"
  ],
  "iat": 1731501600,   // Issued At (timestamp)
  "exp": 1731530400    // Expiration (timestamp) → 8 horas depois
}
```

### 3.4 Signature

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  JWT_SECRET
)
```

### 3.5 Geração do Token

```typescript
import jwt from 'jsonwebtoken'

const token = jwt.sign(
  {
    id: user.id,
    user: user.login,
    role: ['Administrador'],
    perm: ['users:create', 'users:read', ...]
  },
  process.env.JWT_SECRET!,    // Chave secreta
  { expiresIn: '8h' }          // Expira em 8 horas
)

// Resultado: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3.6 Validação do Token

```typescript
import jwt from 'jsonwebtoken'

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  
  // decoded = {
  //   id: 1,
  //   user: "admin",
  //   role: ["Administrador"],
  //   perm: ["users:create", ...],
  //   iat: 1731501600,
  //   exp: 1731530400
  // }
  
  console.log('Token válido:', decoded)
} catch (error) {
  if (error.name === 'JsonWebTokenError') {
    console.error('Token inválido')
  } else if (error.name === 'TokenExpiredError') {
    console.error('Token expirado')
  }
}
```

### 3.7 Expiração

- **Tempo de vida**: 8 horas
- **Renovação**: Não implementada (usuário precisa fazer login novamente)
- **Invalidação**: Não há blacklist (stateless)

#### Como Funciona a Expiração

```
Token criado às 10:00
Expira às 18:00 (8 horas depois)

10:00 - 17:59 → ✅ Token válido
18:00+        → ❌ Token expirado → 401 Unauthorized
```

---

## 4. Criptografia de Senhas

### 4.1 bcrypt

O RH-OS usa **bcrypt** para hash de senhas com as seguintes características:

- **Algoritmo**: Blowfish cipher
- **Salt Rounds**: 10
- **One-way**: Impossível reverter hash para senha original
- **Salted**: Cada hash é único mesmo para senhas iguais

### 4.2 Geração de Hash

```typescript
import bcrypt from 'bcrypt'

const senha = 'admin123'
const saltRounds = 10

const hash = await bcrypt.hash(senha, saltRounds)
// Resultado: "$2b$10$DeecaPnSsA.AVxygB6oIdu3hbNoQVmIysbYEdg5/9rKrsuw7JEzdC"
```

#### Estrutura do Hash

```
$2b$10$DeecaPnSsA.AVxygB6oIdu3hbNoQVmIysbYEdg5/9rKrsuw7JEzdC
│  │  │ │─────────────────── Hash ─────────────────────────────│
│  │  └─ Salt (22 caracteres)
│  └──── Cost Factor (2^10 = 1024 iterações)
└─────── Algoritmo (2b = bcrypt revision B)
```

### 4.3 Verificação de Senha

```typescript
const senhaDigitada = 'admin123'
const hashArmazenado = '$2b$10$DeecaPnSsA...'

const match = await bcrypt.compare(senhaDigitada, hashArmazenado)

if (match) {
  console.log('Senha correta! ✅')
} else {
  console.log('Senha incorreta! ❌')
}
```

#### Processo Interno

```
1. bcrypt.compare() extrai o salt do hash
2. Aplica mesmo algoritmo à senha digitada usando o salt
3. Compara resultado com o hash armazenado
4. Retorna true/false
```

### 4.4 Salt Rounds

| Salt Rounds | Iterações | Tempo Aproximado | Recomendação |
|-------------|-----------|------------------|--------------|
| 8 | 256 | ~40ms | Muito rápido |
| 10 | 1024 | ~100ms | **✅ Padrão (usado)** |
| 12 | 4096 | ~400ms | Segurança extra |
| 14 | 16384 | ~1.5s | Muito lento |

**Por que 10?**
- Equilibra segurança e performance
- Protege contra brute-force
- Não causa delay perceptível ao usuário

### 4.5 Exemplo Completo

```typescript
// Criação de usuário
async addUser(userData: addUser): Promise<AnyResponse> {
  // Hash da senha antes de salvar
  const senhaHash = await bcrypt.hash(userData.password, 10)
  
  await db('users').insert({
    login: userData.user,
    password_hash: senhaHash,  // Nunca salve senha em texto puro!
    // ... outros campos
  })
}

// Login
async login(usuario: string, senha: string): Promise<LoginResponse> {
  const user = await db('users').where({ login: usuario }).first()
  
  // Compara senha digitada com hash
  const senhaOk = await bcrypt.compare(senha, user.password_hash)
  
  if (!senhaOk) {
    return { success: false, message: 'Senha inválida' }
  }
  
  // ... gera token
}
```

---

## 5. Middleware de Autorização

### 5.1 Arquivo: authorization.ts

```typescript
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import type { AuthUser, AuthRequest } from '../types'

export function requirePermissions(...permissions: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // 1. Extrai header Authorization
      const authHeader = req.headers.authorization
      
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: 'Token não fornecido.'
        })
      }

      // 2. Remove prefixo "Bearer "
      const token = authHeader.replace('Bearer ', '')
      
      // 3. Valida JWT_SECRET
      const secret = process.env.JWT_SECRET
      
      if (!secret) {
        return res.status(500).json({
          success: false,
          message: 'Configuração do servidor incorreta.'
        })
      }

      // 4. Verifica e decodifica token
      const decoded = jwt.verify(token, secret) as any
      
      // 5. Monta objeto AuthUser
      const user: AuthUser = {
        id: decoded.id,
        usuario: decoded.user,
        cargo: decoded.role || [],
        permissoes: decoded.perm || []
      }

      // 6. Verifica se tem pelo menos uma das permissões
      const hasPermission = permissions.some(permission => 
        user.permissoes.includes(permission)
      )

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: `Acesso negado. Permissão necessária: ${permissions.join(' ou ')}`
        })
      }

      // 7. Injeta usuário na request
      req.user = user
      
      // 8. Passa para próximo middleware/handler
      next()
      
    } catch (error: any) {
      // Trata erros JWT
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Token inválido.'
        })
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expirado.'
        })
      }

      return res.status(500).json({
        success: false,
        message: 'Erro ao validar token.'
      })
    }
  }
}
```

### 5.2 Uso do Middleware

```typescript
// router.ts

// Rota protegida - requer permissão 'users:create'
route.post(
  '/api/user', 
  requirePermissions('users:create'),  // ← Middleware
  userIsValid(addUserSchema), 
  addUserRoute
)

// Rota protegida - requer permissão 'users:read' OU 'users:view'
route.get(
  '/api/users', 
  requirePermissions('users:read'),  // ← Aceita qualquer uma
  listUsersRoute
)

// Múltiplas permissões (OR lógico)
route.put(
  '/api/user/:id',
  requirePermissions('users:update', 'users:admin'),  // Aceita qualquer uma
  updateUserRoute
)
```

### 5.3 Fluxo de Verificação

```
1. Cliente faz request
   Headers: { Authorization: "Bearer eyJhbGc..." }
   ↓

2. requirePermissions('users:create') é executado
   ↓

3. Extrai token do header
   authHeader = "Bearer eyJhbGc..."
   token = "eyJhbGc..."
   ↓

4. Verifica token com JWT_SECRET
   decoded = jwt.verify(token, secret)
   ↓

5. Extrai permissões do payload
   user.permissoes = ["users:create", "users:read", ...]
   ↓

6. Verifica se tem permissão necessária
   user.permissoes.includes('users:create') ?
   ↓

7a. SIM → Injeta req.user e chama next()
    req.user = { id: 1, usuario: "admin", ... }
    next()
    ↓ Route Handler

7b. NÃO → Retorna 403 Forbidden
    { success: false, message: "Acesso negado. Permissão necessária: users:create" }
```

### 5.4 Códigos de Erro

| Código | Situação | Resposta |
|--------|----------|----------|
| **401** | Token não fornecido | `{ message: "Token não fornecido." }` |
| **401** | Token inválido | `{ message: "Token inválido." }` |
| **401** | Token expirado | `{ message: "Token expirado." }` |
| **403** | Sem permissão | `{ message: "Acesso negado. Permissão necessária: ..." }` |
| **500** | JWT_SECRET ausente | `{ message: "Configuração do servidor incorreta." }` |

---

## 6. Validação de Payloads

### 6.1 Biblioteca Joi

O sistema usa **Joi** para validação de schemas de entrada.

### 6.2 Exemplo: Login

```typescript
// loginValidate.ts
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Schema de validação
const loginSchema = Joi.object({
  usuario: Joi.string().required(),
  senha: Joi.string().required()
})

// Middleware de validação
function loginIsValid(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: `[LoginValidate ERROR]: Erro de validação ${error.message}`
      })
    }
    
    next()
  }
}

export { loginSchema, loginIsValid }
```

### 6.3 Exemplo: Usuário

```typescript
// addUserValidate.ts
const addUserSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().length(11).pattern(/^\d+$/).required(),
  birth_date: Joi.date().iso().required(),
  user: Joi.string().alphanum().min(3).max(45).required(),
  password: Joi.string().min(6).required(),
  status: Joi.number().valid(0, 1).required(),
  role: Joi.string().required()
})

function userIsValid(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: `[UserValidate ERROR]: ${error.message}`
      })
    }
    
    next()
  }
}
```

### 6.4 Uso no Router

```typescript
route.post(
  '/api/login', 
  loginIsValid(loginSchema),  // ← Valida primeiro
  loginRoute                   // ← Depois executa route handler
)

route.post(
  '/api/user',
  requirePermissions('users:create'),  // ← Autorização
  userIsValid(addUserSchema),          // ← Validação
  addUserRoute                         // ← Handler
)
```

### 6.5 Validações Comuns do Joi

```typescript
// String
Joi.string()
  .min(3)              // Mínimo 3 caracteres
  .max(255)            // Máximo 255 caracteres
  .alphanum()          // Apenas alfanumérico
  .email()             // Email válido
  .required()          // Obrigatório

// Number
Joi.number()
  .integer()           // Inteiro
  .min(0)              // Mínimo 0
  .max(100)            // Máximo 100
  .valid(0, 1)         // Apenas 0 ou 1

// Date
Joi.date()
  .iso()               // Formato ISO 8601
  .min('1900-01-01')   // Data mínima
  .max('now')          // Até hoje

// Array
Joi.array()
  .items(Joi.string()) // Array de strings
  .min(1)              // Pelo menos 1 item
  .unique()            // Sem duplicatas

// Pattern (Regex)
Joi.string()
  .pattern(/^\d+$/)    // Apenas dígitos
  .length(11)          // Exatamente 11 caracteres
```

---

## 7. Sistema de Permissões

### 7.1 Formato

```
<entidade>:<ação>

Entidades:
- users → Usuários
- roles → Cargos
- logs  → Logs de auditoria

Ações:
- create → Criar
- read   → Ler detalhes
- update → Atualizar
- delete → Deletar
- view   → Visualizar lista
```

### 7.2 Permissões Disponíveis

| Permissão | Descrição | Usado Em |
|-----------|-----------|----------|
| `users:create` | Criar usuários | POST /api/user |
| `users:read` | Ler usuário | GET /api/user |
| `users:update` | Atualizar usuário | PUT /api/user/:id |
| `users:delete` | Deletar usuário | DELETE /api/user/:id |
| `users:view` | Listar usuários | GET /api/users |
| `roles:create` | Criar cargos | POST /api/role |
| `roles:read` | Ler cargo | GET /api/role |
| `roles:update` | Atualizar cargo | PUT /api/role/:id |
| `roles:delete` | Deletar cargo | DELETE /api/role/:id |
| `roles:view` | Listar cargos | GET /api/roles |
| `logs:read` | Ler logs | GET /api/logs |
| `logs:view` | Visualizar logs | GET /api/logs (lista) |

### 7.3 Hierarquia de Cargos (Exemplo)

```
Administrador
├─ users:*     (todas as permissões de usuários)
├─ roles:*     (todas as permissões de cargos)
└─ logs:*      (todas as permissões de logs)

Gerente
├─ users:read
├─ users:view
├─ users:update
├─ roles:read
└─ roles:view

RH
├─ users:create
├─ users:read
├─ users:view
└─ users:update

Operador
├─ users:view  (apenas visualizar lista)
└─ logs:view   (apenas visualizar logs)
```

### 7.4 Verificação AND vs OR

#### OR (padrão do middleware)

```typescript
// Usuário precisa ter PELO MENOS UMA das permissões
requirePermissions('users:update', 'users:admin')

// Se user.permissoes = ['users:update']  → ✅ Passa
// Se user.permissoes = ['users:admin']   → ✅ Passa
// Se user.permissoes = ['users:read']    → ❌ Bloqueado
```

#### AND (implementação custom)

```typescript
// Usuário precisa ter TODAS as permissões
function requireAllPermissions(...permissions: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user
    
    const hasAll = permissions.every(perm => 
      user.permissoes.includes(perm)
    )
    
    if (!hasAll) {
      return res.status(403).json({
        success: false,
        message: `Acesso negado. Permissões necessárias: ${permissions.join(', ')}`
      })
    }
    
    next()
  }
}

// Uso
route.delete(
  '/api/user/:id',
  requireAllPermissions('users:delete', 'users:admin')
)
```

---

## 8. Segurança

### 8.1 Checklist de Segurança Implementado

- ✅ **Senhas hasheadas** - bcrypt com 10 salt rounds
- ✅ **JWT stateless** - Tokens auto-contidos
- ✅ **Expiração de tokens** - 8 horas
- ✅ **Validação de payloads** - Joi schemas
- ✅ **Autorização granular** - Permissões por entidade:ação
- ✅ **Auditoria** - Logs de tentativas de login
- ✅ **Status de usuário** - Desabilitar usuários sem deletar
- ✅ **Foreign keys** - Integridade referencial

### 8.2 Vulnerabilidades e Mitigações

#### ⚠️ JWT em localStorage (XSS)

**Problema**: Token no localStorage é vulnerável a XSS.

**Mitigação Atual**: 
- Context isolation do Electron previne scripts maliciosos
- Aplicação desktop controlada

**Melhoria Futura**:
- Implementar httpOnly cookies
- Adicionar CSP (Content Security Policy)

#### ⚠️ Sem Refresh Tokens

**Problema**: Quando token expira (8h), usuário precisa fazer login novamente.

**Mitigação Atual**: Tempo de expiração generoso (8h).

**Melhoria Futura**:
- Implementar refresh tokens de longa duração
- Access tokens de curta duração (15min)

#### ⚠️ Sem Rate Limiting

**Problema**: Nada impede tentativas de login em massa.

**Mitigação Atual**: Nenhuma.

**Melhoria Futura**:
- Implementar express-rate-limit
- Bloquear IP após X tentativas falhas

#### ⚠️ Permissões no Token

**Problema**: Mudanças em permissões não são refletidas até re-login.

**Mitigação Atual**: Backend sempre valida no banco.

**Comportamento**:
```
1. Admin remove permissão 'users:delete' do usuário
2. Usuário ainda tem token com permissão antiga
3. Usuário tenta deletar → Backend valida token (OK)
   Mas... permissão está no token (não no banco)
4. ❌ Usuário consegue deletar até token expirar
```

**Melhoria Futura**:
- Não incluir permissões no token
- Sempre buscar permissões do banco em cada request
- Ou: Sistema de versão de token para invalidar anteriores

### 8.3 Boas Práticas Implementadas

#### 1. Princípio do Menor Privilégio
```typescript
// Cada rota exige apenas a permissão necessária
route.get('/api/users', requirePermissions('users:read'))  // Apenas leitura
route.post('/api/user', requirePermissions('users:create')) // Apenas criação
```

#### 2. Auditoria Completa
```typescript
// Todas as ações importantes são logadas
await logService.write({
  user_id: loggedUser?.id,
  who: loggedUser?.usuario,
  where: 'users',
  what: `Criou usuário ${userData.user}`
})
```

#### 3. Validação em Camadas
```
1. Frontend: Validação básica (UX)
2. Joi Middleware: Validação de schema
3. Service Layer: Validação de negócio
4. Database: Constraints e foreign keys
```

#### 4. Mensagens de Erro Seguras
```typescript
// ❌ Ruim - revela informação
return { message: 'Usuário admin não encontrado' }

// ✅ Bom - genérico
return { message: 'Usuário inválido ou inexistente' }
```

---

## Conclusão

O sistema de autenticação e autorização do RH-OS é robusto e seguro, utilizando práticas modernas como JWT, bcrypt e permissões granulares. A arquitetura em camadas com middlewares garante validação e segurança em cada etapa do processo.

### Pontos Fortes

- ✅ JWT stateless
- ✅ bcrypt para senhas
- ✅ Permissões granulares
- ✅ Validação com Joi
- ✅ Auditoria completa
- ✅ Middleware chain claro

### Melhorias Futuras

- Refresh tokens
- Rate limiting
- Permissões dinâmicas (buscar do banco)
- httpOnly cookies
- HTTPS em produção

---

**Próximo**: [BACKEND-04-SERVICES.md] - Serviços e Lógica de Negócio
