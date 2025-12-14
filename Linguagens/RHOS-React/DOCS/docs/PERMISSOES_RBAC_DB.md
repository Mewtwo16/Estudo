# Permissões no Banco (RBAC) + Token JWT: guia completo

Este guia explica, passo a passo, como modelar, armazenar e validar permissões (RBAC) no MySQL usando o schema já existente do projeto, e como integrar isso com o middleware de autenticação/autorização por token JWT no Express.

Contexto do projeto:
- Banco MySQL com tabelas: `users`, `roles`, `allowed`, `role_users`, `roles_allowed`, `audit_logs` (ver `src/main/database/database.sql`).
- Conexão via Knex: `src/main/db/db.ts` (client mysql2).
- Emissão do token com permissões: `src/main/services/authService.ts`.
- Rotas Express: `src/main/router.ts` e rotas em `src/main/routes/*`.

## 1) Modelo de dados e convenções

Tabelas (conforme já usado no projeto):
- `users(id, full_name, email, login, password_hash, ...)` — usuários.
- `roles(id, role_name, description)` — cargos/grupos.
- `allowed(id, permission_name)` — catálogo de permissões atômicas.
- `role_users(users_id, roles_id)` — relação N:N entre usuários e cargos.
- `roles_allowed(roles_id, allowed_id)` — relação N:N entre cargos e permissões.
- `audit_logs` — auditoria (opcional para logs de acesso/negações).

Convenção de nomes de permissões (`allowed.permission_name`):
- Use padrão "recurso:ação". Exemplos:
  - `roles:view`, `roles:create`, `roles:update`, `roles:delete`
  - `users:view`, `users:create`, `users:update`, `users:delete`
- Para telas específicas, use prefixos de domínio: `screen:roles:view`, `screen:users:edit`.
- Evite espaços; mantenha tudo em minúsculas, separado por `:`.

Benefícios:
- Claro e previsível.
- Facilita política de frontend (mostrar/ocultar botões por permissão).

## 2) Como cadastrar permissões e atribuí-las a cargos

Você pode inserir diretamente via SQL (útil para seeds) ou via Knex.

Exemplo SQL (seed inicial):
```sql
-- Cadastrar permissões para a tela de cargos
INSERT INTO RHOS.allowed (permission_name) VALUES
  ('roles:view'),
  ('roles:create'),
  ('roles:update'),
  ('roles:delete')
ON DUPLICATE KEY UPDATE permission_name = VALUES(permission_name);

-- Relacionar essas permissões ao cargo Administrador
INSERT INTO RHOS.roles_allowed (roles_id, allowed_id)
SELECT r.id, a.id
FROM RHOS.roles r
JOIN RHOS.allowed a ON a.permission_name IN ('roles:view','roles:create','roles:update','roles:delete')
WHERE r.role_name = 'Administrador'
ON DUPLICATE KEY UPDATE roles_id = roles_id;
```

Exemplo com Knex (Node):
```ts
import db from '../src/main/db/db'

async function seedRolesPermissions() {
  const perms = ['roles:view','roles:create','roles:update','roles:delete']

  // upsert allowed
  for (const p of perms) {
    const exists = await db('allowed').where({ permission_name: p }).first()
    if (!exists) await db('allowed').insert({ permission_name: p })
  }

  // relacionamento com Administrador
  const admin = await db('roles').where({ role_name: 'Administrador' }).first()
  if (!admin) throw new Error('Role Administrador não existe')

  const allowedRows = await db('allowed').whereIn('permission_name', perms)
  for (const a of allowedRows) {
    const link = await db('roles_allowed').where({ roles_id: admin.id, allowed_id: a.id }).first()
    if (!link) await db('roles_allowed').insert({ roles_id: admin.id, allowed_id: a.id })
  }
}
```

## 3) Emitindo o token com permissões do usuário

No login, o service agrega `permissoes` a partir das tabelas de junção (já implementado):

```ts
// src/main/services/authService.ts (trechos relevantes)
const permissions = await db('allowed')
  .join('roles_allowed', 'allowed.id', '=', 'roles_allowed.allowed_id')
  .join('role_users', 'roles_allowed.roles_id', '=', 'role_users.roles_id')
  .where('role_users.users_id', user.id)
  .distinct('allowed.permission_name')
  .pluck('permission_name') as string[]

const roles = await db('roles')
  .join('role_users', 'roles.id', '=', 'role_users.roles_id')
  .where('role_users.users_id', user.id)
  .distinct('roles.role_name')
  .pluck('role_name') as string[]

const token = jwt.sign({ id: user.id, usuario: user.login, cargo: roles, permissoes: permissions }, JWT_SECRET, { expiresIn: '8h' })
```

Vantagens de embutir as permissões no token:
- Evita consultas ao DB a cada request.
- Simples de conferir no middleware.

Atenção: como o token tem snapshot das permissões, mudanças de permissão só valem após novo login (ou após um fluxo de refresh). Se precisar de revogação imediata, use um controle de sessão/denylist ou verifique o DB em endpoints críticos.

## 4) Middleware: autenticando e autorizando com permissões do token

Baseado no documento anterior (MIDDLEWARE_E_PERMISSOES.md), o fluxo é:
- `authenticateToken`: valida `Authorization: Bearer <token>` e popula `req.user`.
- `requirePermissions('roles:create')`: checa se `req.user.permissoes` contém as permissões necessárias.

