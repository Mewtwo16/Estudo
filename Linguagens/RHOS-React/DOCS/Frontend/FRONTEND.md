# 📱 Documentação do Frontend - RH-OS

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Sistema de Autenticação](#sistema-de-autenticação)
6. [Componentes](#componentes)
7. [Páginas](#páginas)
8. [Sistema de Rotas](#sistema-de-rotas)
9. [Estilização](#estilização)
10. [Utilitários](#utilitários)
11. [Integração Electron](#integração-electron)
12. [Fluxos de Usuário](#fluxos-de-usuário)
13. [Gerenciamento de Estado](#gerenciamento-de-estado)
14. [Segurança](#segurança)

---

## Visão Geral

O frontend do RH-OS é uma aplicação React construída com TypeScript, integrada ao Electron para funcionar como aplicação desktop. O sistema implementa um design moderno com card flutuante para login e interface completa para gerenciamento de recursos humanos.

### Características Principais
- ✅ Aplicação Desktop com Electron
- ✅ Interface React com TypeScript
- ✅ Autenticação JWT
- ✅ Sistema de Permissões Granular
- ✅ Design Responsivo
- ✅ Janelas Múltiplas (Login + Principal)
- ✅ Limpeza Automática de Sessões

---

## Arquitetura

### Padrão de Arquitetura
O frontend segue uma arquitetura **Component-Based** com separação clara de responsabilidades:

```
┌─────────────────────────────────────┐
│         Electron Main Process        │
│  (Gerencia janelas e IPC)           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       Preload Script (Bridge)        │
│  (Expõe APIs seguras ao Renderer)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Renderer Process (React)        │
│                                      │
│  ┌──────────────────────────────┐  │
│  │         App.tsx              │  │
│  │    (Rotas e Auth Check)      │  │
│  └────────┬─────────────────────┘  │
│           │                         │
│  ┌────────▼──────────┐             │
│  │  ProtectedRoute   │             │
│  │  (Guard de Auth)  │             │
│  └────────┬──────────┘             │
│           │                         │
│  ┌────────▼──────────────────────┐ │
│  │        Layout               │ │
│  │  ┌──────────┐  ┌──────────┐ │ │
│  │  │  Header  │  │   Main   │ │ │
│  │  └──────────┘  └────┬─────┘ │ │
│  │                     │        │ │
│  │     ┌───────────────▼──────┐ │ │
│  │     │   Páginas (Outlet)   │ │ │
│  │     │ Home, Users, Roles   │ │ │
│  │     └──────────────────────┘ │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Fluxo de Dados

```
User Action → Component → API Call (fetch) → Backend
                ↓
          State Update (useState)
                ↓
          Re-render UI
```

---

## Tecnologias Utilizadas

### Core
- **React 18.3.1**: Biblioteca para construção da UI
- **TypeScript 5.5.2**: Superset tipado do JavaScript
- **React Router DOM 6.26.2**: Gerenciamento de rotas
- **Vite 5.4.1**: Build tool e dev server

### Electron
- **Electron 32.0.1**: Framework para aplicações desktop
- **@electron-toolkit/utils**: Utilitários para Electron
- **electron-builder**: Empacotamento da aplicação

### Estilização
- **CSS Modules**: Estilização com escopo de componente
- **Custom Properties (CSS Variables)**: Sistema de design tokens
- **Boxicons**: Biblioteca de ícones

### Outras
- **jwt-decode**: Decodificação de tokens JWT (client-side)

---

## Estrutura de Pastas

```
src/renderer/
│
├── src/
│   ├── App.tsx                 # Componente raiz com rotas
│   ├── main.tsx                # Entry point do React
│   ├── env.d.ts                # Tipos TypeScript globais
│   │
│   ├── assets/                 # Recursos estáticos
│   │   ├── css/
│   │   │   ├── global.css      # Estilos globais e variáveis
│   │   │   ├── login.css       # Estilos da tela de login
│   │   │   ├── Menu.css        # Estilos do menu/header
│   │   │   ├── user.css        # Estilos da página de usuários
│   │   │   └── logs.css        # Estilos da página de logs
│   │   │
│   │   ├── fonts/              # Fontes customizadas
│   │   │   ├── Poppins/
│   │   │   ├── Press_Start_2P/
│   │   │   └── Roboto/
│   │   │
│   │   └── img/                # Imagens
│   │       └── logo.png
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Header.tsx          # Cabeçalho com menu
│   │   ├── Layout.tsx          # Layout principal (Header + Outlet)
│   │   └── ProtectedRoute.tsx  # Guard de rotas protegidas
│   │
│   ├── pages/                  # Páginas da aplicação
│   │   ├── Login.tsx           # Tela de login (card flutuante)
│   │   ├── Home.tsx            # Dashboard inicial
│   │   ├── Usuarios.tsx        # Gerenciamento de usuários
│   │   ├── Cargos.tsx          # Gerenciamento de cargos
│   │   └── Logs.tsx            # Visualização de logs
│   │
│   └── utils/                  # Utilitários
│       ├── auth.ts             # Funções de autenticação JWT
│       └── permissionTranslator.ts  # Tradutor de permissões
│
└── index.html                  # HTML base
```

---

## Sistema de Autenticação

### Fluxo de Autenticação

#### 1. Login
```typescript
// Login.tsx
const handleSubmit = async (e: FormEvent) => {
  // 1. Fazer requisição de login
  const response = await fetch('http://localhost:4040/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  })

  const data = await response.json()

  if (data.success && data.token) {
    // 2. Salvar token no localStorage
    localStorage.setItem('authToken', data.token)
    
    // 3. Notificar Electron para trocar janela
    window.api.notifyLoginSuccess()
    
    // 4. Navegar para home
    navigate('/home')
  }
}
```

#### 2. Estrutura do Token JWT
```json
{
  "id": 1,
  "user": "admin",
  "role": ["Administrador", "Gerente"],
  "perm": [
    "users:create",
    "users:read",
    "users:update",
    "users:delete",
    "roles:create",
    "roles:read",
    "roles:update",
    "roles:delete",
    "logs:read"
  ],
  "iat": 1699999999,
  "exp": 1700028799
}
```

#### 3. Verificação de Autenticação
```typescript
// ProtectedRoute.tsx
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('authToken')

  if (!token) {
    // Redireciona para login se não houver token
    return <Navigate to="/login" replace />
  }

  // Renderiza conteúdo protegido se token existir
  return <>{children}</>
}
```

#### 4. Validação de Permissões
```typescript
// utils/auth.ts
export function hasPermission(permission: string): boolean {
  const token = localStorage.getItem('authToken')
  if (!token) return false

  try {
    const decoded = jwt_decode<DecodedToken>(token)
    return decoded.perm?.includes(permission) || false
  } catch (error) {
    return false
  }
}
```

### Sistema de Permissões

#### Formato das Permissões
```
<entidade>:<ação>

Exemplos:
- users:create    → Criar usuários
- users:read      → Visualizar usuários
- users:update    → Editar usuários
- users:delete    → Deletar usuários
- roles:create    → Criar cargos
- roles:read      → Visualizar cargos
- logs:read       → Visualizar logs
```

#### Uso nas Páginas
```typescript
// Exemplo em Usuarios.tsx
import { hasPermission } from '../utils/auth'

// Verifica se tem permissão antes de renderizar
{hasPermission('users:view') ? (
  <div>
    {/* Conteúdo da página */}
  </div>
) : (
  <div>
    <h1>Acesso Negado</h1>
    <p>Você não tem permissão para visualizar esta página.</p>
  </div>
)}

// Esconde botão se não tiver permissão
{hasPermission('users:create') && (
  <button onClick={handleCreate}>Novo Usuário</button>
)}
```

---

## Componentes

### Header.tsx
**Propósito**: Cabeçalho principal da aplicação com logo, menu de navegação e botão de logout.

**Estrutura**:
```tsx
<header className="box-header">
  <nav className="box-menu-principal">
    {/* Logo */}
    <Link to="/" className="box-imagem">
      <img src={logoImg} alt="RH-OS" />
    </Link>

    {/* Menu de Navegação */}
    <ul className="menu">
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/usuarios">Usuários</Link></li>
      <li><Link to="/cargos">Cargos</Link></li>
      <li><Link to="/logs">Logs</Link></li>
    </ul>

    {/* Botão de Logout */}
    <button onClick={handleLogout}>Sair</button>
  </nav>
</header>
```

**Funcionalidades**:
- ✅ Navegação entre páginas
- ✅ Logout com limpeza de token
- ✅ Notificação IPC para fechar janela principal

**Fluxo de Logout**:
```typescript
const handleLogout = () => {
  // 1. Remove token
  localStorage.removeItem('authToken')
  
  // 2. Notifica Electron
  if (window.api && window.api.notifyLogout) {
    window.api.notifyLogout() // Fecha mainWindow, abre loginWindow
  } else {
    navigate('/login') // Fallback
  }
}
```

---

### Layout.tsx
**Propósito**: Estrutura básica da aplicação com cabeçalho e área de conteúdo.

**Estrutura**:
```tsx
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <Header />
  <main className="conteudo-principal">
    <Outlet />  {/* Renderiza páginas filhas */}
  </main>
</div>
```

**Características**:
- ✅ Flexbox para layout responsivo
- ✅ Altura 100vh para ocupar tela toda
- ✅ `<Outlet />` do React Router para páginas aninhadas

---

### ProtectedRoute.tsx
**Propósito**: Guard de rotas que verifica autenticação antes de renderizar conteúdo protegido.

**Lógica**:
```typescript
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('authToken')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
```

**Uso**:
```tsx
<Route
  path="/"
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
>
  <Route path="home" element={<Home />} />
  <Route path="usuarios" element={<Usuarios />} />
  {/* ... outras rotas protegidas */}
</Route>
```

---

## Páginas

### Login.tsx
**Propósito**: Tela de autenticação com card flutuante.

**Características Visuais**:
- Card de duas colunas (850x520px)
- Coluna esquerda: Informações (azul #2a626a)
- Coluna direita: Formulário (branco)
- Botão de fechar vermelho no canto superior direito
- Área arrastável no topo
- Janela transparente sem moldura

**Estrutura**:
```tsx
<div className="container">
  {/* Área de arrastar */}
  <div className="drag-area" />

  {/* Botão de fechar */}
  <button onClick={() => window.close()} className="close-button">✕</button>

  {/* Coluna da Esquerda */}
  <div className="coluna-info">
    <h1>RH-OS</h1>
    <p>Sistema de Gestão de Recursos Humanos</p>
    <img src={logo} alt="Logo" />
    <p>Gestão inteligente para sua empresa</p>
  </div>

  {/* Coluna da Direita */}
  <div className="formulario">
    <h2>Bem-vindo</h2>
    
    {error && <div className="error">{error}</div>}

    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <input type="text" placeholder="Usuário" />
        <i className="bx bxs-user"></i>
      </div>

      <div className="input-box">
        <input type="password" placeholder="Senha" />
        <i className="bx bxs-lock-alt"></i>
      </div>

      <button type="submit" className="login">
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  </div>
</div>
```

**Fluxo de Login**:
1. Usuário preenche credenciais
2. Submit do formulário
3. Requisição POST para `/api/login`
4. Se sucesso:
   - Salva token no localStorage
   - Notifica Electron (`notifyLoginSuccess`)
   - Electron fecha janela de login
   - Electron abre janela principal em `/home`
5. Se erro:
   - Mostra mensagem de erro
   - Limpa campos de senha

**Estados**:
- `usuario`: string
- `senha`: string
- `loading`: boolean
- `error`: string

---

### Home.tsx
**Propósito**: Dashboard principal do sistema.

**Conteúdo**:
```tsx
<div style={{ 
  height: '100%', 
  background: '#fafbfc', 
  padding: '40px' 
}}>
  <h1>Bem-vindo ao RH-OS</h1>
  <p>Sistema de Gestão de Recursos Humanos</p>

  <div style={{ marginTop: '40px' }}>
    <h2>Funcionalidades</h2>
    <ul>
      <li>Gerenciamento de Usuários</li>
      <li>Gerenciamento de Cargos e Permissões</li>
      <li>Auditoria de Logs do Sistema</li>
    </ul>
  </div>
</div>
```

**Melhorias Futuras**:
- Dashboard com estatísticas
- Gráficos de uso do sistema
- Notificações recentes
- Atalhos rápidos

---

### Usuarios.tsx
**Propósito**: CRUD completo de usuários com controle de permissões.

**Funcionalidades**:
1. **Listagem de Usuários**
   - Tabela com todos os usuários
   - Colunas: Nome, Login, Cargo(s), Status, Ações
   - Badge colorido para status (Ativo/Inativo)

2. **Criação de Usuário**
   - Modal com formulário
   - Campos: Nome, Login, Senha, Data Nascimento
   - Seleção de cargo(s) - múltipla escolha
   - Status (Ativo/Inativo)

3. **Edição de Usuário**
   - Mesmo formulário da criação
   - Campos pré-preenchidos
   - Senha opcional na edição

4. **Controle de Permissões**
   - Botão "Novo Usuário" visível apenas com `users:create`
   - Botão "Editar" visível apenas com `users:update`
   - Lista completa visível apenas com `users:view`

**Estrutura de Estado**:
```typescript
const [users, setUsers] = useState<User[]>([])
const [roles, setRoles] = useState<Role[]>([])
const [showModal, setShowModal] = useState(false)
const [editingUser, setEditingUser] = useState<User | null>(null)
const [formData, setFormData] = useState({
  name: '',
  login: '',
  password: '',
  birth_date: '',
  status: 1,
  roles: [] as number[]
})
```

**Fluxo de Criação**:
```
1. Click "Novo Usuário"
   ↓
2. Modal abre (showModal = true)
   ↓
3. Preenche formulário
   ↓
4. Submit
   ↓
5. POST /api/user
   ↓
6. Sucesso → Fecha modal, atualiza lista
   Erro → Mostra mensagem
```

**Código de Exemplo - Verificação de Permissão**:
```typescript
{hasPermission('users:view') ? (
  <div>
    {/* Lista de usuários */}
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Login</th>
          <th>Cargo(s)</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.login}</td>
            <td>
              {user.roles?.map(role => (
                <span className="badge">{role.name}</span>
              ))}
            </td>
            <td>
              <span className={`status ${user.status === 1 ? 'active' : 'inactive'}`}>
                {user.status === 1 ? 'Ativo' : 'Inativo'}
              </span>
            </td>
            <td>
              {hasPermission('users:update') && (
                <button onClick={() => handleEdit(user)}>Editar</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div>
    <h1>Acesso Negado</h1>
    <p>Você não tem permissão para visualizar usuários.</p>
  </div>
)}
```

---

### Cargos.tsx
**Propósito**: CRUD de cargos com seleção de permissões.

**Funcionalidades**:
1. **Listagem de Cargos**
   - Cards com nome do cargo
   - Lista de permissões traduzidas
   - Botão de editar

2. **Criação de Cargo**
   - Modal com formulário
   - Campo: Nome do cargo
   - Seleção de permissões agrupadas por categoria
   - Checkboxes para cada permissão

3. **Edição de Cargo**
   - Mesmo formulário da criação
   - Permissões pré-selecionadas

4. **Tradução de Permissões**
   - Usa `permissionTranslator.ts`
   - `users:create` → "Usuários: Criar"
   - `roles:update` → "Cargos: Atualizar"

**Estrutura de Estado**:
```typescript
const [roles, setRoles] = useState<Role[]>([])
const [permissions, setPermissions] = useState<Permission[]>([])
const [showModal, setShowModal] = useState(false)
const [editingRole, setEditingRole] = useState<Role | null>(null)
const [formData, setFormData] = useState({
  name: '',
  permissions: [] as number[]
})
```

**Agrupamento de Permissões**:
```typescript
const groupedPermissions = permissions.reduce((acc, perm) => {
  const [category] = perm.functionality.split(':')
  if (!acc[category]) acc[category] = []
  acc[category].push(perm)
  return acc
}, {} as Record<string, Permission[]>)

// Renderização
{Object.entries(groupedPermissions).map(([category, perms]) => (
  <div key={category} className="permission-group">
    <h4>{category.toUpperCase()}</h4>
    {perms.map(perm => (
      <label key={perm.id}>
        <input
          type="checkbox"
          checked={formData.permissions.includes(perm.id)}
          onChange={() => handlePermissionToggle(perm.id)}
        />
        {translatePermission(perm.functionality)}
      </label>
    ))}
  </div>
))}
```

**Controle de Permissões**:
- Botão "Novo Cargo" → `roles:create`
- Botão "Editar" → `roles:update`
- Visualização da lista → `roles:view`

---

### Logs.tsx
**Propósito**: Visualização de logs de auditoria do sistema.

**Características**:
- Não carrega automaticamente (performance)
- Botão "Atualizar" para buscar logs
- Tabela com logs ordenados por data
- Protegido por permissão `logs:read`

**Estrutura**:
```tsx
{hasPermission('logs:read') ? (
  <div>
    <div className="header">
      <h1>Logs do Sistema</h1>
      <button onClick={fetchLogs} disabled={loading}>
        {loading ? 'Carregando...' : 'Atualizar'}
      </button>
    </div>

    {error && <div className="error">{error}</div>}

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Quem</th>
          <th>Onde</th>
          <th>Quando</th>
          <th>O que</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log.id}>
            <td>{log.id}</td>
            <td>{log.who || `ID: ${log.user_id}`}</td>
            <td>{log.where}</td>
            <td>{new Date(log.when).toLocaleString('pt-BR')}</td>
            <td>{log.what}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div>
    <h1>Acesso Negado</h1>
    <p>Você não tem permissão para visualizar logs.</p>
  </div>
)}
```

**Estados**:
```typescript
const [logs, setLogs] = useState<Log[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
```

**Fluxo de Carregamento**:
```
1. Usuário clica "Atualizar"
   ↓
2. fetchLogs() é chamado
   ↓
3. loading = true
   ↓
4. GET /api/logs com Authorization header
   ↓
5. Sucesso → setLogs(data)
   Erro → setError(message)
   ↓
6. loading = false
```

---

## Sistema de Rotas

### Configuração (App.tsx)
```tsx
function App(): React.JSX.Element {
  const [initialRoute, setInitialRoute] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setInitialRoute(token ? '/home' : '/login')
  }, [])

  if (initialRoute === null) {
    return <div>Carregando...</div>
  }

  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="cargos" element={<Cargos />} />
          <Route path="logs" element={<Logs />} />
        </Route>

        {/* Rota raiz e fallback */}
        <Route index element={<Navigate to={initialRoute} replace />} />
        <Route path="*" element={<Navigate to={initialRoute} replace />} />
      </Routes>
    </Router>
  )
}
```

### Hierarquia de Rotas
```
/
├── /login                    [Público]
└── /                         [Protegido - Layout]
    ├── /home                 [Home]
    ├── /usuarios             [Usuarios]
    ├── /cargos               [Cargos]
    └── /logs                 [Logs]
```

### Navegação Programática
```typescript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

// Ir para home
navigate('/home')

// Ir para login (com replace)
navigate('/login', { replace: true })

// Voltar
navigate(-1)
```

---

## Estilização

### Sistema de Design Tokens (global.css)

#### Cores
```css
:root {
  /* Cores da Identidade Visual */
  --primary-color: #2a626a;        /* Verde-azulado escuro */
  --secondary-color: #44a0a8;      /* Verde-azulado médio */
  --accent-color: #e77f67;         /* Coral para botões/destaques */

  /* Cores Neutras e de Fundo */
  --background-app: #f0f2f5;       /* Fundo geral da aplicação */
  --background-card: #ffffff;      /* Fundo de cards/containers */
  --text-dark: #333333;            /* Textos principais */
  --text-medium: #666666;          /* Textos secundários */
  --text-light: #ffffff;           /* Texto sobre fundo escuro */
  --border-light: #e0e0e0;         /* Bordas sutis */
}
```

#### Tipografia
```css
:root {
  --font-family-base: 'minhasFontes', sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}
```

#### Espaçamento
```css
:root {
  --spacing-xs: 5px;
  --spacing-sm: 10px;
  --spacing-md: 20px;
  --spacing-lg: 30px;
  --spacing-xl: 40px;
}
```

#### Border Radius
```css
:root {
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}
```

### Arquivos CSS

#### global.css
**Propósito**: Variáveis globais, reset CSS, estilos base.

**Conteúdo**:
- Design tokens (cores, fontes, espaçamentos)
- Reset CSS (* selector)
- Estilos de body
- Estilos de headings (h1-h6)
- Links e botões base

#### login.css
**Propósito**: Estilos específicos da tela de login.

**Classes Principais**:
- `.container`: Card de login
- `.drag-area`: Área arrastável
- `.close-button`: Botão de fechar
- `.coluna-info`: Coluna esquerda (azul)
- `.formulario`: Coluna direita (branco)
- `.input-box`: Container de input
- `.login`: Botão de login

**Animações**:
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Menu.css
**Propósito**: Estilos do header e menu de navegação.

**Classes Principais**:
- `.box-header`: Header principal
- `.box-menu-principal`: Container do menu
- `.menu`: Lista de navegação
- `.box-imagem`: Logo

#### user.css
**Propósito**: Estilos da página de usuários.

**Estilos**:
- Tabelas de usuários
- Modais
- Formulários
- Badges de status/cargo

#### logs.css
**Propósito**: Estilos da página de logs.

**Estilos**:
- Tabela de logs
- Botão de atualizar
- Estados de loading

### Padrão de Nomenclatura CSS
- **BEM-like**: `.componente__elemento--modificador`
- **Classes descritivas**: `.formulario`, `.coluna-info`
- **Estados**: `.active`, `.inactive`, `.loading`
- **Variantes**: `.button-primary`, `.button-secondary`

---

## Utilitários

### auth.ts
**Propósito**: Funções para manipulação de autenticação e tokens JWT.

#### Funções Disponíveis

##### `decodeToken()`
```typescript
export function decodeToken(): DecodedToken | null {
  const token = localStorage.getItem('authToken')
  if (!token) return null

  try {
    return jwt_decode<DecodedToken>(token)
  } catch (error) {
    console.error('Erro ao decodificar token:', error)
    return null
  }
}
```
**Uso**: Decodifica o token JWT armazenado.

##### `hasPermission(permission: string)`
```typescript
export function hasPermission(permission: string): boolean {
  const token = localStorage.getItem('authToken')
  if (!token) return false

  try {
    const decoded = jwt_decode<DecodedToken>(token)
    return decoded.perm?.includes(permission) || false
  } catch (error) {
    return false
  }
}
```
**Uso**: Verifica se o usuário tem uma permissão específica.
```typescript
if (hasPermission('users:create')) {
  // Mostrar botão de criar usuário
}
```

##### `hasAllPermissions(permissions: string[])`
```typescript
export function hasAllPermissions(permissions: string[]): boolean {
  const token = localStorage.getItem('authToken')
  if (!token) return false

  try {
    const decoded = jwt_decode<DecodedToken>(token)
    const userPermissions = decoded.perm || []
    return permissions.every(perm => userPermissions.includes(perm))
  } catch (error) {
    return false
  }
}
```
**Uso**: Verifica se o usuário tem TODAS as permissões listadas (AND).
```typescript
if (hasAllPermissions(['users:read', 'users:update'])) {
  // Mostrar painel de edição
}
```

##### `hasAnyPermission(permissions: string[])`
```typescript
export function hasAnyPermission(permissions: string[]): boolean {
  const token = localStorage.getItem('authToken')
  if (!token) return false

  try {
    const decoded = jwt_decode<DecodedToken>(token)
    const userPermissions = decoded.perm || []
    return permissions.some(perm => userPermissions.includes(perm))
  } catch (error) {
    return false
  }
}
```
**Uso**: Verifica se o usuário tem PELO MENOS UMA das permissões (OR).
```typescript
if (hasAnyPermission(['users:read', 'roles:read'])) {
  // Mostrar menu de gerenciamento
}
```

##### `getUserRoles()`
```typescript
export function getUserRoles(): string[] {
  const decoded = decodeToken()
  return decoded?.role || []
}
```
**Uso**: Retorna array com os cargos do usuário.
```typescript
const roles = getUserRoles()
// ['Administrador', 'Gerente']
```

##### `getUsername()`
```typescript
export function getUsername(): string | null {
  const decoded = decodeToken()
  return decoded?.user || null
}
```
**Uso**: Retorna o nome de usuário.
```typescript
const username = getUsername()
// 'admin'
```

##### `isTokenExpired()`
```typescript
export function isTokenExpired(): boolean {
  const decoded = decodeToken()
  if (!decoded || !decoded.exp) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return decoded.exp < currentTime
}
```
**Uso**: Verifica se o token expirou.
```typescript
if (isTokenExpired()) {
  // Redirecionar para login
  navigate('/login')
}
```

##### `logout()`
```typescript
export function logout() {
  localStorage.removeItem('authToken')
  window.location.href = '/login'
}
```
**Uso**: Faz logout removendo token e redirecionando.

---

### permissionTranslator.ts
**Propósito**: Traduz permissões técnicas para texto amigável em português.

#### Mapeamento de Traduções
```typescript
const permissionTranslations: Record<string, string> = {
  // Usuários
  'users:create': 'Usuários: Criar',
  'users:read': 'Usuários: Visualizar',
  'users:update': 'Usuários: Editar',
  'users:delete': 'Usuários: Deletar',
  'users:view': 'Usuários: Listar',

  // Cargos
  'roles:create': 'Cargos: Criar',
  'roles:read': 'Cargos: Visualizar',
  'roles:update': 'Cargos: Editar',
  'roles:delete': 'Cargos: Deletar',
  'roles:view': 'Cargos: Listar',

  // Logs
  'logs:read': 'Logs: Visualizar',
  'logs:view': 'Logs: Acessar Sistema',

  // Permissões
  'allowed:create': 'Permissões: Criar',
  'allowed:read': 'Permissões: Visualizar',
  'allowed:update': 'Permissões: Editar',
  'allowed:delete': 'Permissões: Deletar'
}
```

#### Função de Tradução
```typescript
export function translatePermission(permission: string): string {
  return permissionTranslations[permission] || permission
}
```

#### Uso
```tsx
// Em Cargos.tsx
<div className="permission-item">
  {role.permissions.map(perm => (
    <span key={perm.id} className="permission-badge">
      {translatePermission(perm.functionality)}
    </span>
  ))}
</div>
```

**Resultado**:
- `users:create` → "Usuários: Criar" ✅
- `roles:update` → "Cargos: Editar" ✅
- `logs:read` → "Logs: Visualizar" ✅

---

## Integração Electron

### Arquitetura de Processos

```
┌─────────────────────────┐
│    Main Process         │ ← Node.js completo
│  - Gerencia janelas     │
│  - Sistema de arquivos  │
│  - IPC Main             │
└──────────┬──────────────┘
           │
           │ IPC (Inter-Process Communication)
           │
┌──────────▼──────────────┐
│   Preload Script        │ ← Bridge seguro
│  - contextBridge        │
│  - Expõe APIs          │
└──────────┬──────────────┘
           │
           │ window.api
           │
┌──────────▼──────────────┐
│  Renderer Process       │ ← React App
│  - UI (React)           │
│  - Sem acesso a Node    │
│  - IPC Renderer         │
└─────────────────────────┘
```

### Main Process (main.ts)

#### Gerenciamento de Janelas

##### Janela de Login
```typescript
function createLoginWindow(): void {
  const loginWindow = new BrowserWindow({
    width: 900,
    height: 580,
    show: true,
    frame: false,              // Sem moldura
    transparent: true,         // Fundo transparente
    autoHideMenuBar: true,
    resizable: false,          // Tamanho fixo
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Carrega URL
  if (is.dev) {
    loginWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    loginWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Escuta evento de login bem-sucedido
  ipcMain.once('login-success', () => {
    loginWindow.close()
    createMainWindow()
  })
}
```

##### Janela Principal
```typescript
function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: true,
    frame: true,               // Com moldura
    transparent: false,        // Fundo normal
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Limpa localStorage ao fechar
  mainWindow.on('closed', () => {
    const { session } = require('electron')
    session.defaultSession.clearStorageData({
      storages: ['localstorage']
    })
    mainWindow = null
  })

  // Carrega URL diretamente em /home
  if (is.dev) {
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/home`)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { 
      hash: '/home' 
    })
  }
}
```

#### IPC Handlers

##### Login Success
```typescript
ipcMain.once('login-success', () => {
  loginWindow.close()
  createMainWindow()
})
```

##### Logout
```typescript
ipcMain.on('logout', () => {
  if (mainWindow) {
    mainWindow.close()
    mainWindow = null
  }
  createLoginWindow()
})
```

#### Limpeza de Sessões

##### Ao Iniciar
```typescript
app.whenReady().then(() => {
  const { session } = require('electron')
  session.defaultSession.clearStorageData({
    storages: ['localstorage', 'sessionstorage', 'cookies', 'cachestorage']
  })
  
  startServer()
  createLoginWindow()
})
```

##### Ao Fechar Todas as Janelas
```typescript
app.on('window-all-closed', () => {
  const { session } = require('electron')
  session.defaultSession.clearStorageData({
    storages: ['localstorage', 'sessionstorage', 'cookies']
  })

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

---

### Preload Script (preload/index.ts)

**Propósito**: Bridge seguro entre Main e Renderer processes.

```typescript
import { contextBridge, ipcRenderer } from 'electron'

const api = {
  // Login bem-sucedido
  notifyLoginSuccess() {
    ipcRenderer.send('login-success')
  },

  // Logout
  notifyLogout() {
    ipcRenderer.send('logout')
  }
}

// Expõe API de forma segura
if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
} else {
  window.api = api
}
```

#### Tipos TypeScript (preload/index.d.ts)
```typescript
declare global {
  interface Window {
    api: {
      notifyLoginSuccess(): void
      notifyLogout(): void
    }
  }
}
```

---

### Uso no Renderer

#### Login
```typescript
// Login.tsx
if (data.success && data.token) {
  localStorage.setItem('authToken', data.token)
  
  // Notifica Electron
  if (window.api && window.api.notifyLoginSuccess) {
    window.api.notifyLoginSuccess()
  }
  
  // Navega (fallback)
  setTimeout(() => navigate('/home'), 100)
}
```

#### Logout
```typescript
// Header.tsx
const handleLogout = () => {
  localStorage.removeItem('authToken')
  
  // Notifica Electron
  if (window.api && window.api.notifyLogout) {
    window.api.notifyLogout()
  } else {
    navigate('/login')
  }
}
```

---

## Fluxos de Usuário

### Fluxo de Login Completo

```
1. Aplicação inicia
   ↓
2. app.whenReady() → Limpa storages antigos
   ↓
3. Verifica token no localStorage → Não existe
   ↓
4. createLoginWindow() → Janela 900x580, transparente, sem moldura
   ↓
5. React App carrega → App.tsx verifica token
   ↓
6. initialRoute = '/login'
   ↓
7. Renderiza <Login />
   ↓
8. Usuário preenche credenciais
   ↓
9. Submit → POST /api/login
   ↓
10. Backend valida → Retorna token JWT
   ↓
11. localStorage.setItem('authToken', token)
   ↓
12. window.api.notifyLoginSuccess()
   ↓
13. IPC: 'login-success' → Main Process
   ↓
14. loginWindow.close()
   ↓
15. createMainWindow() → Janela 1200x800, normal
   ↓
16. mainWindow.loadURL('#/home')
   ↓
17. React App carrega → App.tsx verifica token
   ↓
18. initialRoute = '/home'
   ↓
19. ProtectedRoute valida token → OK
   ↓
20. Renderiza <Layout> → <Home />
   ↓
21. ✅ Usuário logado no sistema
```

---

### Fluxo de Navegação entre Páginas

```
1. Usuário clica menu "Usuários"
   ↓
2. <Link to="/usuarios">
   ↓
3. React Router atualiza URL → /usuarios
   ↓
4. ProtectedRoute valida token → OK
   ↓
5. Renderiza <Layout>
   ↓
6. <Outlet /> renderiza <Usuarios />
   ↓
7. Usuarios.tsx verifica permissão
   ↓
8. hasPermission('users:view') → true
   ↓
9. useEffect → fetchUsers()
   ↓
10. GET /api/users com Authorization header
   ↓
11. Backend valida token e permissão
   ↓
12. Retorna lista de usuários
   ↓
13. setUsers(data)
   ↓
14. ✅ Página renderiza tabela de usuários
```

---

### Fluxo de Criação de Usuário

```
1. Página Usuarios.tsx carregada
   ↓
2. hasPermission('users:create') → true
   ↓
3. Botão "Novo Usuário" visível
   ↓
4. Usuário clica "Novo Usuário"
   ↓
5. setShowModal(true)
   ↓
6. Modal renderiza com formulário vazio
   ↓
7. useEffect → fetchRoles() para popular select
   ↓
8. Usuário preenche:
   - Nome
   - Login
   - Senha
   - Data de Nascimento
   - Seleciona cargo(s)
   - Define status
   ↓
9. Submit do formulário
   ↓
10. Validação client-side
   ↓
11. POST /api/user
    Body: {
      name: 'João Silva',
      login: 'joao.silva',
      password: 'senha123',
      birth_date: '1990-01-01',
      status: 1,
      roles: [1, 2]
    }
    Headers: {
      Authorization: 'Bearer <token>',
      Content-Type: 'application/json'
    }
   ↓
12. Backend:
    - Valida token
    - Verifica permissão users:create
    - Hash da senha (bcrypt)
    - Insere usuário no DB
    - Associa cargos
    - Registra log
   ↓
13. Retorna { success: true, data: { id, ... } }
   ↓
14. Frontend:
    - setShowModal(false)
    - fetchUsers() para atualizar lista
    - Mostra mensagem de sucesso (opcional)
   ↓
15. ✅ Usuário criado e aparece na tabela
```

---

### Fluxo de Logout

```
1. Usuário clica "Sair" no header
   ↓
2. handleLogout() é chamado
   ↓
3. localStorage.removeItem('authToken')
   ↓
4. window.api.notifyLogout()
   ↓
5. IPC: 'logout' → Main Process
   ↓
6. Main Process:
   - mainWindow.close()
   - Session clearStorageData (localStorage)
   - mainWindow = null
   ↓
7. createLoginWindow()
   ↓
8. Nova janela de login abre (900x580, transparente)
   ↓
9. React App carrega
   ↓
10. App.tsx verifica token → Não existe
   ↓
11. initialRoute = '/login'
   ↓
12. ✅ Renderiza tela de login
```

---

### Fluxo de Fechamento da Aplicação

```
1. Usuário clica X na janela principal
   ↓
2. mainWindow 'closed' event
   ↓
3. session.clearStorageData({ storages: ['localstorage'] })
   ↓
4. mainWindow = null
   ↓
5. app 'window-all-closed' event
   ↓
6. session.clearStorageData({ 
     storages: ['localstorage', 'sessionstorage', 'cookies', 'cachestorage'] 
   })
   ↓
7. if (process.platform !== 'darwin') app.quit()
   ↓
8. ✅ Aplicação fechada, todos os tokens limpos
```

---

## Gerenciamento de Estado

### Estratégia Atual: Local State com Hooks

O RH-OS utiliza **React Hooks** para gerenciamento de estado local:

#### useState
Usado para estado de componentes individuais:
```typescript
const [users, setUsers] = useState<User[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [showModal, setShowModal] = useState(false)
```

#### useEffect
Usado para side effects (fetch de dados):
```typescript
useEffect(() => {
  fetchUsers()
}, []) // Executa uma vez ao montar
```

#### useNavigate
Hook do React Router para navegação:
```typescript
const navigate = useNavigate()
navigate('/home')
```

---

### Padrões de Fetching de Dados

#### Padrão Básico
```typescript
const [data, setData] = useState<Type[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')

const fetchData = async () => {
  setLoading(true)
  setError('')

  try {
    const token = localStorage.getItem('authToken')
    const response = await fetch('http://localhost:4040/api/endpoint', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const result = await response.json()

    if (result.success) {
      setData(result.data)
    } else {
      setError(result.message)
    }
  } catch (err: any) {
    setError(err.message || 'Erro na conexão')
  } finally {
    setLoading(false)
  }
}
```

#### Padrão POST/PUT
```typescript
const handleSubmit = async (formData: FormData) => {
  setLoading(true)
  setError('')

  try {
    const token = localStorage.getItem('authToken')
    const response = await fetch('http://localhost:4040/api/endpoint', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const result = await response.json()

    if (result.success) {
      // Sucesso - atualizar estado
      setShowModal(false)
      fetchData()
    } else {
      setError(result.message)
    }
  } catch (err: any) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

---

### Melhorias Futuras (Sugestões)

#### 1. Context API para Estado Global
Criar contextos para compartilhar estado entre componentes:
```typescript
// AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('authToken', newToken)
    const decoded = jwt_decode<DecodedToken>(newToken)
    setUser(decoded)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

#### 2. React Query (TanStack Query)
Para cache e sincronização de dados do servidor:
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetch de usuários com cache
const { data: users, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
})

// Mutation com invalidação automática de cache
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }
})
```

#### 3. Zustand (State Manager Leve)
Para estado global simples:
```typescript
import create from 'zustand'

interface AuthStore {
  token: string | null
  user: User | null
  login: (token: string) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  login: (token) => {
    localStorage.setItem('authToken', token)
    set({ token, user: jwt_decode(token) })
  },
  logout: () => {
    localStorage.removeItem('authToken')
    set({ token: null, user: null })
  }
}))

// Uso
const { user, login, logout } = useAuthStore()
```

---

## Segurança

### Práticas de Segurança Implementadas

#### 1. Autenticação JWT
- ✅ Token armazenado no localStorage
- ✅ Token enviado em todas as requisições via header `Authorization: Bearer <token>`
- ✅ Token com expiração de 8 horas
- ✅ Validação de token no backend em cada request

#### 2. Proteção de Rotas
- ✅ `ProtectedRoute` verifica token antes de renderizar
- ✅ Redirecionamento automático para login se não autenticado
- ✅ Verificação client-side de permissões com `hasPermission()`

#### 3. Context Isolation (Electron)
```typescript
webPreferences: {
  nodeIntegration: false,      // Desabilita Node.js no renderer
  contextIsolation: true,      // Isola contextos
  sandbox: false               // Necessário para preload
}
```

#### 4. Preload Script como Bridge Seguro
- ✅ `contextBridge` expõe apenas APIs específicas
- ✅ Renderer não tem acesso direto ao Node.js
- ✅ IPC controlado e limitado

#### 5. Limpeza Automática de Sessões
- ✅ localStorage limpo ao fechar aplicação
- ✅ localStorage limpo ao iniciar aplicação
- ✅ Sessões antigas não persistem

#### 6. Validação Client-Side
```typescript
// Exemplo em formulários
if (!formData.name || !formData.login) {
  setError('Preencha todos os campos obrigatórios')
  return
}

if (formData.password && formData.password.length < 6) {
  setError('Senha deve ter pelo menos 6 caracteres')
  return
}
```

#### 7. Headers de Segurança
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

### Vulnerabilidades Conhecidas e Mitigações

#### ⚠️ Token no localStorage
**Problema**: Vulnerável a XSS (Cross-Site Scripting).

**Mitigação Atual**: Context isolation do Electron previne scripts maliciosos.

**Melhoria Sugerida**: 
- Usar httpOnly cookies (requer mudança no backend)
- Implementar refresh tokens
- Adicionar CSP (Content Security Policy)

#### ⚠️ Token Estático
**Problema**: Permissões não atualizam até re-login.

**Mitigação Atual**: Backend sempre valida permissões em tempo real.

**Melhoria Sugerida**:
- Implementar refresh tokens de curta duração
- WebSocket para notificação de mudança de permissões
- Forçar re-autenticação ao detectar mudança de permissões

#### ⚠️ CORS e Requisições
**Problema**: Frontend faz requisições diretas ao backend.

**Mitigação Atual**: Backend tem CORS configurado para aceitar apenas origem conhecida.

**Estado Atual**: Funcional para aplicação Electron local.

---

### Checklist de Segurança

- [x] Autenticação JWT implementada
- [x] Tokens com expiração
- [x] Validação de token em todas as requisições
- [x] Context isolation habilitado
- [x] Node integration desabilitado no renderer
- [x] Preload script como bridge seguro
- [x] Limpeza automática de sessões
- [x] Proteção de rotas
- [x] Verificação de permissões client-side
- [x] Verificação de permissões server-side
- [ ] CSP (Content Security Policy) - TODO
- [ ] Refresh tokens - TODO
- [ ] Rate limiting - TODO (backend)
- [ ] Sanitização de inputs - TODO
- [ ] HTTPS em produção - TODO

---

## Conclusão

O frontend do RH-OS é uma aplicação React moderna e bem estruturada, integrada ao Electron para funcionar como aplicação desktop. Implementa autenticação JWT, sistema de permissões granular, design responsivo e gerenciamento de múltiplas janelas.

### Tecnologias Principais
- React 18 + TypeScript
- Electron 32
- React Router v6
- CSS Modules com Design Tokens
- JWT para autenticação

### Pontos Fortes
- ✅ Arquitetura limpa e organizada
- ✅ Separação clara de responsabilidades
- ✅ Sistema de permissões robusto
- ✅ Design moderno e profissional
- ✅ Integração Electron bem implementada
- ✅ Segurança através de context isolation

### Melhorias Futuras
- Implementar Context API ou Zustand para estado global
- Adicionar React Query para cache de dados
- Implementar refresh tokens
- Adicionar testes unitários e E2E
- Melhorar feedback visual (toasts, loading states)
- Adicionar dark mode
- Implementar i18n (internacionalização)

---

**Versão**: 1.0.0  
**Data**: Novembro 2025  
**Autor**: Documentação gerada para o projeto RH-OS
