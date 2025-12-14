# 🔍 Análise do Frontend - Problemas e Inconsistências

**Data**: 22 de Novembro de 2025  
**Projeto**: RHOS  
**Análise**: Frontend React + TypeScript

---

## 📋 Sumário Executivo

Foram identificados **12 problemas principais** no frontend, categorizados em:
- 🔴 **Críticos**: 3 problemas
- 🟡 **Importantes**: 5 problemas  
- 🟢 **Melhorias**: 4 problemas

---

## 🔴 PROBLEMAS CRÍTICOS

### 1. **URL Hardcoded em Todas as Páginas**

**Severidade**: 🔴 CRÍTICA  
**Arquivos Afetados**: Todos os componentes (Login, Usuarios, Funcionarios, Cargos, Perfils, Logs, ModalCalculoFolha)

**Problema**:
```tsx
// ❌ Repetido em TODOS os arquivos
const response = await fetch('http://localhost:4040/api/users', {
const response = await fetch('http://localhost:4040/api/login', {
const response = await fetch('http://localhost:4040/api/employees', {
```

**Total de Ocorrências**: 20+ vezes

**Impacto**:
- Impossível alterar a URL da API sem modificar múltiplos arquivos
- Dificulta deploy em produção
- Não funciona em ambientes diferentes (dev, staging, prod)
- Violação do princípio DRY (Don't Repeat Yourself)

**Solução Recomendada**:
```tsx
// ✅ Criar arquivo de configuração
// src/renderer/src/config/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4040/api'

// ✅ Criar serviço HTTP centralizado
// src/renderer/src/services/api.ts
export const api = {
  async get(endpoint: string) {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.json()
  },
  
  async post(endpoint: string, data: any) {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
  // ... outros métodos
}
```

---

### 2. **Inconsistência nas Rotas da API**

**Severidade**: 🔴 CRÍTICA  
**Arquivos Afetados**: Usuarios.tsx, Perfils.tsx

**Problema**:
```tsx
// ❌ Usuarios.tsx usa /api/user (singular)
const url = editingUser 
  ? `http://localhost:4040/api/user/${editingUser.id}`
  : 'http://localhost:4040/api/user'

// ❌ Perfils.tsx usa /api/profile (singular)
const url = editingRole 
  ? `http://localhost:4040/api/profile/${editingRole.id}`
  : 'http://localhost:4040/api/profile'

// ✅ Mas as listagens usam plural
fetch('http://localhost:4040/api/users')  // plural
fetch('http://localhost:4040/api/profiles')  // plural
```

**Impacto**:
- Confusão sobre qual rota usar
- Possíveis erros de comunicação com backend
- Falta de padrão REST

**Solução**:
```tsx
// ✅ Padronizar TODAS as rotas no plural
POST   /api/users
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

---

### 3. **Falta de Tratamento de Erros Consistente**

**Severidade**: 🔴 CRÍTICA  
**Arquivos Afetados**: Todos

**Problema**:
```tsx
// ❌ Login.tsx - Mostra erro em alert inline
<div style={{ backgroundColor: '#f44336', color: 'white', ... }}>
  {error}
</div>

// ❌ Usuarios.tsx - Usa alert nativo
alert('Usuário cadastrado com sucesso!')

// ❌ Alguns componentes nem tratam erro
try {
  const response = await fetch(...)
  // Não verifica response.ok
  const data = await response.json()
} catch (err) {
  console.error('Erro:', err) // Apenas log
}
```

**Impacto**:
- Experiência de usuário inconsistente
- Alguns erros não são exibidos ao usuário
- Alerts nativos são feios e não customizáveis

**Solução**:
```tsx
// ✅ Criar componente de notificação
// src/renderer/src/components/Toast.tsx
export function useToast() {
  const [toast, setToast] = useState<{type: 'success' | 'error', message: string} | null>(null)
  
  const showSuccess = (message: string) => setToast({ type: 'success', message })
  const showError = (message: string) => setToast({ type: 'error', message })
  
  return { toast, showSuccess, showError }
}

// ✅ Usar em todos os componentes
const { showSuccess, showError } = useToast()

try {
  const data = await api.post('/users', userData)
  if (data.success) {
    showSuccess('Usuário criado com sucesso!')
  } else {
    showError(data.message)
  }
} catch (err) {
  showError('Erro na conexão com o servidor')
}
```

---

## 🟡 PROBLEMAS IMPORTANTES

### 4. **Repetição de Código de Autenticação**

**Severidade**: 🟡 IMPORTANTE  
**Arquivos Afetados**: Todos os componentes

**Problema**:
```tsx
// ❌ Repetido em TODOS os arquivos
const token = localStorage.getItem('authToken')
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

**Total de Repetições**: 20+ vezes

**Solução**: Ver item #1 (API centralizada)

---

### 5. **Falta de Validação de Formulários**

**Severidade**: 🟡 IMPORTANTE  
**Arquivos Afetados**: Usuarios.tsx, Funcionarios.tsx, Cargos.tsx, Perfils.tsx

**Problema**:
```tsx
// ❌ Sem validação de CPF
<input
  type="text"
  name="cpf"
  value={formData.cpf}
  onChange={handleInputChange}
  required
/>

// ❌ Sem validação de email
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleInputChange}
  required
