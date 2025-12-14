# Estrutura de um servidor Express — guia prático (contexto do seu projeto)

Este documento explica, passo a passo, a estrutura típica de um servidor Express aplicada ao seu projeto Electron + Express + Knex + React. Inclui: organização de arquivos, responsabilidades (router, controller/service, middleware), validação de formulários no backend e exemplos concretos que você pode copiar.

Sumário
- 1. Objetivo
- 2. Estrutura de pastas recomendada
- 3. Conceitos principais (Router, Controller/Service, Middleware)
- 4. Inicialização do servidor (server.ts)
- 5. Validação de formulário no backend (exemplos com express-validator e Joi)
- 6. Exemplo completo: rota de login com validação e resposta padronizada
- 7. Boas práticas (erros, logs, segurança)
- 8. Checklist de integração com o frontend (preload/contextBridge)


1) Objetivo

No seu contexto, o Express atua como a API local que fornece dados ao renderer (React). O Electron injeta um preload que chama essas rotas (ex.: POST /api/login). O servidor deve ser:
- modular (routers por domínio)
- seguro (validar inputs, tratar tokens)
- previsível (respostas JSON padronizadas)


2) Estrutura de pastas recomendada

Sugestão aplicada ao seu projeto (simplificada):

```
src/main/
  server.ts            # ponto de entrada do servidor (app.listen)
  router.ts            # combina routers de domínio
  routes/
    auth.ts            # roteamento específico de auth (endpoints)
  services/
    authService.ts     # lógica de login, consultas ao DB (já tem algo em routes/auth.ts)
  middlewares/
    validate.ts        # funções de validação/err handler
    authMiddleware.ts  # checa JWT em rotas protegidas
  db/
    db.ts              # exporta o knex (você já tem)
```

Observação: você já tem `src/main/routes/auth.ts` que combina a lógica; o ideal é separar `route` (endpoints) de `service` (lógica de negócio) quando o projeto crescer, mas não é obrigatório agora.


3) Conceitos principais

- Router
  - Define endpoints (URLs) e vincula middlewares e controllers.
  - Exemplo: `POST /api/login`.

- Controller/Service
  - Executa a lógica (validação business, consultas ao DB via Knex, criação de token JWT).
  - Retorna objetos/erros padronizados.

- Middleware
  - Função que intercepta request/response. Ex.: autenticação, parsing, validação.
  - Ordem importa: `app.use(express.json())` deve vir antes de rotas que leem `req.body`.


4) Inicialização do servidor (`server.ts`) — exemplo minimal

```ts
import express from 'express'
import cors from 'cors'
import router from './router'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(router)

const port = process.env.EXPRESS_PORT ? Number(process.env.EXPRESS_PORT) : 3000
app.listen(port, () => console.log(`Servidor online: ${port}`))
export default app
```

PORQUE:
- `express.json()` transforma o body JSON em `req.body`.
- `cors()` facilita desenvolvimento (frontend separado). No Electron, pode ser opcional.


5) Validação de formulário no backend

Você tem duas opções populares:
- `express-validator` — middleware baseado em validações declarativas.
- `Joi` (ou `zod`) — validação com schemas (mais poderosa/expressiva).

Vou mostrar `express-validator` (fácil de integrar) e um exemplo com `Joi`.

A) express-validator (middleware)

- Instalação:
```bash
npm install express-validator
npm install -D @types/express-validator
```

- Como usar: no router você adiciona validações antes do handler e um middleware que checa erros:

```ts
// src/main/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }
  next()
}
```

```ts
// src/main/routes/auth.ts (router)
import { body } from 'express-validator'
import { handleValidationErrors } from '../middlewares/validate'

route.post('/api/login',
  body('usuario').isString().notEmpty(),
  body('senha').isString().notEmpty(),
  handleValidationErrors,
  async (req, res) => {
    // aqui chega apenas se validação passou
    const { usuario, senha } = req.body
    const result = await authService.login(usuario, senha)
    if (result.success) return res.json(result)
    return res.status(401).json(result)
  }
)
```

