# Middleware de Autenticação e Autorização (RBAC) com JWT

Este documento explica como implementar e usar middlewares para autenticação (validar token JWT) e autorização (restringir acesso por cargo e/ou permissões) no seu backend Express, usando o contexto atual do projeto.

- Stack: Express + Knex + JWT (jsonwebtoken)
- Local principal do servidor: `src/main/server.ts` e `src/main/router.ts`
- Emissão do token (login): `src/main/services/authService.ts` + `src/main/routes/authRoute.ts`
- Tipos relevantes: `src/main/types.ts`

## Visão geral

Fluxo típico:
1. Usuário faz login em `/api/login` e recebe um JWT contendo `id`, `usuario`, `cargo[]` e `permissoes[]`.
2. O frontend armazena o token (memória/estado) e envia em cada requisição protegida via `Authorization: Bearer <token>`.
3. No backend, um middleware valida o token (autenticação). Se válido, `req.user` é preenchido com o payload.
4. Middlewares de autorização verificam se `req.user` possui os cargos/permissões necessários para acessar a rota.

## Token JWT no projeto

O token é gerado em `authService.login`:

```ts
// src/main/services/authService.ts (trecho)
const token = jwt.sign(
  {
    id: user.id,
    usuario: user.login,
    cargo: roles,           // string[] de cargos do usuário
    permissoes: permissions // string[] de permissões do usuário
  },
  secret,
  { expiresIn: '8h' }
)
```

Requisitos:
- Definir `JWT_SECRET` no `.env`.
- O token expira em 8 horas (ajuste conforme sua política).

## Middleware de autenticação (validar token)

Crie um middleware para:
- Ler `Authorization` header (formato `Bearer <token>`)
- Verificar o token com `jwt.verify`
- Popular `req.user` com o payload

Exemplo sugerido para `src/main/middlewares/auth.ts`:

```ts
// src/main/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthUser {
  id: number
  usuario: string
  cargo: string[]
  permissoes: string[]
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers['authorization']
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token ausente' })
  }

  const token = auth.slice('Bearer '.length)
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return res.status(500).json({ success: false, message: 'JWT secreto não configurado' })
  }

  try {
    const payload = jwt.verify(token, secret) as AuthUser
    // opcional: validações adicionais do payload
    ;(req as any).user = payload
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido ou expirado' })
  }
}
```

Observações:
- Em caso de falha, responda 401 (não autenticado).
- Em sucesso, `req.user` conterá `id`, `usuario`, `cargo[]`, `permissoes[]`.

## Middlewares de autorização (por cargo e por permissão)

Dois padrões úteis: por cargo (role-based) e por permissão (permission-based).

```ts
// src/main/middlewares/auth.ts (continuação)
export function requireRoles(...roles: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    const user: AuthUser | undefined = req.user
    if (!user) return res.status(401).json({ success: false, message: 'Não autenticado' })

    const has = user.cargo?.some((r) => roles.includes(r))
    if (!has) return res.status(403).json({ success: false, message: 'Acesso negado (cargo)' })

    next()
  }
}

export function requirePermissions(...perms: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    const user: AuthUser | undefined = req.user
    if (!user) return res.status(401).json({ success: false, message: 'Não autenticado' })

    const has = perms.every((p) => user.permissoes?.includes(p))
    if (!has) return res.status(403).json({ success: false, message: 'Acesso negado (permissão)' }
)
    next()
  }
}
```

- `403 Forbidden` quando autenticado mas sem autorização.
- `requireRoles('admin')` exige que algum cargo do usuário seja `admin`.
- `requirePermissions('users:create')` exige que o usuário tenha a permissão específica.

## Como usar nas rotas (exemplos reais do projeto)

No arquivo `src/main/router.ts`, aplique os middlewares nas rotas que precisam estar protegidas. A rota de `login` e `health` normalmente ficam públicas.

