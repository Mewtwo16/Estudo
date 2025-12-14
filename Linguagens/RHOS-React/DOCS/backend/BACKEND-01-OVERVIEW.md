# 🔧 Documentação do Backend - RH-OS

## Parte 1: Visão Geral e Arquitetura

---

## Índice Geral da Documentação

1. **[BACKEND-01-OVERVIEW.md]** - Visão Geral e Arquitetura (este arquivo)
2. **[BACKEND-02-DATABASE.md]** - Banco de Dados e Schema
3. **[BACKEND-03-AUTH.md]** - Autenticação e Autorização
4. **[BACKEND-04-SERVICES.md]** - Serviços e Lógica de Negócio
5. **[BACKEND-05-API.md]** - Endpoints e Rotas

---

## 1. Visão Geral

O backend do RH-OS é uma API REST construída com Node.js e Express, utilizando TypeScript para type safety. O sistema implementa autenticação JWT, controle de permissões granular e auditoria completa de ações.

### Características Principais

- ✅ **API RESTful** - Endpoints padronizados seguindo boas práticas REST
- ✅ **TypeScript** - Type safety completo em toda a aplicação
- ✅ **Autenticação JWT** - Tokens seguros com expiração de 8 horas
- ✅ **Autorização Granular** - Sistema de permissões por entidade:ação
- ✅ **Auditoria Completa** - Logs de todas as ações do sistema
- ✅ **Transações** - Operações atômicas garantindo consistência
- ✅ **Validação de Dados** - Schemas Joi para validação de payloads
- ✅ **Criptografia** - Senhas hasheadas com bcrypt (salt rounds: 10)
- ✅ **Query Builder** - Knex.js para queries type-safe
- ✅ **MySQL** - Banco de dados relacional robusto

---

## 2. Arquitetura

### 2.1 Padrão de Arquitetura

O backend segue uma arquitetura em **camadas (Layered Architecture)** com separação clara de responsabilidades:

```
┌─────────────────────────────────────────┐
│           CLIENT (Frontend)              │
│         (React + Electron)               │
└──────────────┬──────────────────────────┘
               │ HTTP/HTTPS
               │ JSON
               ▼
┌─────────────────────────────────────────┐
│        ROUTER LAYER (router.ts)          │
│  - Define rotas e endpoints              │
│  - Aplica middlewares                    │
│  - Mapeia rotas para controllers         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     MIDDLEWARE LAYER (middlewares/)      │
│  - Validação de payloads (Joi)          │
│  - Autenticação (JWT)                    │
│  - Autorização (Permissions)             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│       ROUTE HANDLERS (routes/)           │
│  - Controllers das rotas                 │
│  - Recebe Request, devolve Response      │
│  - Chama Services                        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      SERVICE LAYER (services/)           │
│  - Lógica de negócio                     │
│  - Transações do banco                   │
│  - Processamento de dados                │
│  - Registro de logs                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      DATA ACCESS LAYER (db/db.ts)        │
│  - Knex.js Query Builder                 │
│  - Conexão com MySQL                     │
│  - Queries type-safe                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         DATABASE (MySQL)                 │
│  - users, roles, allowed                 │
│  - role_users, roles_allowed             │
│  - audit_logs                            │
└─────────────────────────────────────────┘
```

### 2.2 Fluxo de Request/Response

```
1. Cliente faz request
   POST /api/user
   Headers: { Authorization: Bearer <token> }
   Body: { name: "João", login: "joao", ... }
   ↓

2. Express recebe request
   ↓

3. Router identifica rota
   route.post('/api/user', ...)
   ↓

4. Middleware de Autorização
   requirePermissions('users:create')
   - Valida token JWT
   - Verifica permissão
   - Injeta req.user
   ↓

5. Middleware de Validação
   userIsValid(addUserSchema)
   - Valida payload com Joi
   - Retorna 400 se inválido
   ↓

6. Route Handler
   addUserRoute(req, res)
   - Extrai dados do body
   - Chama Service
   ↓

7. Service Layer
   UserService.addUser()
   - Inicia transação
   - Hash da senha
   - Insere usuário no DB
   - Associa cargos
   - Registra log
   - Commit da transação
   ↓

8. Data Access Layer
   db('users').insert(...)
   - Executa queries SQL
   - Retorna IDs/dados
   ↓

9. Database
   - Persiste dados
   - Retorna resultado
   ↓

10. Response ao Cliente
    { success: true, message: "Usuário criado" }
```