/>

// ❌ Sem validação de salário (aceita valores negativos)
<input
  type="number"
  name="base_salary"
  value={formData.base_salary}
  onChange={handleInputChange}
/>
```

**Impacto**:
- Dados inválidos podem ser enviados ao servidor
- Experiência ruim do usuário (descobre erro apenas no submit)
- CPF pode ser enviado em formato inválido

**Solução**:
```tsx
// ✅ Criar validadores
// src/renderer/src/utils/validators.ts
export function validarCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return false
  // ... lógica de validação de dígitos verificadores
  return true
}

export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// ✅ Validar no onChange
const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const cpf = e.target.value
  setFormData(prev => ({ ...prev, cpf }))
  
  if (cpf.length === 11 && !validarCPF(cpf)) {
    setErrors(prev => ({ ...prev, cpf: 'CPF inválido' }))
  } else {
    setErrors(prev => ({ ...prev, cpf: '' }))
  }
}
```

---

### 6. **Estado de Loading Inconsistente**

**Severidade**: 🟡 IMPORTANTE  
**Arquivos Afetados**: Login.tsx, Usuarios.tsx, Cargos.tsx

**Problema**:
```tsx
// ❌ Login.tsx - Mostra "Entrando..." no botão
<button disabled={loading}>
  {loading ? 'Entrando...' : 'Entrar'}
</button>

// ❌ Usuarios.tsx - Sem indicador visual durante carregamento inicial
const [loading, setLoading] = useState(false) // Usado apenas no submit

// ❌ Funcionarios.tsx - Mostra apenas texto "Carregando..."
{loading && <p>Carregando funcionários...</p>}
```

**Impacto**:
- Inconsistência na UI
- Usuário não sabe quando a aplicação está processando
- Alguns componentes não desabilitam botões durante loading

**Solução**:
```tsx
// ✅ Criar componente de Loading
// src/renderer/src/components/Loading.tsx
export function Loading({ fullScreen = false }) {
  return (
    <div className={fullScreen ? 'loading-fullscreen' : 'loading-inline'}>
      <div className="spinner" />
      <p>Carregando...</p>
    </div>
  )
}

// ✅ Usar consistentemente
{loading ? <Loading /> : <TabelaUsuarios usuarios={users} />}
```

---

### 7. **Funções de Formatação Duplicadas**

**Severidade**: 🟡 IMPORTANTE  
**Arquivos Afetados**: Usuarios.tsx, Funcionarios.tsx

**Problema**:
```tsx
// ❌ Usuarios.tsx
const formatCPF = (cpf: string) => {
  if (!cpf) return ''
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return cpf
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// ❌ Funcionarios.tsx - MESMA FUNÇÃO DUPLICADA
const formatarCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// ❌ Funcionarios.tsx
const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}
```

**Solução**:
```tsx
// ✅ Criar arquivo de utilitários
// src/renderer/src/utils/formatters.ts
export function formatarCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return cpf
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

export function formatarData(data: string): string {
  return new Date(data).toLocaleDateString('pt-BR')
}

// ✅ Importar onde necessário
import { formatarCPF, formatarMoeda } from '../utils/formatters'
```

---

### 8. **Nomenclatura Inconsistente**

**Severidade**: 🟡 IMPORTANTE  
**Arquivos Afetados**: Todos

**Problema**:
```tsx
// ❌ Mistura de português e inglês
function Usuarios() { }           // Português
interface User { }                // Inglês
const [users, setUsers] = ...    // Inglês
const handleSubmit = ...         // Inglês

// ❌ Funcionarios.tsx
const formatarMoeda = ...        // Português
const formatarData = ...         // Português
const formatarCPF = ...          // Português

// ❌ Usuarios.tsx
const formatCPF = ...            // Inglês
```

**Impacto**:
- Código confuso para manutenção
- Falta de padronização
- Dificulta trabalho em equipe

**Solução**:
```tsx
// ✅ Decidir um padrão e seguir em TUDO
// Opção 1: Tudo em inglês (RECOMENDADO)
function Users() { }
const formatCurrency = ...
const formatDate = ...

// Opção 2: Tudo em português
function Usuarios() { }
const formatarMoeda = ...
const formatarData = ...
```

---

## 🟢 MELHORIAS RECOMENDADAS

### 9. **Estilos Inline Excessivos**

**Severidade**: 🟢 MELHORIA  
**Arquivos Afetados**: Login.tsx, Perfils.tsx, Usuarios.tsx

**Problema**:
```tsx
// ❌ Login.tsx - Estilo inline longo
<div style={{
  width: '100%',
  maxWidth: '300px',
  backgroundColor: '#f44336',
  color: 'white',
  padding: '10px',
  borderRadius: '8px',
  marginBottom: '15px',
  textAlign: 'center',
  fontSize: '14px'
}}>
  {error}
