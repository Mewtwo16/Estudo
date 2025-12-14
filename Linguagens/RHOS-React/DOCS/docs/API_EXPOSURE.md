# Como escrever rotas de API e expô-las para o frontend (passo a passo)

Este documento mostra, com exemplos práticos do seu projeto Electron + React + Express + Knex, como definir rotas no backend, montar o servidor, expor chamadas seguras ao renderer e consumir essas chamadas no frontend React. Também explica o PORQUÊ de cada escolha.

---

SUMÁRIO
- 1) Princípios e objetivos
- 2) Definir rotas no servidor (Express)
- 3) Montar o router no servidor principal
- 4) Expor APIs para o renderer: por que usar preload/contextBridge
- 5) Implementação no `preload` (exemplo: `submitLogin`)
- 6) Tipagem (d.ts) e segurança
- 7) Como consumir do React (via `window.api` e alternativa com fetch)
- 8) Boas práticas de error handling, tokens e CORS
- 9) Passos para testar localmente

---

1) Princípios e objetivos

- Separar responsabilidades: o backend (Express) fornece endpoints HTTP que devolvem JSON; o frontend (React) consome esses endpoints.
- Segurança: não exponha a API Node/FS diretamente ao renderer. Em Electron, a prática recomendada é usar `preload` + `contextBridge` para expor apenas funções seguras (ex.: `submitLogin`).
- Testabilidade: endpoints simples, previsíveis, com respostas JSON padrão ({ success: boolean, message?: string, data?: any }).
- Consistência: padronizar caminhos (ex.: /api/login, /api/users, /api/logs) e usar métodos HTTP corretos (POST para autenticação, GET para leitura, POST/PUT/DELETE para mutações).

2) Definir rotas no servidor (Express)

- Crie um router por domínio (auth, users, logs, roles). Exemplo (arquivo `src/main/router.ts` ou `src/main/routes/auth.ts`):

```ts
// src/main/router.ts (exemplo simplificado)
import express from 'express'
import authService from './routes/auth'

const route = express.Router()

route.post('/api/login', async (req, res) => {
  const { usuario, senha } = req.body
  const result = await authService.login(usuario, senha)
  if (result.success) return res.json(result)
  return res.status(401).json(result)
})

export default route
```

PORQUE:
- `/api/...` deixa claro que é API (não rota de página)
- Router modular facilita manutenção e testes unitários

3) Montar o router no servidor principal

- No `server.ts`, importe e use o router. Garanta que o Express parseie JSON e que o router seja usado antes de quaisquer handlers finais:

```ts
// src/main/server.ts
import express from 'express'
import cors from 'cors'
import router from './router'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()) // opcional em Electron, mas OK
app.use(router)

app.listen(port, () => console.log('Servidor online'))
```

PORQUE:
- `express.json()` permite `req.body` ao receber JSON (login form)
- `app.use(router)` monta todas as rotas definidas
- `cors()` é útil durante desenvolvimento se você testar frontend separado

4) Expor APIs para o renderer: por que usar preload/contextBridge

- Renderer (React) roda em contexto isolado por segurança (contextIsolation true). Se você ativar nodeIntegration no renderer, abre superfície de ataque. O ideal:
  - `preload` roda com acesso ao Node e electron APIs.
  - `preload` define um conjunto de funções pequenas e seguras (API fina) e as expõe via `contextBridge.exposeInMainWorld('api', api)`.
  - O renderer chama `window.api.submitLogin(...)` e não tem acesso direto a `require`, `fs`, etc.

PORQUE:
- Minimiza exposição do Node ao código do UI (mais seguro)
- Facilita validação centralizada e logs no processo main/preload

5) Implementação no `preload` (exemplo: `submitLogin`)

- Exemplo que já implementamos no seu projeto (arquivo `src/preload/index.ts`):

```ts
const API_BASE = `http://localhost:${process.env.EXPRESS_PORT || 3000}`
const api = {
  async submitLogin(usuario: string, senha: string) {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST', headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ usuario, senha })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { success: false, message: data?.message || `HTTP ${res.status}` }
    return data
  }
}