---

## 3. Stack Tecnológico

### 3.1 Core

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Node.js** | 18+ | Runtime JavaScript |
| **Express** | ^4.18.2 | Framework web |
| **TypeScript** | ^5.5.2 | Superset tipado |

### 3.2 Banco de Dados

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **MySQL** | 8.0+ | Banco de dados relacional |
| **Knex.js** | ^3.1.0 | Query builder |
| **mysql2** | ^3.11.3 | Driver MySQL para Node |

### 3.3 Autenticação e Segurança

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **jsonwebtoken** | ^9.0.2 | Geração/validação JWT |
| **bcrypt** | ^5.1.1 | Hash de senhas |
| **@types/bcrypt** | ^5.0.2 | Tipos TypeScript bcrypt |
| **@types/jsonwebtoken** | ^9.0.7 | Tipos TypeScript JWT |

### 3.4 Validação

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Joi** | ^17.13.3 | Validação de schemas |

### 3.5 Utilitários

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **dotenv** | ^16.4.5 | Variáveis de ambiente |
| **cors** | ^2.8.5 | Cross-Origin Resource Sharing |

---

## 4. Estrutura de Pastas

```
src/main/
│
├── server.ts                   # Entry point do servidor Express
├── router.ts                   # Definição de todas as rotas
├── types.ts                    # Tipos TypeScript globais
├── middleware.ts               # [VAZIO] - Placeholder
│
├── database/                   # Scripts SQL
│   └── database.sql            # Schema completo do banco
│
├── db/                         # Data Access Layer
│   └── db.ts                   # Configuração Knex.js + conexão MySQL
│
├── middlewares/                # Middlewares da aplicação
│   ├── authorization.ts        # Validação JWT e permissões
│   ├── loginValidate.ts        # Validação schema de login (Joi)
│   ├── addUserValidate.ts      # Validação schema de usuário (Joi)
│   └── addRoleValidate.ts      # Validação schema de cargo (Joi)
│
├── routes/                     # Route Handlers (Controllers)
│   ├── authRoute.ts            # POST /api/login
│   ├── userRoute.ts            # CRUD de usuários
│   ├── roleRoute.ts            # CRUD de cargos
│   ├── allowedRoute.ts         # GET permissões disponíveis
│   ├── logRoute.ts             # GET logs de auditoria
│   └── healthRoute.ts          # GET /api/health (healthcheck)
│
└── services/                   # Service Layer (Lógica de negócio)
    ├── authService.ts          # Autenticação e geração JWT
    ├── userService.ts          # Lógica de usuários
    ├── roleService.ts          # Lógica de cargos
    ├── allowedService.ts       # Lógica de permissões
    ├── logService.ts           # Lógica de auditoria
    └── healthService.ts        # Status do servidor
```

---

## 5. Arquivo de Configuração (.env)

O backend utiliza variáveis de ambiente para configuração sensível:

```env
# Servidor Express
EXPRESS_PORT=4040

# Banco de Dados MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=RHOS

# JWT Secret (IMPORTANTE: Use chave forte em produção)
JWT_SECRET=seu_secret_super_secreto_aqui_12345
```

### Variáveis Obrigatórias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `EXPRESS_PORT` | Porta do servidor Express | 4040 |
| `DB_HOST` | Host do MySQL | localhost |
| `DB_PORT` | Porta do MySQL | 3306 |
| `DB_USER` | Usuário do banco | root |
| `DB_PASSWORD` | Senha do banco | senha123 |
| `DB_DATABASE` | Nome do database | RHOS |
| `JWT_SECRET` | Chave secreta JWT | chave_super_secreta_123 |

