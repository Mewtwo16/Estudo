# CSRF e Helmet no RHOS (Electron + Express)

Este documento explica o que são CSRF e Helmet, como eles se aplicam a um app Electron com backend Express embutido e quando (e como) adotá-los no projeto.

## Visão geral

- Helmet: conjunto de middlewares que definem cabeçalhos HTTP de segurança (CSP, HSTS, X-Frame-Options, etc.), reduzindo superfícies de ataque no navegador.
- CSRF: proteção contra falsificação de requisições entre sites. Bloqueia cenários onde um site malicioso induz o navegador de um usuário autenticado a enviar ações indesejadas a outro domínio.

No RHOS:
- O frontend roda em Electron (renderer), não em um navegador aberto em sites de terceiros.
- O backend Express roda localmente (porta configurada por `EXPRESS_PORT`).
- A autenticação é por JWT Bearer em headers (Authorization), não por cookies implícitos. Isso reduz a exposição a CSRF, pois o token não é enviado automaticamente pelo navegador.

Conclusão inicial:
- Helmet é recomendado.
- CSRF pode ser opcional, dependendo de como o token é armazenado e enviado.

## Helmet: por que e como usar

Helmet configura cabeçalhos como:
- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- X-Frame-Options / frame-ancestors
- Referrer-Policy
- Cross-Origin-Resource-Policy / Cross-Origin-Opener-Policy

Benefícios:
- Reduz XSS, clickjacking e carregamento de recursos inseguros.

No Electron, alguns ajustes de CSP são necessários para não bloquear o renderer. Sugestão:

```ts
import helmet from 'helmet'

app.use(
  helmet({
    // Ajuste a CSP conforme a necessidade do renderer
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        // Permitir o próprio origin e o esquema blob: usado em Electron quando necessário
        "default-src": ["'self'"],
        "img-src": ["'self'", 'data:', 'blob:'],
        "script-src": ["'self'", "'unsafe-inline'"], // remova 'unsafe-inline' se usar nonce/hash
        "style-src": ["'self'", "'unsafe-inline'"],
        "connect-src": ["'self'", `http://localhost:${process.env.EXPRESS_PORT || 3000}`]
      }
    },
    referrerPolicy: { policy: 'no-referrer' },
    frameguard: { action: 'deny' }
  })
)
```

Notas importantes:
- Em produção, prefira `script-src` com nonce/hash e sem `unsafe-inline`.
- Ajuste `connect-src` se o backend usar outra porta/host.
- Electron tem seu próprio modelo de segurança (desabilitar `nodeIntegration`, `enableRemoteModule: false`, usar `contextIsolation: true`, etc.). O Helmet atua nas respostas HTTP do Express, não no BrowserWindow.

## CSRF: quando faz sentido

CSRF explora o envio automático de credenciais (cookies) pelo navegador. Em RHOS:
- O token JWT é enviado no header Authorization manualmente pelo cliente (fetch com Bearer).
- Não há cookies de sessão sendo enviados automaticamente.

Nessa arquitetura, o risco clássico de CSRF é baixo, pois um site externo não consegue forçar o envio do header Authorization com o Bearer do usuário. No entanto, cenários a considerar:
- Se você migrar para cookies `HttpOnly` com sessão ou refresh token, adote CSRF (double submit cookie ou SameSite + token CSRF).
- Se expuser o backend a rede externa (não apenas localhost no contexto do app), avalie CSRF e CORS cuidadosamente.

### Se optar por CSRF mesmo com Bearer

Você pode usar `csurf` com armazenamento de token no estado do app e envio em header custom:

```ts
import csurf from 'csurf'

const csrfProtection = csurf({ cookie: false }) // sem cookie; token por header

// Rota para obter o token CSRF
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

// Proteger rotas de escrita
app.post('/api/user', csrfProtection, requirePermissions('users:create'), addUserRoute)
```

No cliente, anexe o token CSRF em um header, ex.: `X-CSRF-Token`.

Prós:
- Camada extra contra requisições forjadas, útil se o backend for exposto.
Contras:
- Complexidade adicional sem ganho claro quando o backend é local e o auth é por Bearer.

## Recomendações para o RHOS

1) Habilitar Helmet no Express com CSP adequado ao Electron.
2) Manter autenticação por Bearer no header (sem cookies), reduzindo o vetor CSRF.
3) Se no futuro usar cookies de sessão/refresh ou expor o backend publicamente, adotar CSRF e configurar CORS.
4) Endurecer a janela do Electron (fora do escopo do Helmet):
   - `contextIsolation: true`
   - `nodeIntegration: false`
   - `enableRemoteModule: false`
   - validar/limitar `webPreferences`.

## Passos de implementação

- Instalar o Helmet e adicionar no `server.ts`:

```ts
import helmet from 'helmet'

app.use(helmet({
  contentSecurityPolicy: { /* ...diretivas como acima... */ },
  referrerPolicy: { policy: 'no-referrer' },
  frameguard: { action: 'deny' }
}))
```

- (Opcional) Incluir `csurf` se o backend vier a usar cookies ou for exposto:

```ts
import csurf from 'csurf'
const csrfProtection = csurf({ cookie: true })
// configurar cookie parser, SameSite, etc.
```

## Perguntas frequentes

- Preciso de CSRF hoje? Provavelmente não, já que o app é Electron + Bearer.
- Helmet vai quebrar o renderer? Com CSP mal configurado, pode. Ajuste `script-src` e `style-src` conforme seu bundler; em produção, use nonce.
- E CORS? Se o backend só atende o app local, mantenha fechado. Ao expor, configure CORS restrito.