</div>
```

**Solução**:
```tsx
// ✅ Criar classes CSS
.error-message {
  width: 100%;
  max-width: 300px;
  background-color: #f44336;
  color: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 14px;
}

// ✅ Usar no componente
<div className="error-message">{error}</div>
```

---

### 10. **Falta de TypeScript Strict**

**Severidade**: 🟢 MELHORIA  
**Arquivos Afetados**: Todos

**Problema**:
```tsx
// ❌ Uso de 'any'
} catch (err: any) {
  setError(err.message || 'Erro')
}

// ❌ Props sem tipos definidos
const dataToSend: any = { ... }
```

**Solução**:
```tsx
// ✅ Criar tipos específicos
interface APIError {
  message: string
  code?: string
}

interface UserFormData {
  full_name: string
  email: string
  login: string
  password: string
  cpf: string
  role: string
  status: number
}

// ✅ Usar tipos
} catch (err) {
  const error = err as Error
  setError(error.message || 'Erro desconhecido')
}
```

---

### 11. **Logs de Debug em Produção**

**Severidade**: 🟢 MELHORIA  
**Arquivos Afetados**: Login.tsx, Usuarios.tsx

**Problema**:
```tsx
// ❌ Console.log em produção
console.log('🔐 Tentando fazer login...')
console.log('URL:', 'http://localhost:4040/api/login')
console.log('Dados:', { usuario, senha: '***' })
console.log('✅ Resposta recebida:', response.status)
```

**Solução**:
```tsx
// ✅ Criar logger condicional
// src/renderer/src/utils/logger.ts
const isDev = import.meta.env.DEV

export const logger = {
  info: (...args: any[]) => isDev && console.log('[INFO]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  debug: (...args: any[]) => isDev && console.log('[DEBUG]', ...args)
}

// ✅ Usar no código
logger.debug('Tentando fazer login...')
logger.error('Erro ao fazer login:', error)
```

---

### 12. **Falta de Comentários e Documentação**

**Severidade**: 🟢 MELHORIA  
**Arquivos Afetados**: Todos

**Problema**:
```tsx
// ❌ Funções sem documentação
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  // ...
}
```

**Solução**:
```tsx
// ✅ Adicionar JSDoc
/**
 * Envia os dados do formulário de cadastro de usuário
 * @param e - Evento de submit do formulário
 * @throws {Error} Se houver erro na comunicação com a API
 */
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  // ...
}
```

---

## 📊 Resumo de Prioridades

### 🔴 URGENTE (Fazer Agora)
1. ✅ Centralizar URL da API em config
2. ✅ Padronizar rotas (/api/users vs /api/user)
3. ✅ Criar serviço HTTP centralizado

### 🟡 IMPORTANTE (Próxima Sprint)
4. ✅ Criar sistema de notificações (Toast)
5. ✅ Adicionar validação de formulários
6. ✅ Criar utilitários compartilhados (formatters)
7. ✅ Padronizar nomenclatura

### 🟢 MELHORIAS (Backlog)
8. ✅ Refatorar estilos inline para CSS
9. ✅ Remover 'any' e melhorar tipos TypeScript
10. ✅ Implementar logger condicional
11. ✅ Adicionar documentação JSDoc

---

## 🛠️ Plano de Refatoração

### Fase 1: Infraestrutura (1-2 dias)
```
├── src/renderer/src/
│   ├── config/
│   │   └── api.ts                    # ✅ Configuração da API
│   ├── services/
│   │   └── api.service.ts            # ✅ HTTP client centralizado
│   ├── utils/
│   │   ├── formatters.ts             # ✅ Funções de formatação
│   │   ├── validators.ts             # ✅ Validações
│   │   └── logger.ts                 # ✅ Logger condicional
│   └── components/
│       ├── Toast.tsx                 # ✅ Sistema de notificações
│       └── Loading.tsx               # ✅ Loading consistente
```

### Fase 2: Refatoração de Componentes (3-5 dias)
- Atualizar Login.tsx
- Atualizar Usuarios.tsx
- Atualizar Funcionarios.tsx
- Atualizar Cargos.tsx
- Atualizar Perfils.tsx
- Atualizar Logs.tsx

### Fase 3: Testes e Ajustes (1-2 dias)
- Testar todas as funcionalidades
- Corrigir bugs encontrados
- Atualizar documentação

---

## 📈 Benefícios da Refatoração

### Antes
- ❌ 20+ URLs hardcoded
- ❌ Código duplicado em 6+ arquivos
- ❌ Sem validação adequada
- ❌ Tratamento de erro inconsistente
- ❌ Difícil de manter

### Depois
- ✅ 1 arquivo de configuração
- ✅ Código reutilizável
- ✅ Validação robusta
- ✅ UX consistente
- ✅ Fácil de manter e escalar

---

**Conclusão**: O frontend possui uma base sólida, mas necessita de refatoração para melhorar manutenibilidade, consistência e escalabilidade.
