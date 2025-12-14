# 🌐 Documentação do Backend - RH-OS

## Parte 5: Endpoints e Rotas da API

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Rotas](#estrutura-de-rotas)
3. [Autenticação](#autenticação)
4. [Usuários](#usuários)
5. [Cargos](#cargos)
6. [Permissões](#permissões)
7. [Logs](#logs)
8. [Health Check](#health-check)
9. [Códigos de Status HTTP](#códigos-de-status-http)
10. [Exemplos de Requisições](#exemplos-de-requisições)

---

## 1. Visão Geral

A API REST do RH-OS expõe endpoints para gerenciamento de usuários, cargos, permissões e logs de auditoria. Todos os endpoints (exceto `/api/login` e `/api/health`) requerem autenticação JWT.

### Base URL

```
http://localhost:4040/api
```

### Padrões da API

- ✅ **RESTful** - Segue convenções REST
- ✅ **JSON** - Content-Type: application/json
- ✅ **JWT** - Bearer token no header Authorization
- ✅ **Stateless** - Sem sessões no servidor
- ✅ **CRUD Completo** - Create, Read, Update, Delete

---

## 2. Estrutura de Rotas

### Arquivo: router.ts

```typescript
import express from 'express'
const route = express.Router()

import { requirePermissions } from './middlewares/authorization'
import { loginIsValid, loginSchema } from './middlewares/loginValidate'
import { userIsValid, addUserSchema } from './middlewares/addUserValidate'
import { roleIsValid, addRoleSchema } from './middlewares/addRoleValidate'

// ============================================
// PÚBLICAS (sem autenticação)
// ============================================
route.get('/api/health', healthRoute)
route.post('/api/login', loginIsValid(loginSchema), loginRoute)

// ============================================
// USUÁRIOS (requer autenticação + permissão)
// ============================================
route.post('/api/user', 
  requirePermissions('users:create'), 
  userIsValid(addUserSchema), 
  addUserRoute
)

route.put('/api/user/:id', 
  requirePermissions('users:update'), 
  updateUserRoute
)

route.get('/api/user', 
  requirePermissions('users:read'), 
  getUserRoute
)

route.get('/api/users', 
  requirePermissions('users:read'), 
  listUsersRoute
)

// ============================================
// CARGOS (requer autenticação + permissão)
// ============================================
route.post('/api/role', 
  requirePermissions('roles:create'), 
  roleIsValid(addRoleSchema), 
  addRoleRoute
)

route.put('/api/role/:id', 
  requirePermissions('roles:update'), 
  updateRoleRoute
)

route.get('/api/role', 
  requirePermissions('roles:read'), 
  getRoleRoute
)

route.get('/api/roles', 
  requirePermissions('roles:read'), 
  listRolesRoute
)

route.get('/api/allowed', 
  requirePermissions('roles:read'), 
  getAllowedRoute
)

// ============================================
// LOGS (requer autenticação + permissão)
// ============================================
route.get('/api/logs', 
  requirePermissions('logs:read'), 
  getLogsRoute
)

export default route
```

### Middleware Chain

Cada rota protegida passa por:

```
1. requirePermissions()     → Valida JWT e verifica permissão
2. validationMiddleware()   → Valida payload com Joi (se POST/PUT)
3. routeHandler()           → Executa lógica de negócio
```

---

## 3. Autenticação

### POST /api/login

**Descrição**: Autentica usuário e retorna token JWT.

**Autenticação**: ❌ Não requer (endpoint público)

**Validação**: `loginSchema` (Joi)

#### Request

```http
POST http://localhost:4040/api/login
Content-Type: application/json

{
  "usuario": "admin",
  "senha": "admin123"
}
```

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "message": "Login bem-sucedido",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImFkbWluIiwicm9sZSI6WyJBZG1pbmlzdHJhZG9yIl0sInBlcm0iOlsidXNlcnM6Y3JlYXRlIiwidXNlcnM6cmVhZCIsInVzZXJzOnVwZGF0ZSIsInVzZXJzOmRlbGV0ZSIsInVzZXJzOnZpZXciLCJyb2xlczpjcmVhdGUiLCJyb2xlczpyZWFkIiwicm9sZXM6dXBkYXRlIiwicm9sZXM6ZGVsZXRlIiwicm9sZXM6dmlldyIsImxvZ3M6cmVhZCIsImxvZ3M6dmlldyJdLCJpYXQiOjE3MzE1MDE2MDAsImV4cCI6MTczMTUzMDQwMH0.signature"
}
```

#### Response - Erro (400 Bad Request)

```json
{
  "success": false,
  "message": "Usuário inválido ou inexistente"
}
```

```json
{
  "success": false,
  "message": "Senha inválida"
}
```

```json
{
  "success": false,
  "message": "Usuário desativado"
}
```

#### Response - Validação (400 Bad Request)

```json
{
  "success": false,
  "message": "[LoginValidate ERROR]: Erro de validação \"usuario\" is required"
}
```

---

## 4. Usuários

### POST /api/user

**Descrição**: Cria novo usuário.

**Autenticação**: ✅ Bearer token

**Permissão**: `users:create`

**Validação**: `addUserSchema` (Joi)

#### Request

```http
POST http://localhost:4040/api/user
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "João Silva",
  "email": "joao.silva@empresa.com",
  "cpf": "12345678901",
  "birth_date": "1990-05-15",
  "user": "joao.silva",
  "password": "senha123",
  "status": 1,
  "role": "Operador"
}
```

#### Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `full_name` | string | ✅ | Nome completo (3-255 chars) |
| `email` | string | ✅ | Email válido |
| `cpf` | string | ✅ | CPF (11 dígitos) |
| `birth_date` | string | ✅ | Data ISO (YYYY-MM-DD) |
| `user` | string | ✅ | Login alfanumérico (3-45 chars) |
| `password` | string | ✅ | Senha (mínimo 6 chars) |
| `status` | number | ✅ | 1 = Ativo, 0 = Inativo |
| `role` | string | ✅ | Nome do cargo existente |

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "message": "Sucesso na criação do usuario!"
}
```

#### Response - Erro (400 Bad Request)

```json
{
  "success": false,
  "message": "Cargo 'CargoInexistente' não encontrado"
}
```

#### Response - Sem Permissão (403 Forbidden)

```json
{
  "success": false,
  "message": "Acesso negado. Permissão necessária: users:create"
}
```

---

### GET /api/user

**Descrição**: Busca um usuário específico por parâmetro.

**Autenticação**: ✅ Bearer token

**Permissão**: `users:read`

**Query Params** (apenas um por request):
- `id` - ID do usuário
- `full_name` - Nome completo (busca parcial)
- `email` - Email (busca parcial)
- `login` - Login (busca parcial)
- `cpf` - CPF (busca parcial)
- `role` - Cargo (busca parcial)

#### Request

```http
GET http://localhost:4040/api/user?id=1
Authorization: Bearer <token>
```

```http
GET http://localhost:4040/api/user?login=admin
Authorization: Bearer <token>
```

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "full_name": "Admin Teste",
    "email": "admin@teste.com",
    "login": "admin",
    "cpf": "12345678901",
    "birth_date": "1990-01-01",
    "status": 1,
    "role": "Administrador"
  }
}
```

#### Response - Não Encontrado (404 Not Found)

```json
{
  "success": false,
  "message": "Usuário não encontrado."
}
```

#### Response - Parâmetros Inválidos (400 Bad Request)

```json
{
  "success": false,
  "message": "Informe um parâmetro de busca: id, full_name, email, login, cpf ou role."
}
```

```json
{
  "success": false,
  "message": "Informe apenas um parâmetro de busca por requisição."
}
```

---

### GET /api/users

**Descrição**: Lista todos os usuários.

**Autenticação**: ✅ Bearer token

**Permissão**: `users:read`

#### Request

```http
GET http://localhost:4040/api/users
Authorization: Bearer <token>
```

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "full_name": "Admin Teste",
      "email": "admin@teste.com",
      "login": "admin",
      "cpf": "12345678901",
      "birth_date": "1990-01-01T00:00:00.000Z",
      "status": 1,
      "creation_date": "2025-11-14T10:30:00.000Z",
      "role": "Administrador"
    },
    {
      "id": 2,
      "full_name": "João Silva",
      "email": "joao.silva@empresa.com",
      "login": "joao.silva",
      "cpf": "98765432100",
      "birth_date": "1990-05-15T00:00:00.000Z",
      "status": 1,
      "creation_date": "2025-11-14T11:00:00.000Z",
      "role": "Operador"
    }
  ]
}
```

---

### PUT /api/user/:id

**Descrição**: Atualiza usuário existente.

**Autenticação**: ✅ Bearer token

**Permissão**: `users:update`

**Validação**: Campos opcionais (Partial)

#### Request

```http
PUT http://localhost:4040/api/user/2
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "João Silva Santos",
  "email": "joao.santos@empresa.com",
  "status": 0,
  "role": "Gerente"
}
```

#### Campos (todos opcionais)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `full_name` | string | Nome completo |
| `email` | string | Email |
| `cpf` | string | CPF |
| `birth_date` | string | Data de nascimento |
| `password` | string | Nova senha (será hasheada) |
| `status` | number | 1 = Ativo, 0 = Inativo |
| `role` | string | Nome do cargo |

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "message": "Usuário atualizado com sucesso."
}
```

#### Response - Erro (400 Bad Request)

```json
{
  "success": false,
  "message": "Usuário não encontrado"
}
```

```json
{
  "success": false,
  "message": "Cargo 'CargoInexistente' não encontrado"
}
```

---

## 5. Cargos

### POST /api/role

**Descrição**: Cria novo cargo com permissões.

**Autenticação**: ✅ Bearer token

**Permissão**: `roles:create`

**Validação**: `addRoleSchema` (Joi)

#### Request

```http
POST http://localhost:4040/api/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role_name": "Gerente de RH",
  "description": "Gerente do departamento de Recursos Humanos",
  "permissions": [
    "users:create",
    "users:read",
    "users:update",
    "users:view",
    "roles:read",
    "roles:view"
  ]
}
```

#### Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `role_name` | string | ✅ | Nome do cargo |
| `description` | string | ❌ | Descrição do cargo |
| `permissions` | string[] | ❌ | Array de permissões |

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "message": "Cargo criado com 6 permissões"
}
```

---

### GET /api/role

**Descrição**: Busca cargo específico com permissões.

**Autenticação**: ✅ Bearer token

**Permissão**: `roles:read`

**Query Params** (apenas um):
- `id` - ID do cargo
- `role_name` - Nome do cargo (busca parcial)
- `description` - Descrição (busca parcial)

#### Request

```http
GET http://localhost:4040/api/role?id=1
Authorization: Bearer <token>
```

```http
GET http://localhost:4040/api/role?role_name=Administrador
Authorization: Bearer <token>
```

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "role_name": "Administrador",
    "description": "Administrador do sistema",
    "permissions": [
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
    ]
  }
}
```

#### Response - Não Encontrado (404 Not Found)

```json
{
  "success": false,
  "message": "Cargo não encontrado."
}
```

---

### GET /api/roles

**Descrição**: Lista todos os cargos com permissões.

**Autenticação**: ✅ Bearer token

**Permissão**: `roles:read`

#### Request

```http
GET http://localhost:4040/api/roles
Authorization: Bearer <token>
```

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "role_name": "Administrador",
      "description": "Administrador do sistema",
      "permissions": [
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
      ]
    },
    {
      "id": 2,
      "role_name": "Operador",
      "description": "Operador básico",
      "permissions": [
        "users:view",
        "logs:view"
      ]
    }
  ]
}
```

---

### PUT /api/role/:id

**Descrição**: Atualiza cargo existente.

**Autenticação**: ✅ Bearer token

**Permissão**: `roles:update`

#### Request

```http
PUT http://localhost:4040/api/role/2
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Operador com mais permissões",
  "permissions": [
    "users:view",
    "users:read",
    "roles:view",
    "logs:view"
  ]
}
```

#### Campos (todos opcionais)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `description` | string | Nova descrição |
| `permissions` | string[] | Nova lista de permissões (substitui antigas) |

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "message": "Cargo atualizado com sucesso"
}
```

---

## 6. Permissões

### GET /api/allowed

**Descrição**: Lista todas as permissões disponíveis no sistema.

**Autenticação**: ✅ Bearer token

**Permissão**: `roles:read`

#### Request

```http
GET http://localhost:4040/api/allowed
Authorization: Bearer <token>
```

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "data": [
    { "id": 1, "permission_name": "users:create" },
    { "id": 2, "permission_name": "users:read" },
    { "id": 3, "permission_name": "users:update" },
    { "id": 4, "permission_name": "users:delete" },
    { "id": 5, "permission_name": "users:view" },
    { "id": 6, "permission_name": "roles:create" },
    { "id": 7, "permission_name": "roles:read" },
    { "id": 8, "permission_name": "roles:update" },
    { "id": 9, "permission_name": "roles:delete" },
    { "id": 10, "permission_name": "roles:view" },
    { "id": 11, "permission_name": "logs:read" },
    { "id": 12, "permission_name": "logs:view" }
  ]
}
```