contextBridge.exposeInMainWorld('api', api)
```

PORQUE:
- Preload executa fetch para o backend local. Assim o renderer não precisa conhecer a URL nem a porta (você pode trocar a base no preload)
- O preload pode centralizar headers (Authorization), tratamento de erros e rate-limiting

6) Tipagem e declarations (d.ts) — explicação completa para quem vem do JavaScript

Se você conhece JavaScript, TypeScript pode parecer apenas "JavaScript com tipos" — e é isso mesmo, mas com algumas diferenças práticas que ajudam a evitar bugs. Aqui explico o essencial e mostro exemplos aplicáveis ao renderer do seu projeto.

- Por que usar tipos no renderer?
  - Documentam a API: quem usar `window.api.submitLogin` já sabe o que passa e o que volta.
  - Pegam erros cedo: o TypeScript aponta chamadas com parâmetros errados antes de rodar a app.
  - Melhor experiência no editor: autocompletes e jump-to-definition.

- Conceitos básicos (rápido)
  - Interface: define a forma de um objeto (ex.: LoginResponse).
  - Type assertion (`as`): diz ao TypeScript "confia em mim, isso é desse tipo". Use com cuidado.
  - Declaration file (`.d.ts`): forma de dizer ao compilador que existem símbolos globais (ex.: `window.api`).

- Exemplo prático: definir tipos para a API exposta no preload

  1) Defina um tipo para a resposta do login (arquivo sugerido: `src/main/types.ts` ou dentro do doc):

  ```ts
  // types.ts
  export interface LoginResponse {
    success: boolean
    token?: string
    message?: string
  }
  ```

  2) No preload, exponha a função e no d.ts declare o tipo no global Window:

  ```ts
  // src/preload/index.d.ts
  import { LoginResponse } from '../main/types'

  declare global {
    interface Window {
      api: {
        submitLogin(usuario: string, senha: string): Promise<LoginResponse>
        // outras funções: getProfile(), getLogs(), etc.
      }
    }
  }
  export {}
  ```

  3) No renderer, se quiser tipar a chamada diretamente:

  ```ts
  const resp: LoginResponse = await window.api.submitLogin(usuario, senha)
  ```

- Dicas práticas de TypeScript (fáceis para quem já conhece JS)
  - Evite `any` — ele desliga a checagem de tipos. Se precisar, prefira `unknown` e valide em runtime.
  - Quando consumir JSON de `fetch`, declare interfaces e use `as` apenas quando tiver certeza:

    ```ts
    const raw = await res.json()
    const data = raw as LoginResponse // OK se você confia na API
    ```

  - Para `useState` no React com TypeScript:

    ```tsx
    const [erro, setErro] = useState<string>('')
    const [user, setUser] = useState<{ id:number; login:string } | null>(null)
    ```

  - Para event handlers:

    ```tsx
    function onSubmit(e: React.FormEvent) {
      e.preventDefault()
      // ...
    }
    ```

- Common pitfalls e como resolver
  - "Property 'api' does not exist on type Window": resolva declarando a interface no `.d.ts` do renderer (ex.: `src/renderer/src/env.d.ts`).
  - Módulos externos sem type: instale `@types/xxx` quando disponível (`npm i -D @types/express @types/bcrypt ...`).
  - `process.env` em runtime: valores são strings ou undefined; sempre valide antes de usar (ex.: `if (!process.env.JWT_SECRET) throw new Error('...')`).

7) Como consumir do React — versão completa e vários padrões

Vou mostrar 3 caminhos: (A) usar o preload (recomendado), (B) fetch direto no React (rápido/prototipagem) e (C) reusar scripts JS legados dentro de componentes React.

A) Usando o preload (recomendado)

- Por que é recomendado
  - Segurança: o renderer não precisa ter acesso direto a Node/Fetch/FS; o preload centraliza chamadas e pode anexar headers (Authorization) automaticamente.
  - Conveniência: troca da base API em um lugar só (preload) se a porta mudar.

- Exemplo passo-a-passo (frontend)

  1) No preload implementamos `submitLogin(usuario, senha)` que retorna um objeto do tipo `LoginResponse`.
  2) No React, crie um formulário controlado (ex.: `Login.tsx`) e chame a função:

  ```tsx
  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'

  export function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState<string | null>(null)
    const navigate = useNavigate()

    async function onSubmit(e: React.FormEvent) {
      e.preventDefault()
      setErro(null)
      const resp = await window.api.submitLogin(usuario, senha)
      if (!resp.success) return setErro(resp.message || 'Erro')
      // opcional: guardar token no preload ou memória
      navigate('/menu')
    }

    return (
      <form onSubmit={onSubmit}>
        <input value={usuario} onChange={e => setUsuario(e.target.value)} />
        <input value={senha} type="password" onChange={e => setSenha(e.target.value)} />
        <button type="submit">Login</button>
        {erro && <div className="error">{erro}</div>}
      </form>
    )
  }
  ```

  3) Tipos: você pode declarar `LoginResponse` e anotar `const resp: LoginResponse = await window.api.submitLogin(...)` para documentação/segurança.

B) Fetch direto no React (quando usar)

- Quando usar
  - Prototipagem rápida ou apps não-Electron (web). Em Electron recomenda-se preload.

- Exemplo

```ts
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
async function submitLogin(usuario: string, senha: string) {
  const res = await fetch(`${API_BASE}/api/login`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ usuario, senha }) })
  const data = await res.json()
  return data as LoginResponse
}
```

C) Reaproveitar scripts JS legados dentro de React (migração gradual)

- Estratégia
  - Se um script antigo depende de elementos DOM e adiciona listeners, carregue-o dinamicamente dentro de um `useEffect` e faça cleanup no retorno do `useEffect`.
  - Melhor ainda: refatore o script para exportar `init()` e `destroy()` e importe-o como módulo.

- Exemplo (carregar script legado):

```tsx
import { useEffect } from 'react'

