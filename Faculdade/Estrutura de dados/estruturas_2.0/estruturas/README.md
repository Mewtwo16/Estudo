# 📚 Estruturas de Dados - TypeScript

Implementação completa de estruturas de dados lineares em TypeScript, incluindo listas encadeadas, pilhas, filas e suas variações circulares.

## 🎯 Objetivo

Este projeto demonstra a implementação de estruturas de dados fundamentais com:
- ✅ **TypeScript** com tipagem forte
- ✅ **Interfaces** bem definidas
- ✅ **Padrão Iterator** para todas as estruturas
- ✅ **Otimizações** de performance
- ✅ **Documentação** completa
- ✅ **Exemplos práticos** de uso

## 📂 Estrutura do Projeto

```
estruturas/
├── 📄 LISTAS_ENCADEADAS.md          # Documentação detalhada das listas
├── 📄 ESTRUTURAS_LINEARES.md         # Documentação geral
│
├── src/
│   ├── 📁 list/                      # Listas Lineares
│   │   ├── LinkedList.ts             # Lista Encadeada
│   │   ├── DoubleLinkedList.ts       # Lista Duplamente Encadeada
│   │   └── ...
│   │
│   ├── 📁 circular-list/             # Listas Circulares
│   │   ├── CircularLinkedList.ts     # Lista Encadeada Circular
│   │   ├── CircularDoubleLinkedList.ts  # Lista Dupla Circular
│   │   └── ...
│   │
│   ├── 📁 stack/                     # Pilha
│   │   └── Stack.ts
│   │
│   ├── 📁 queue/                     # Fila
│   │   └── Queue.ts
│   │
│   ├── 📁 exemplos/                  # Exemplos práticos
│   │   └── demonstracao-listas.ts
│   │
│   └── index.ts                      # Exports centralizados
│
├── package.json
└── tsconfig.json
```

## 🚀 Estruturas Implementadas

### 📋 Listas Encadeadas

| Estrutura | Descrição | Pasta |
|-----------|-----------|-------|
| **LinkedList** | Lista encadeada simples | `src/list/` |
| **DoubleLinkedList** | Lista duplamente encadeada com busca otimizada | `src/list/` |
| **CircularLinkedList** | Lista circular para processos cíclicos | `src/circular-list/` |
| **CircularDoubleLinkedList** | Lista circular dupla com máxima flexibilidade | `src/circular-list/` |

### 📚 Outras Estruturas

- **Stack** (Pilha) - LIFO
- **Queue** (Fila) - FIFO

## 🔧 Instalação e Uso

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn

### Instalar Dependências

```bash
npm install
```

### Compilar

```bash
npm run build
```

### Executar Demonstração

```bash
npm run demo
```

## 💡 Exemplos de Uso

### Lista Encadeada

```typescript
import { LinkedList } from './list/LinkedList';

const lista = new LinkedList<number>();
lista.add(10);
lista.add(20);
lista.add(30);

console.log(lista.get(1)); // 20
console.log(lista.size()); // 3

for (const valor of lista) {
    console.log(valor);
}
```

### Lista Duplamente Encadeada

```typescript
import { DoubleLinkedList } from './list/DoubleLinkedList';

const lista = new DoubleLinkedList<string>();
lista.add("A");
lista.add("B");
lista.add("C");

// Busca otimizada: índice próximo ao fim usa tail
console.log(lista.get(2)); // "C" - acesso reverso
```

### Lista Circular

```typescript
import { CircularLinkedList } from './circular-list/CircularLinkedList';

const playlist = new CircularLinkedList<string>();
playlist.add("🎵 Música 1");
playlist.add("🎵 Música 2");
playlist.add("🎵 Música 3");

// Reprodução em loop
for (let i = 0; i < 10; i++) {
    const index = i % playlist.size();
    console.log(playlist.get(index));
}
```

### Lista Circular Dupla

```typescript
import { CircularDoubleLinkedList } from './circular-list/CircularDoubleLinkedList';

const janelas = new CircularDoubleLinkedList<string>();
janelas.add("🌐 Navegador");
janelas.add("📝 Editor");
janelas.add("💻 Terminal");

// Navegação com Alt+Tab simulada
console.log(janelas.get(0)); // Navegador
console.log(janelas.get(1)); // Editor
// ... circular navigation
```

## 📊 Comparação de Performance

### Complexidade Temporal

| Operação | LinkedList | DoubleLinkedList | Circular* |
|----------|------------|------------------|-----------|
| **add (fim)** | O(1) | O(1) | O(1) |
| **insertAt (meio)** | O(n) | O(n/2) ⚡ | O(n/2) ⚡ |
| **get (índice)** | O(n) | O(n/2) ⚡ | O(n/2) ⚡ |
| **remove** | O(n) | O(n) | O(n) |
| **peekFirst/Last** | O(1) | O(1) | O(1) |

_* Mesma complexidade das versões não-circulares_

### Memória

| Estrutura | Overhead por Nó |
|-----------|-----------------|
| LinkedList | value + 1 ponteiro |
| DoubleLinkedList | value + 2 ponteiros |
| Circular | Igual à versão não-circular |

## 🎯 Quando Usar Cada Estrutura?

### LinkedList
- ✅ Percorrer apenas para frente
- ✅ Inserções/remoções no início ou fim
- ✅ Economia de memória

### DoubleLinkedList
- ✅ Navegação bidirecional
- ✅ Buscas otimizadas
- ✅ Remoções frequentes no meio

### CircularLinkedList
- ✅ Processos cíclicos (round-robin)
- ✅ Buffers circulares
- ✅ Playlists em loop

### CircularDoubleLinkedList
- ✅ Navegação bidirecional com wrap
- ✅ Carrosséis de imagens
- ✅ Histórico circular

## 📖 Documentação Completa

Para documentação detalhada de cada estrutura, consulte:

- **[LISTAS_ENCADEADAS.md](./LISTAS_ENCADEADAS.md)** - Guia completo das listas
- **[ESTRUTURAS_LINEARES.md](./ESTRUTURAS_LINEARES.md)** - Visão geral

## 🧪 Características Técnicas

### Todas as estruturas implementam:

- ✅ **Interfaces TypeScript** com tipagem forte
- ✅ **Padrão Iterator** (`for...of` loops)
- ✅ **Métodos padrão**: add, remove, get, size, isEmpty, clear
- ✅ **Otimizações** quando aplicável (busca bidirecional)
- ✅ **Documentação JSDoc** em cada método

### Otimizações Implementadas:

1. **Busca Bidirecional** (DoubleLinkedList)
   - Se índice < length/2: busca do head
   - Se índice >= length/2: busca do tail (reverso)

2. **Manutenção de Circularidade**
   - Listas circulares mantêm `tail.next = head`
   - Listas duplas circulares mantêm `head.prev = tail`

3. **Iterator Seguro**
   - Listas circulares usam contador para evitar loops infinitos
   - Percorre cada elemento exatamente uma vez

## 🛠️ Scripts Disponíveis

```bash
# Compilar TypeScript
npm run build

# Executar demonstração
npm run demo

# Limpar arquivos compilados
npm run clean
```

## 📝 Licença

Este projeto é desenvolvido para fins educacionais.

## 👨‍💻 Autor

Projeto de estudo de Estruturas de Dados em TypeScript

---

**💡 Dica**: Execute `npm run demo` para ver todas as estruturas em ação!