---

## 7. Logs

### GET /api/logs

**Descrição**: Lista logs de auditoria do sistema.

**Autenticação**: ✅ Bearer token

**Permissão**: `logs:read`

**Query Params** (opcional):
- `limit` - Número máximo de registros (default: todos)

#### Request

```http
GET http://localhost:4040/api/logs
Authorization: Bearer <token>
```

```http
GET http://localhost:4040/api/logs?limit=100
Authorization: Bearer <token>
```

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "who": "admin",
      "where": "auth",
      "when": "2025-11-14T10:30:00.000Z",
      "what": "Login successful"
    },
    {
      "id": 2,
      "user_id": 1,
      "who": "admin",
      "where": "users",
      "when": "2025-11-14T11:00:00.000Z",
      "what": "Criou usuário joao.silva com cargo Operador"
    },
    {
      "id": 3,
      "user_id": null,
      "who": "system",
      "where": "auth",
      "when": "2025-11-14T11:30:00.000Z",
      "what": "Login failed: user not found"
    }
  ]
}
```

#### Campos do Log

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID único do log |
| `user_id` | number\|null | ID do usuário (null se system) |
| `who` | string\|null | Nome do usuário ou 'system' |
| `where` | string | Módulo (auth, users, roles, logs) |
| `when` | string | Timestamp ISO 8601 |
| `what` | string | Descrição da ação |

---

## 8. Health Check

### GET /api/health

**Descrição**: Verifica status do servidor.

**Autenticação**: ❌ Não requer (endpoint público)

#### Request

```http
GET http://localhost:4040/api/health
```

#### Response - Sucesso (200 OK)

```json
{
  "success": true,
  "message": "Servidor online e funcionando",
  "timestamp": "2025-11-14T12:00:00.000Z"
}
```

---

## 9. Códigos de Status HTTP

| Código | Nome | Uso |
|--------|------|-----|
| **200** | OK | Requisição bem-sucedida |
| **400** | Bad Request | Payload inválido ou erro de validação |
| **401** | Unauthorized | Token ausente, inválido ou expirado |
| **403** | Forbidden | Token válido mas sem permissão |
| **404** | Not Found | Recurso não encontrado |
| **500** | Internal Server Error | Erro não tratado no servidor |

---

## 10. Exemplos de Requisições

### 10.1 cURL

#### Login
```bash
curl -X POST http://localhost:4040/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "admin",
    "senha": "admin123"
  }'