export function MenuWrapper() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = new URL('../components/js/menu.js', import.meta.url).href
    script.defer = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])
  return <div id="app-root">...</div>
}
```

Comentário: esta técnica funciona mas é frágil (ordem de carregamento, dependências globais). A longo prazo converta para componentes React.

---

Depois dessas explicações e exemplos, as próximas seções (8, 9) continuam com boas práticas e o checklist de testes.

8) Boas práticas: erros, tokens, CORS

- Tokens:
  - Evite salvar tokens em `localStorage` se possível; prefira memória (state) ou secure storage. Se precisar persistir, use um storage criptografado.
- Error handling:
  - API sempre retorna JSON com { success, message }. Responda 401 para credenciais inválidas, 400 para input inválido, 500 para erro interno.
- CORS:
  - Em Electron, normalmente não é necessário. Mas durante desenvolvimento (frontend separado) `cors()` facilita testes.
- Input validation:
  - Valide `usuario` e `senha` no servidor antes de consultar o DB (e limite tentativas de login).

9) Passos para testar localmente (quick checklist)

1. Garantir que `.env` com DB_* e `JWT_SECRET` existam e estejam corretos (veja `src/main/db/db.ts` para o caminho do dotenv).
2. Iniciar o app: `npm start`.
3. Abrir DevTools do renderer (menu da janela app) e checar console por erros.
4. Tentar login com o usuário seed: `admin` / `admin123`.
5. Se o login falhar, verificar console do processo main (logs do Express) e o retorno de `/api/login`.

---

Exemplos práticos adicionais

- Expor rota que precisa de token:

```ts
// router.ts
route.get('/api/profile', async (req, res) => {
  const auth = req.headers.authorization?.split(' ')[1]
  if (!auth) return res.status(401).json({ success: false, message: 'No token' })
  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET!)
    // buscar dados do usuário, etc.
    res.json({ success: true, data: { /* ... */ }})
  } catch(e) {
    res.status(401).json({ success:false, message: 'Token inválido' })
  }
})
```

- adicionar Authorization no preload (após login):

```ts
let token: string | null = null
const api = {
  async submitLogin(...) { /* ... set token = data.token ... */ },
  async getProfile() {
    const res = await fetch(`${API_BASE}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  }
}
```

PORQUE:
- Expor somente funções (não objetos globais com Node) é mais seguro; manter token em preload evita que o renderer leia diretamente o segredo.

---

Conclusão / recomendações finais
- Use `preload` + `contextBridge` para expor apenas as funções que o renderer precisa.
- Padronize caminhos de API como `/api/...` e mantenha as rotas simples e modulares.
- Centralize a base da API (`API_BASE`) no preload para trocar facilmente a porta/host.
- Proteja o token: guarde em memória no preload ou num storage seguro.

Se quiser, eu posso:
- 1) Gerar um `src/docs/EXEMPLO_API.md` (ou o arquivo criado) com estes passos (já criado aqui). 
- 2) Aplicar melhorias automáticas (por exemplo, mover `API_BASE` para uma constante exportada, adicionar armazenamento de token no preload, ou adicionar `getProfile`), se autorizar.


---

Arquivo criado: `docs/API_EXPOSURE.md` — revise e me diga se quer que eu aplique automaticamente algum trecho no código (por exemplo, persistir token no preload ou adicionar rota `/api/profile`).