Exemplo (resumo):
```ts
export function authenticateToken(req, res, next) { /* ... verify JWT ... req.user = payload; next(); */ }
export function requirePermissions(...perms: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) return res.status(401).json({ success: false, message: 'Não autenticado' })
    const has = perms.every((p) => user.permissoes?.includes(p))
    if (!has) return res.status(403).json({ success: false, message: 'Acesso negado (permissão)' })
    next()
  }
}
```

Aplicando nas rotas (exemplos reais):
```ts
// src/main/router.ts
route.get('/api/health', healthRoute)
route.post('/api/login', loginIsValid(loginSchema), loginRoute)

// protegido por token
route.use(authenticateToken)

// ver cargo específico (requer apenas estar logado, ou opcional: requirePermissions('roles:view'))
route.get('/api/role', /* requirePermissions('roles:view'), */ getRoleRoute)

// criar cargo (requer permissão)
route.post('/api/role', requirePermissions('roles:create'), addRoleRoute)
```

## 5) Como armazenar permissões por tela e usá-las no frontend

Estratégia recomendada:
- Defina permissões por ação da tela (ver, criar, editar, excluir). Ex.: `roles:view`, `roles:create`...
- No login, o frontend recebe o token contendo `permissoes` e armazena-o em memória (estado). Evite persistir em claro.
- No renderer, crie um helper para verificar permissão e controlar features.

Exemplo de helper no renderer:
```ts
// renderer/src/permissions.ts
export function can(userPerms: string[] | undefined, ...needed: string[]) {
  if (!userPerms) return false
  return needed.every((p) => userPerms.includes(p))
}
``)

Uso em um componente (condicionar botão "Criar"):
```tsx
// Em Role.tsx (após obter o payload do token via IPC/estado)
import { can } from '../permissions'

function RoleScreen({ user }) {
  const perms = user?.permissoes
  return (
    <div>
      <h2>Cargos</h2>
      {can(perms, 'roles:create') && (
        <button onClick={handleCreate}>Criar cargo</button>
      )}
    </div>
  )
}
```

Validação dupla (recomendada):
- Frontend: controla visibilidade/UX.
- Backend: exige a permissão com `requirePermissions` (segurança real).

## 6) Cenário completo: habilitar a tela de cargos com permissões

Objetivo: apenas usuários com `roles:view` podem consultar cargos; só quem tem `roles:create` pode criar.

Passos:
1. Cadastrar permissões no `allowed` (SQL/Knex conforme seção 2).
2. Atribuir ao cargo desejado em `roles_allowed` (ex.: Administrador).
3. Garantir que seu usuário tenha o cargo (tabela `role_users`).
4. Fazer login para emitir um token com essas permissões.
5. Backend: proteger as rotas.
   - GET `/api/role` com `authenticateToken` (e opcionalmente `requirePermissions('roles:view')`).
   - POST `/api/role` com `requirePermissions('roles:create')`.
6. Frontend: condicionar botões/links com base em `user.permissoes` do token.

## 7) Políticas avançadas

- Superadmin: crie uma role, ex.: `SuperAdmin`, com todas as permissões (atalho de manutenção). No middleware, você pode aceitar como bypass se `user.cargo` contiver `SuperAdmin`.
- Wildcards (quando necessário): padronize nomes para permitir agrupamentos (`roles:*`). Isso exige lógica adicional de resolução de curingas no middleware ou no login (expandir `*` para permissões concretas).
- Revogação imediata: implemente uma denylist de tokens (e.g., tabela `revoked_tokens` com jti e expiração) ou encurte o `expiresIn` e adote refresh tokens.
- Auditoria: logar negações e ações críticas em `audit_logs` para rastreabilidade.

Exemplo de bypass por cargo (opcional):
```ts
export function requirePermissionsOrAdmin(...perms: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) return res.status(401).json({ success: false, message: 'Não autenticado' })
    const isAdmin = user.cargo?.includes('Administrador') || user.cargo?.includes('SuperAdmin')
    if (isAdmin) return next()
    const has = perms.every((p) => user.permissoes?.includes(p))
    if (!has) return res.status(403).json({ success: false, message: 'Acesso negado (permissão)' })
    next()
  }
}
```

## 8) Testando rapidamente

- Login:
```bash
curl -s -X POST http://localhost:4040/api/login \
  -H 'Content-Type: application/json' \
  -d '{"usuario":"admin","senha":"admin123"}'
```
- Usar token retornado:
```bash
curl -s 'http://localhost:4040/api/role?role_name=admin' \
  -H 'Authorization: Bearer <TOKEN>'
```
- Tentar criar cargo (requer `roles:create`):
```bash
curl -s -X POST http://localhost:4040/api/role \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"role_name":"Operador","description":"Operações"}'
```

## 9) Boas práticas

- Comece com política "deny by default" (sem permissão explícita, não acessa).
- Centralize criação/edição de permissões (evite espalhar strings mágicas).
- Documente a matriz rota/tela → permissão.
- Adote testes automatizados para rotas críticas (401/403/200).
- Valide todos os inputs (Joi já está no login; reusar para outras rotas).

---

Com essa estrutura, você tem um RBAC simples e eficaz: permissões guardadas no banco, agregadas ao token no login e validadas em middleware no backend, com suporte a gating no frontend. Fica fácil evoluir (novas telas/ações) apenas criando novas entradas em `allowed` e relacionando-as em `roles_allowed`.