```ts
// src/main/router.ts (exemplo de uso)
import express from 'express'
import { loginSchema, loginIsValid } from './middlewares/loginValidate'
import { authenticateToken, requireRoles, requirePermissions } from './middlewares/auth'

import { loginRoute } from './routes/authRoute'
import { addUserRoute } from './routes/userRoute'
import { healthRoute } from './routes/healthRoute'
import { addRoleRoute, getRoleRoute } from './routes/roleRoute'

const route = express.Router()

// Rotas públicas
route.get('/api/health', healthRoute)
route.post('/api/login', loginIsValid(loginSchema), loginRoute)

// A partir daqui: rotas protegidas (exigem token válido)
route.use(authenticateToken)

// Exemplo: criar usuário (requer permissão)
route.post('/api/user', requirePermissions('users:create'), addUserRoute)

// Exemplo: consultar cargo específico (qualquer autenticado)
route.get('/api/role', getRoleRoute)

// Exemplo: criar cargo (requer cargo admin OU permissão específica)
route.post(
  '/api/role',
  // qualquer uma das verificações pode ser usada isoladamente
  // requireRoles('admin'),
  requirePermissions('roles:create'),
  addRoleRoute
)

export default route
```

Dicas:
- Você pode granular as proteções: algumas rotas exigem apenas autenticação; outras exigem um cargo específico; outras uma ou mais permissões.
- Para cenários mais complexos, combine múltiplos middlewares.

## Como o frontend envia o token

O seu `preload/index.ts` já expõe um método `submitLogin`. Para requisições autenticadas, inclua o header `Authorization` com o token.

Exemplo simples de chamada autenticada a partir do renderer:

```ts
// renderer (ex.: dentro de um componente após login)
async function fetchRoleByName(token: string, roleName: string) {
  const API_BASE = `http://localhost:${process.env.EXPRESS_PORT || 3000}`
  const res = await fetch(`${API_BASE}/api/role?role_name=${encodeURIComponent(roleName)}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`)
  return data
}
```

Boas práticas no Electron:
- Prefira manter o token em memória (estado do app) ou usar IPC seguro via preload.
- Evite persistir o token em claro no disco. Se precisar, considere criptografia/secure storage.

## Padrões de resposta e erros

- 401 Unauthorized: token ausente/inválido/expirado.
- 403 Forbidden: autenticado mas sem permissão/cargo requerido.
- 200 OK: acesso concedido, retorna o payload da rota.

Exemplo de resposta de erro uniformizada:
```json
{
  "success": false,
  "message": "Acesso negado (permissão)"
}
```

## Logs (opcional, recomendado)

Você já possui `logService.writeLogs`. É útil registrar tentativas de acesso negadas. Exemplo dentro do middleware de autorização:

```ts
import logService from '../services/logService'

// dentro de requirePermissions
await logService.writeLogs({
  user_id: (req as any).user?.id || null,
  username: (req as any).user?.usuario || null,
  action: 'deny',
  resource: req.path,
  resource_id: null,
  details: `Permissão faltante: ${perms.join(', ')}`
})
```

## Segurança e considerações

- Rotacione `JWT_SECRET` periodicamente e mantenha-o fora do versionamento.
- Ajuste `expiresIn` conforme o risco e o perfil de uso.
- Considere clock skew (diferenças de horário) — trate erros de expiração com UX apropriado no cliente.
- Em endpoints sensíveis, valide também inputs (ex.: JOI já está sendo utilizado no login).

## Checklist rápido de adoção

1. Criar `src/main/middlewares/auth.ts` com `authenticateToken`, `requireRoles`, `requirePermissions` (conforme exemplos).
2. Importar e usar em `src/main/router.ts` (proteger as rotas desejadas).
3. Garantir `JWT_SECRET` no `.env`.
4. No renderer, enviar `Authorization: Bearer <token>` nas chamadas protegidas.
5. Opcional: adicionar logs de negação de acesso e testes de unidade dos middlewares.

---

Com isso, você tem autenticação por token e autorização por cargos/permissões, pronta para ser aplicada nas rotas do projeto com exemplos que se encaixam no seu código atual.
