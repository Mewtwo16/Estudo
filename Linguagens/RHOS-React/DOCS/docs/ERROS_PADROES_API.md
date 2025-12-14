# Padrões de Erros da API

Documento único para padronizar respostas de erro entre backend (Express/Knex) e frontend (Electron/React, via preload). Use estes formatos em todas as rotas e também no preload.

---

## 1) Envelope de resposta

- Sucesso (200/201):
```json
{
  "success": true,
  "data": {},
  "message": "opcional"
}
```

- Erro (qualquer 4xx/5xx):
```json
{
  "success": false,
  "code": "string-curta-estável",
  "message": "mensagem humana (pt-BR)",
  "errors": [
    { "field": "campo", "message": "explicação", "code": "opcional" }
  ],
  "details": { "qualquer": "info adicional opcional" }
}
```

Regras:
- `code` é obrigatório em erros, curto e estável (inglês recomendado). Ex.: `validation_error`, `unauthorized`, `conflict`.
- `message` é obrigatória em erros (texto amigável, pt-BR). Não vaze stack/SQL.
- `errors[]` é para erros de campo (validação). Omitir se não houver.
- `details` é opcional (debug não sensível). Nunca exponha stack trace em produção.

---

## 2) Mapeamento de HTTP status → code

- 400 Bad Request → `bad_request` (payload inválido, JSON malformado)
- 401 Unauthorized → `unauthorized` (sem token/credenciais inválidas)
- 403 Forbidden → `forbidden` (sem permissão)
- 404 Not Found → `not_found` (recurso não existe)
- 409 Conflict → `conflict` (duplicidade/estado conflitante)
- 422 Unprocessable Entity → `validation_error` (erros de campo)
- 429 Too Many Requests → `rate_limited`
- 500 Internal Server Error → `internal_error`
- 503 Service Unavailable → `service_unavailable`
- 405 Method Not Allowed → `method_not_allowed`
- 415 Unsupported Media Type → `unsupported_media_type`

Dica:
- Preferir 422 para validação de campos (schema); 400 para erros de formato/payload geral.

---

## 3) Padrões por cenário (com exemplos)

1) Validação de campos (422)
```json
{
  "success": false,
  "code": "validation_error",
  "message": "Há erros de validação.",
  "errors": [
    { "field": "email", "message": "Email inválido." },
    { "field": "cpf", "message": "CPF inválido." }
  ]
}
```

2) Não autorizado (401)
```json
{
  "success": false,
  "code": "unauthorized",
  "message": "Credenciais inválidas."
}
```

3) Proibido (403)
```json
{
  "success": false,
  "code": "forbidden",
  "message": "Você não tem permissão para executar esta ação."
}
```

4) Não encontrado (404)
```json
{
  "success": false,
  "code": "not_found",
  "message": "Usuário não encontrado."
}
```

5) Conflito (409) — duplicidade no banco
```json
{
  "success": false,
  "code": "conflict",
  "message": "Já existe um usuário com este email.",
  "errors": [{ "field": "email", "message": "Duplicado." }]
}
```

6) Payload inválido (400)
```json
{
  "success": false,
  "code": "bad_request",
  "message": "JSON inválido ou campos ausentes."
}
```

7) Limite de requisições (429)
```json
{
  "success": false,
  "code": "rate_limited",
  "message": "Muitas tentativas. Tente novamente mais tarde."
}
```

8) Erro interno (500)
```json
{
  "success": false,
  "code": "internal_error",
  "message": "Ocorreu um erro inesperado."
}
```

---

## 4) Integração com Joi (validação de schema)

Transforme `error.details` do Joi em `errors[]` padronizado e devolva 422.

Exemplo (Express):
```ts
import { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'

export function validateBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const errors = error.details.map(d => ({
        field: d.path.join('.'),
        message: d.message.replace(/"/g, ''),
      }))
      return res.status(422).json({
        success: false,
        code: 'validation_error',
        message: 'Há erros de validação.',
        errors
      })
    }
    req.body = value
    next()
  }
}
```

Notas:
- `field`: junte `path` do Joi (ex.: `address.street`).
- `message`: personalize no schema com `.messages({ ... })` para mais clareza.

---

## 5) Integração com Banco (erros comuns)

- Duplicidade (UNIQUE): 409 `conflict`, com `errors[]` apontando campo.
- Referência (FK) violada: 409 `conflict` (ou 400), `code`: `constraint_violation`.
- Recurso inexistente para update/delete: 404 `not_found`.

Exemplo (MySQL + Knex):
```ts
try {
  await trx('users').insert({ email })
} catch (e: any) {
  // MySQL duplicate key
  if (e && e.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      code: 'conflict',
      message: 'Já existe um usuário com este email.',
      errors: [{ field: 'email', message: 'Duplicado.' }]
    })
  }
  // Fallback
  return res.status(500).json({ success: false, code: 'internal_error', message: 'Ocorreu um erro inesperado.' })
}
```

---

## 6) Padrão no preload (Electron)

Padronize o retorno quando `res.ok === false`:
```ts
async function postJson(path: string, body: unknown) {
  const res = await fetch(`${API_BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    // Garante formato padrão, mesmo se o backend não mandou 100% correto
    return {
      success: false,
      code: data?.code || (res.status === 401 ? 'unauthorized' : res.status === 404 ? 'not_found' : 'internal_error'),
      message: data?.message || `HTTP ${res.status}`,
      errors: data?.errors || undefined,
      details: data?.details || undefined
    }
  }
  return data
}
```

Benefício: o renderer trata um único formato de erro independentemente da rota.

---

## 7) Boas práticas de segurança e UX

- Nunca envie stack trace, SQL ou mensagens do driver ao cliente.
- Logue detalhes no servidor (com `requestId`/`traceId`) e retorne apenas `code` + `message`.
- Mensagens em pt-BR; `code` em inglês e estável para i18n.
- Para formulários, sempre preferir `validation_error` (422) com `errors[]` por campo.
- Para autenticação, usar `401 unauthorized` sem indicar qual campo errou (segurança).
- Normalize entradas (ex.: CPF só dígitos) antes de validar/regras.

---

## 8) Lista de códigos recomendados

- `bad_request` (400)
- `validation_error` (422)
- `unauthorized` (401)
- `forbidden` (403)
- `not_found` (404)
- `conflict` (409)
- `rate_limited` (429)
- `method_not_allowed` (405)
- `unsupported_media_type` (415)
- `internal_error` (500)
- `service_unavailable` (503)

Mantenha esta lista curta e reutilizável. Se precisar de algo específico (ex.: `password_policy_violation`), documente aqui.

---

## 9) Exemplo rápido de helper para erros (Express)

```ts
function sendError(res: import('express').Response, status: number, code: string, message: string, extra?: any) {
  return res.status(status).json({ success: false, code, message, ...(extra || {}) })
}

// usar:
// return sendError(res, 422, 'validation_error', 'Há erros de validação.', { errors })
// return sendError(res, 401, 'unauthorized', 'Credenciais inválidas.')
// return sendError(res, 500, 'internal_error', 'Ocorreu um erro inesperado.')
```

---

Com este padrão, backend e frontend falam a mesma língua: um único envelope, `code` estável, `message` amigável e `errors[]` para formulários. Atualize as rotas aos poucos para seguir este guia.