```

#### Criar Usuário
```bash
curl -X POST http://localhost:4040/api/user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "full_name": "João Silva",
    "email": "joao@email.com",
    "cpf": "12345678901",
    "birth_date": "1990-01-01",
    "user": "joao",
    "password": "senha123",
    "status": 1,
    "role": "Operador"
  }'
```

#### Listar Usuários
```bash
curl -X GET http://localhost:4040/api/users \
  -H "Authorization: Bearer eyJhbGc..."
```

### 10.2 JavaScript (fetch)

#### Login
```javascript
const response = await fetch('http://localhost:4040/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    usuario: 'admin',
    senha: 'admin123'
  })
})

const data = await response.json()
const token = data.token

// Salvar token
localStorage.setItem('authToken', token)
```

#### Criar Usuário
```javascript
const token = localStorage.getItem('authToken')

const response = await fetch('http://localhost:4040/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    full_name: 'João Silva',
    email: 'joao@email.com',
    cpf: '12345678901',
    birth_date: '1990-01-01',
    user: 'joao',
    password: 'senha123',
    status: 1,
    role: 'Operador'
  })
})

const data = await response.json()
console.log(data)
```

#### Listar Usuários
```javascript
const token = localStorage.getItem('authToken')

const response = await fetch('http://localhost:4040/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

const data = await response.json()
console.log(data.data)  // Array de usuários
```

### 10.3 Insomnia/Postman

Arquivo `insomnia.json` disponível em `/DOCS/insomnia.json` com todas as requisições pré-configuradas.

---

## Resumo da API

### Endpoints Públicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| POST | `/api/login` | Login e geração de token |

### Endpoints Protegidos - Usuários

| Método | Endpoint | Permissão | Descrição |
|--------|----------|-----------|-----------|
| POST | `/api/user` | `users:create` | Criar usuário |
| GET | `/api/user?<param>` | `users:read` | Buscar usuário |
| GET | `/api/users` | `users:read` | Listar usuários |
| PUT | `/api/user/:id` | `users:update` | Atualizar usuário |

### Endpoints Protegidos - Cargos

| Método | Endpoint | Permissão | Descrição |
|--------|----------|-----------|-----------|
| POST | `/api/role` | `roles:create` | Criar cargo |
| GET | `/api/role?<param>` | `roles:read` | Buscar cargo |
| GET | `/api/roles` | `roles:read` | Listar cargos |
| PUT | `/api/role/:id` | `roles:update` | Atualizar cargo |
| GET | `/api/allowed` | `roles:read` | Listar permissões |

### Endpoints Protegidos - Logs

| Método | Endpoint | Permissão | Descrição |
|--------|----------|-----------|-----------|
| GET | `/api/logs` | `logs:read` | Listar logs |

---

## Conclusão

A API REST do RH-OS é completa e bem documentada, seguindo padrões RESTful e implementando autenticação JWT com sistema de permissões granular. Todos os endpoints retornam respostas padronizadas em JSON e implementam tratamento de erros adequado.

### Pontos Fortes

- ✅ RESTful compliant
- ✅ JWT authentication
- ✅ Granular permissions
- ✅ Consistent response format
- ✅ Proper HTTP status codes
- ✅ Input validation (Joi)
- ✅ Comprehensive error handling

### Melhorias Futuras

- Rate limiting
- API versioning (/api/v1/...)
- Pagination para listagens
- Filtros e ordenação avançados
- WebSocket para notificações em tempo real
- OpenAPI/Swagger documentation
- HTTPS em produção

---

**Fim da Documentação do Backend RH-OS**

**Versão**: 1.0.0  
**Data**: Novembro 2025  
**Autor**: Documentação gerada para o projeto RH-OS
