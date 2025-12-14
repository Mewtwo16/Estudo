# Guia prático: criando formulários no React, enviando para a API e tratando erros do backend

Este guia mostra, passo a passo, como construir formulários no React (com TypeScript), enviar os dados para sua API (via preload ou fetch direto) e tratar os erros retornados pelo backend (validação e erros de negócio). Exemplos foram adaptados ao seu projeto Electron + React + Express + Knex.

Sumário
- 1) Padrões de formulário no React (controlado vs bibliotecas)
- 2) Tipos TypeScript para dados e respostas
- 3) Enviando para a API (via preload recomendado)
- 4) Tratamento de erros do backend (400, 401, 422, 500)
- 5) Exemplo completo: formulário de Login
- 6) Exemplo com validação de vários campos (cadastro de usuário)
- 7) Boas práticas

---

## 1) Padrões de formulário no React

Existem duas abordagens comuns:

- Formulário controlado (nativo): você gerencia `value` e `onChange` de cada input com `useState`. É simples e combina com o que você já vem fazendo.
- Bibliotecas (React Hook Form, Formik, Zod/Joi): oferecem validação declarativa, performance e melhor ergonomia em formulários grandes. Você pode adotar depois.

Para começar (e ficar próximo do seu código atual), use controlado + validação leve no cliente.

---

## 2) Tipos TypeScript para dados e respostas

Defina tipos para clarear contrato entre frontend e backend.

```ts
// src/renderer/src/types/forms.ts
export interface LoginForm {
  usuario: string
  senha: string
}

export interface ApiErrorField {
  param: string // nome do campo (ex.: 'usuario')
  msg: string   // mensagem de erro para o campo
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  errors?: ApiErrorField[] // para erros de validação (422/400)
}
```

Se preferir, tipar respostas específicas (ex.: LoginResponse) ajuda no autocompletar.

---

## 3) Enviando para a API (via preload recomendado)

No seu projeto, expor funções no `preload` (window.api) é o caminho mais seguro em Electron.

Exemplo de uma função utilitária no preload (já similar ao que você tem):

```ts
// src/preload/index.ts (trecho)
const API_BASE = `http://localhost:${process.env.EXPRESS_PORT || 3000}`

async function postJson<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json().catch(() => ({}))
  return data as ApiResponse<T>
}

const api = {
  submitLogin(usuario: string, senha: string) {
    return postJson<{ token: string }>('/api/login', { usuario, senha })
  },
  // outros endpoints: createUser, updateUser, etc.
}
```

No renderer, você chama `window.api.submitLogin(...)` e recebe `ApiResponse` tipada.

Alternativa (fetch direto): use `import.meta.env.VITE_API_BASE_URL` e o mesmo helper `postJson`, mas prefira o preload em Electron.

---

## 4) Tratamento de erros do backend

Padronize respostas no backend para simplificar o front:

- Sucesso (200): `{ success: true, data?: any, message?: string }`
- Erro de validação (400/422): `{ success: false, errors: [{ param, msg }, ...] }`
- Não autorizado (401): `{ success: false, message: '...' }`
- Erro interno (500): `{ success: false, message: '...' }`

No Express (exemplo com express-validator):

```ts
// Se inválido:
return res.status(400).json({ success: false, errors: errors.array() })
// Se credenciais incorretas:
return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos' })
```

No React, trate assim:

```ts
if (!resp.success) {
  if (resp.errors?.length) {
    // erros de campo (exibir próximo aos inputs)
  } else {
    // erro geral (toast/alerta)
  }
}
```

Dica: exiba erros de campo próximos ao input correspondente (por `param`).

---

## 5) Exemplo completo: formulário de Login

```tsx
// src/renderer/src/components/Login.tsx
import { useState } from 'react'
import type { LoginForm, ApiResponse } from '../types/forms'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [form, setForm] = useState<LoginForm>({ usuario: '', senha: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function update<K extends keyof LoginForm>(key: K, value: LoginForm[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.usuario || !form.senha) {
      setError('Preencha usuário e senha.')
      return
    }
    setLoading(true)
    const resp = await window.api.submitLogin(form.usuario, form.senha)
    setLoading(false)
    if (!resp.success) return setError(resp.message || 'Falha no login')
    navigate('/menu')
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <input
        value={form.usuario}
        onChange={(e) => update('usuario', e.target.value)}
        placeholder="Usuário"
      />
      <input
        type="password"
        value={form.senha}
        onChange={(e) => update('senha', e.target.value)}
        placeholder="Senha"
      />
      <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Login'}</button>
      {error && <p className="erro">{error}</p>}
    </form>
  )
}
```

Notas:
- `noValidate` desabilita validação nativa do navegador (opcional).
- Validação leve no cliente melhora UX, mas a verificação final é sempre no backend.

---

## 6) Exemplo com validação de vários campos (cadastro de usuário)

Backend (Express + express-validator):

```ts
// src/main/routes/user.ts (exemplo)
import { body } from 'express-validator'
import { handleValidationErrors } from '../middlewares/validate'

route.post('/api/users',
  body('full_name').isString().trim().isLength({ min: 3 }),
  body('email').isEmail(),
  body('login').isString().trim().isLength({ min: 3 }),
  body('password').isString().isLength({ min: 6 }),
  handleValidationErrors,
  async (req, res) => {
    // criar usuário com Knex
    // se duplicado, retornar 409 com message amigável
    return res.json({ success: true })
  }
)
```

Frontend (exibir erros por campo):

```tsx
interface FieldErrors { [key: string]: string }

const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

const resp = await window.api.createUser(form)
if (!resp.success) {
  if (resp.errors?.length) {
    const map: FieldErrors = {}
    for (const e of resp.errors) map[e.param] = e.msg
    setFieldErrors(map)
  } else {
    setError(resp.message || 'Erro ao criar usuário')
  }
  return
}
```

No JSX, perto de cada input:

```tsx
{fieldErrors.email && <span className="erro-campo">{fieldErrors.email}</span>}
```

---

## 7) Boas práticas

- Valide no backend sempre — mesmo que valide no cliente.
- Padronize respostas: `{ success, message?, errors? }` ajuda o front a tratar tudo por um caminho só.
- Use status code correto: 400/422 para validação, 401 para auth, 403 para permissão, 409 para conflito (duplicado), 500 para erro interno.
- Evite expor detalhes sensíveis nos erros (ex.: stack trace, nomes de colunas).
- Mantenha a UI responsiva: estados de `loading`, desabilitar botão durante submit, mensagens claras.
- Centralize helpers de API (no preload): postJson/getJson, cabeçalhos comuns, anexar `Authorization` quando houver token.

---

Dicas finais
- Comece simples com formulários controlados; quando os formulários crescerem, considere `react-hook-form` + `zod` (melhor performance e validação por schema).
- No backend, `express-validator` já te cobre bem — e o contrato `{ errors: [{param,msg}] }` conversa direto com o front.
- Se quiser, posso gerar um `middlewares/validate.ts` e esqueleto de `user.ts` com essas validações para você plugar agora.
