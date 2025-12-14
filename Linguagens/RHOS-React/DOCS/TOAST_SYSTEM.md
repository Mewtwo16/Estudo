# Sistema de Notificações Toast

## 📋 Visão Geral

Sistema de notificações toast criado para substituir os `alert()` do JavaScript, oferecendo uma experiência de usuário mais moderna e não-bloqueante.

## 🎨 Tipos de Toast

- **success** ✓ - Verde - Operações bem-sucedidas
- **error** ✕ - Vermelho - Erros e falhas
- **warning** ⚠ - Laranja - Avisos importantes
- **info** ℹ - Azul - Informações gerais

## 📦 Componentes Criados

### 1. Toast.tsx
Componente individual de notificação que:
- Auto-fecha após duração configurável (padrão: 3 segundos)
- Pode ser fechado manualmente
- Anima entrada com slide da direita
- Mostra ícone apropriado por tipo

### 2. ToastContainer.tsx
Provider que gerencia múltiplas notificações:
- Context API para acesso global
- Hook `useToast()` para facilitar uso
- Posicionamento fixo no topo direito
- Empilhamento de múltiplas notificações

### 3. toast.css
Estilos completos incluindo:
- Animações suaves
- Cores por tipo
- Responsivo para mobile
- Sombras e bordas

## 🚀 Como Usar

### 1. Provider já configurado no App.tsx

```tsx
import { ToastProvider } from './components/ToastContainer'

function App() {
  return (
    <ToastProvider>
      {/* Resto da aplicação */}
    </ToastProvider>
  )
}
```

### 2. Usar em qualquer componente

```tsx
import { useToast } from '../components/ToastContainer'

function MeuComponente() {
  const { showSuccess, showError, showWarning, showInfo } = useToast()

  const handleSave = async () => {
    try {
      await salvar()
      showSuccess('Salvo com sucesso!')
    } catch (error) {
      showError('Erro ao salvar: ' + error.message)
    }
  }

  return <button onClick={handleSave}>Salvar</button>
}
```

## 📝 Exemplos de Uso

### Sucesso
```tsx
showSuccess('Usuário cadastrado com sucesso!')
showSuccess('Cargo atualizado!')
```

### Erro
```tsx
showError('Erro ao conectar com o servidor')
showError('CPF inválido')
```

### Aviso
```tsx
showWarning('Esta ação não pode ser desfeita')
showWarning('Sessão expirando em 5 minutos')
```

### Informação
```tsx
showInfo('Carregando dados...')
showInfo('Processando arquivo')
```

### Personalizado (com duração)
```tsx
// Toast que dura 5 segundos
showToast('Mensagem customizada', 'success')
```

## 🔄 Migração de alert()

### ❌ Antes (alert)
```tsx
if (data.success) {
  alert('Cadastrado com sucesso!')
}
```

### ✅ Depois (toast)
```tsx
if (data.success) {
  showSuccess('Cadastrado com sucesso!')
}
```

## 🎯 Onde Substituir

### Componentes que usam alert():
1. **Cargos.tsx** - 4 alerts
   - Cargo cadastrado/atualizado
   - Cargo inativado/reativado

2. **Perfils.tsx** - 2 alerts
   - Perfil cadastrado/atualizado

3. **Funcionarios.tsx** - 1 alert
   - Funcionário cadastrado

### Como fazer:

```tsx
// 1. Importar o hook
import { useToast } from '../components/ToastContainer'

// 2. Usar no componente
function MeuComponente() {
  const { showSuccess, showError } = useToast()

  // 3. Substituir alert por showSuccess/showError
  // alert('Sucesso!') → showSuccess('Sucesso!')
  // alert('Erro!') → showError('Erro!')
}
```

## 🎨 Customização

### Duração
```tsx
// Toast rápido (1 segundo)
showToast('Copiado!', 'info')

// Toast longo (10 segundos)
<Toast message="..." type="warning" duration={10000} />
```

### Posição
Editar `.toast-container` em `toast.css`:
```css
.toast-container {
  top: 20px;     /* Mudar para bottom: 20px para baixo */
  right: 20px;   /* Mudar para left: 20px para esquerda */
}
```

## 🔥 Benefícios

1. **Não-bloqueante**: Usuário pode continuar trabalhando
2. **Múltiplas notificações**: Empilhamento automático
3. **Visual moderno**: Animações e ícones
4. **Type-safe**: TypeScript com tipos definidos
5. **Responsivo**: Funciona em mobile
6. **Acessível**: Pode ser fechado com mouse ou auto-fecha

## 📊 Estatísticas

- **3 arquivos criados**: Toast.tsx, ToastContainer.tsx, toast.css
- **~250 linhas de código**
- **4 tipos de notificação**
- **Context API** para gerenciamento de estado
- **Hooks personalizados** para facilitar uso

## 🎯 Próximos Passos

1. Substituir todos os `alert()` por toast nos componentes
2. Adicionar toasts em operações assíncronas (loading → success/error)
3. Considerar adicionar sons (opcional)
4. Adicionar ações nos toasts (ex: "Desfazer")