PORQUE:
- Mantém validação declarativa e próxima ao contrato HTTP (quem chama sabe o que deve enviar).
- `handleValidationErrors` transforma os erros num JSON claro para o frontend.


B) Joi (validação via schema)

- Instalação:
```bash
npm install joi
npm i -D @types/joi
```

- Uso sugerido: em middleware ou no controller

```ts
import Joi from 'joi'

const loginSchema = Joi.object({
  usuario: Joi.string().required(),
  senha: Joi.string().required()
})

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).json({ success:false, message: error.message })
    next()
  }
}

route.post('/api/login', validateSchema(loginSchema), async (req,res)=>{ ... })
```

PORQUE:
- Joi oferece validações mais expressivas (regex, strings, números, customização de mensagens) e composição de schemas.


6) Exemplo completo: rota de login com validação e resposta padronizada

Arquivos envolvidos (sugestão):
- `src/main/routes/auth.ts` — define a rota e validação
- `src/main/services/authService.ts` — lógica de login (já existe algo parecido no `auth.ts` atual)
- `src/main/middlewares/validate.ts` — handler de erros de validação

Exemplo de rota (usando express-validator):

```ts
// src/main/routes/auth.ts
import express from 'express'
import { body } from 'express-validator'
import { handleValidationErrors } from '../middlewares/validate'
import authService from '../services/authService'

const route = express.Router()

route.post('/api/login',
  body('usuario').isString().notEmpty().withMessage('usuario é obrigatório'),
  body('senha').isString().notEmpty().withMessage('senha é obrigatória'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { usuario, senha } = req.body
      const result = await authService.login(usuario, senha)
      if (result.success) return res.json(result)
      return res.status(401).json(result)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ success: false, message: 'Erro interno' })
    }
  }
)

export default route
```

No `authService.login` (exemplo resumido):

```ts
// src/main/services/authService.ts
import db from '../db/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function login(usuario: string, senha: string) {
  const user = await db('users').where({ login: usuario }).first()
  if (!user) return { success:false, message: 'Usuário inválido' }
  const ok = await bcrypt.compare(senha, user.password_hash)
  if (!ok) return { success:false, message: 'Senha inválida' }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn:'8h'})
  return { success:true, token }
}
```

Resposta padronizada para o frontend:
```json
{ "success": true, "token": "..." }
```
ou
```json
{ "success": false, "message": "Usuário ou senha inválidos" }
```


7) Boas práticas

- Trate erros e logue o stack trace durante desenvolvimento: `console.error(err)` mas não exponha stacks em produção.
- Padronize JSON de resposta (success/message/data/errors) para facilitar o frontend.
- Limite tentativas de login (rate limiting). Ex.: `express-rate-limit`.
- Use `helmet()` para headers de segurança.
- Valide sempre no backend, mesmo que já tenha validação no frontend.
- Proteja rotas sensíveis com middleware JWT:

```ts
import jwt from 'jsonwebtoken'
export function requireAuth(req,res,next){
  const auth = req.headers.authorization?.split(' ')[1]
  if(!auth) return res.status(401).json({ success:false, message:'Token requerido' })
  try{ req.user = jwt.verify(auth, process.env.JWT_SECRET!) ; next() } catch(e){ return res.status(401).json({success:false, message:'Token inválido'}) }
}
```


8) Checklist de integração com o frontend (preload/contextBridge)

- Sempre exponha funções limitadas: `submitLogin`, `getProfile`, `getLogs`, `getPage`.
- Não exponha o objeto `db` ou `process.env` para o renderer.
- Exemplo de consumo no renderer:
  ```ts
  const resp = await window.api.submitLogin(usuario, senha)
  if (resp.success) { /* salvar token no preload (memória) e navegar */ }
  ```


---

Se quiser, eu aplico automaticamente:
- um middleware de validação (`src/main/middlewares/validate.ts`)
- a versão da rota `auth.ts` usando `express-validator`
- um arquivo `src/main/services/authService.ts` extraindo a lógica do `routes/auth.ts` atual

Qual desses quer que eu gere primeiro? Ou prefere que eu apenas entregue os exemplos e você aplica manualmente?