### ⚠️ Segurança das Variáveis

- **NUNCA** commite o arquivo `.env` no Git
- Adicione `.env` ao `.gitignore`
- Em produção, use secrets managers (AWS Secrets Manager, HashiCorp Vault)
- JWT_SECRET deve ter pelo menos 32 caracteres aleatórios

---

## 6. Inicialização do Servidor

### 6.1 Arquivo server.ts

```typescript
import express from 'express'
import router from './router'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.EXPRESS_PORT ?? 3000

// Middlewares globais
app.use(express.json())                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true }))  // Parse URL-encoded bodies

// Rotas
app.use(router)

// Inicialização
app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`)
})

export default app
```

### 6.2 Fluxo de Inicialização

```
1. Aplicação Electron inicia
   ↓
2. main.ts chama startServer()
   ↓
3. startServer() executa server.ts
   ↓
4. dotenv.config() carrega variáveis .env
   ↓
5. Express app é criado
   ↓
6. Middlewares globais registrados:
   - express.json()
   - express.urlencoded()
   ↓
7. Router é registrado
   - Todas as rotas definidas em router.ts
   ↓
8. app.listen(4040)
   ↓
9. ✅ Servidor online em http://localhost:4040
```

---

## 7. Sistema de Types (types.ts)

O backend utiliza TypeScript com interfaces bem definidas:

### 7.1 Response Types

```typescript
export interface AnyResponse {
  success: boolean
  message?: string
  data?: any
}

export interface LoginResponse {
  success: boolean
  message: string
  token?: string
}

export interface AllowedResponse {
  success: boolean
  data?: AllowedPermission[]
  message?: string
}
```

### 7.2 Authentication Types

```typescript
export interface AuthUser {
  id: number
  usuario: string
  cargo: string[]      // Array de nomes de cargos
  permissoes: string[] // Array de permissões (ex: 'users:create')
}

export interface AuthRequest extends Request {
  user?: AuthUser      // Injetado pelo middleware de autorização
}
```

### 7.3 Entity Types

```typescript
// Usuário completo (do banco)
export interface User {
  id: number
  full_name: string
  email: string
  login: string
  cpf: string
  birth_date: string
  status: boolean
  role: string
}

// Dados para criação de usuário
export interface addUser {
  full_name: string
  email: string
  cpf: string
  birth_date: string
  user: string         // login
  password: string
  status: boolean
  role: string
}

// Cargo
export interface Role {
  id: number
  role_name: string
  description?: string
  allowed_id?: number
}

// Dados para criação de cargo
export interface addRole {
  role_name: string
  description?: string
  permissions?: string[]  // Array de permission_name
}

// Permissão
export interface AllowedPermission {
  id: number
  permission_name: string  // Ex: 'users:create'
}

// Log de auditoria
export interface LogEntry {
  user_id?: number | null
  who?: string | null      // Nome do usuário ou 'system'
  where: string            // Módulo (ex: 'auth', 'users', 'roles')
  what: string             // Descrição da ação
}
```

### 7.4 Uso dos Types

```typescript
// Em um Service
class UserService {
  async addUser(
    userData: addUser, 
    loggedUser?: AuthUser
  ): Promise<AnyResponse> {
    // Implementação
  }
}

// Em um Route Handler
import { AuthRequest } from '../types'

export async function addUserRoute(req: AuthRequest, res: Response) {
  const userData: addUser = req.body
  const loggedUser = req.user  // Injetado pelo middleware
  
  const result = await UserService.addUser(userData, loggedUser)
  res.json(result)
}
```

---

## 8. Middlewares Globais

### 8.1 express.json()

**Propósito**: Parse automático de JSON no body das requisições.

**Comportamento**:
```
Request Body (raw):
'{"name":"João","login":"joao"}'

Após middleware:
req.body = {
  name: "João",
  login: "joao"
}
```

### 8.2 express.urlencoded({ extended: true })

**Propósito**: Parse de dados URL-encoded (formulários HTML).

**Comportamento**:
```
Request Body (URL-encoded):
'name=Jo%C3%A3o&login=joao'

Após middleware:
req.body = {
  name: "João",
  login: "joao"
}
```

---

## 9. Padrões de Desenvolvimento

### 9.1 Padrão de Service

Todos os services seguem o mesmo padrão:

```typescript
class ServiceName {
  // Método principal sempre retorna AnyResponse ou tipo específico
  async mainMethod(data: InputType, loggedUser?: AuthUser): Promise<AnyResponse> {
    try {
      // Usa transação para operações atômicas
      await db.transaction(async (trx) => {
        // 1. Validações
        // 2. Operações no banco
        // 3. Registro de log
      })

      return { success: true, message: '...' }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }
}

export default new ServiceName()  // Singleton
```

### 9.2 Padrão de Route Handler

```typescript
export async function routeName(req: AuthRequest, res: Response) {
  try {
    // 1. Extrai dados
    const data = req.body
    const loggedUser = req.user

    // 2. Chama service
    const result = await SomeService.method(data, loggedUser)

    // 3. Retorna response
    if (result.success) {
      return res.status(200).json(result)
    } else {
      return res.status(400).json(result)
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
```

### 9.3 Padrão de Middleware

```typescript
export function middlewareName(config: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Validação/processamento
      
      // 2. Se OK, passa adiante
      next()
      
      // 3. Se erro, retorna response
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }
}
```

---

## 10. Tratamento de Erros

### 10.1 Estratégia de Erros

```
┌─────────────────────────────────────┐
│     Nível: Route Handler             │
│  - Captura erros não tratados        │
│  - Retorna 500 Internal Server Error │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       Nível: Service Layer           │
│  - Try/catch em operações            │
│  - Retorna { success: false }        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Nível: Database/Knex             │
│  - Erros SQL propagados              │
│  - Rollback automático em transações │
└─────────────────────────────────────┘
```

### 10.2 Códigos HTTP Usados

| Código | Uso | Exemplo |
|--------|-----|---------|
| **200** | Sucesso | GET/POST/PUT bem-sucedidos |
| **400** | Bad Request | Validação falhou |
| **401** | Unauthorized | Token ausente ou inválido |
| **403** | Forbidden | Sem permissão para ação |
| **404** | Not Found | Recurso não existe |
| **500** | Internal Error | Erro não tratado |

---

## 11. Logging e Auditoria

### 11.1 Sistema de Logs

Todas as ações importantes são registradas na tabela `audit_logs`:

```typescript
await logService.write({
  user_id: 1,              // ID do usuário (ou null)
  who: 'admin',            // Nome do usuário ou 'system'
  where: 'users',          // Módulo (auth, users, roles, logs)
  what: 'Criou usuário João Silva'  // Descrição da ação
})
```

### 11.2 Eventos Auditados

- ✅ **Login** - Sucesso e falhas
- ✅ **Criação de usuário** - Com cargo associado
- ✅ **Atualização de usuário** - Campos alterados
- ✅ **Criação de cargo** - Com permissões
- ✅ **Atualização de cargo** - Permissões adicionadas/removidas

---

## 12. Conclusão

O backend do RH-OS é uma API REST robusta e bem estruturada, seguindo padrões modernos de desenvolvimento:

### Pontos Fortes

- ✅ Arquitetura em camadas clara
- ✅ Separação de responsabilidades
- ✅ Type safety com TypeScript
- ✅ Segurança com JWT e bcrypt
- ✅ Auditoria completa
- ✅ Transações para consistência
- ✅ Validação de dados
- ✅ Código reutilizável (Services)

### Próximas Partes da Documentação

- **[Parte 2]** - Banco de Dados e Schema
- **[Parte 3]** - Autenticação e Autorização
- **[Parte 4]** - Serviços e Lógica de Negócio
- **[Parte 5]** - Endpoints e Rotas

---

**Versão**: 1.0.0  
**Data**: Novembro 2025  
**Autor**: Documentação gerada para o projeto RH-OS
