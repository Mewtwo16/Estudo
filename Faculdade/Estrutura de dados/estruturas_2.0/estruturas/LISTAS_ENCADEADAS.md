# Estruturas de Dados Lineares - Listas Encadeadas

Este documento apresenta a implementação de estruturas de dados lineares do tipo lista encadeada, incluindo suas versões simples, duplas e circulares.

## 📚 Índice

1. [Lista Encadeada (LinkedList)](#lista-encadeada-linkedlist)
2. [Lista Duplamente Encadeada (DoubleLinkedList)](#lista-duplamente-encadeada-doublelinkedlist)
3. [Lista Encadeada Circular (CircularLinkedList)](#lista-encadeada-circular-circularlinkedlist)
4. [Lista Duplamente Encadeada Circular (CircularDoubleLinkedList)](#lista-duplamente-encadeada-circular-circulardoublelinkedlist)
5. [Comparação de Desempenho](#comparação-de-desempenho)

---

## Lista Encadeada (LinkedList)

### 📖 Descrição

Uma **Lista Encadeada** é uma estrutura de dados linear onde cada elemento (nó) contém um valor e uma referência (ponteiro) para o próximo nó da sequência. O último nó aponta para `null`.

### 🏗️ Estrutura

```
head → [value|next] → [value|next] → [value|next] → null
                                           ↑
                                          tail
```

### ✨ Características

- **Acesso Sequencial**: Necessário percorrer a lista do início
- **Inserção/Remoção no início**: O(1)
- **Inserção/Remoção no fim**: O(1) com ponteiro tail
- **Busca**: O(n)
- **Memória**: Usa apenas o espaço necessário + overhead dos ponteiros

### 🔧 Operações Principais

| Operação | Complexidade | Descrição |
|----------|--------------|-----------|
| `add(value)` | O(1) | Adiciona no final |
| `insertAt(index, value)` | O(n) | Insere em posição específica |
| `remove(value)` | O(n) | Remove primeira ocorrência |
| `get(index)` | O(n) | Acessa elemento por índice |
| `peekFirst()` | O(1) | Retorna primeiro elemento |
| `peekLast()` | O(1) | Retorna último elemento |
| `size()` | O(1) | Retorna tamanho |
| `isEmpty()` | O(1) | Verifica se está vazia |
| `clear()` | O(1) | Limpa a lista |

### 💡 Exemplo de Uso

```typescript
import { LinkedList } from './list/LinkedList';

const list = new LinkedList<number>();

list.add(10);
list.add(20);
list.add(30);

console.log(list.get(1)); // 20
console.log(list.peekFirst()); // 10
console.log(list.size()); // 3

list.insertAt(1, 15);
// Lista: 10 → 15 → 20 → 30

list.remove(20);
// Lista: 10 → 15 → 30

// Iteração
for (const value of list) {
    console.log(value);
}
```

### 📍 Localização

- **Pasta**: `src/list/`
- **Arquivos principais**:
  - `LinkedList.ts` - Implementação da lista
  - `ILinkedList.ts` - Interface
  - `Nodes.ts` - Classe do nó

---

## Lista Duplamente Encadeada (DoubleLinkedList)

### 📖 Descrição

Uma **Lista Duplamente Encadeada** é uma estrutura onde cada nó possui referências tanto para o próximo quanto para o nó anterior, permitindo navegação bidirecional.

### 🏗️ Estrutura

```
     ┌──────────────────────────────────┐
     ↓                                  ↓
null ← [prev|value|next] ⇄ [prev|value|next] ⇄ [prev|value|next] → null
       ↑                                                     ↑
      head                                                  tail
```

### ✨ Características

- **Navegação Bidirecional**: Pode percorrer para frente e para trás
- **Inserção/Remoção Otimizada**: Não precisa de ponteiro auxiliar
- **Busca Otimizada**: Escolhe direção mais próxima (head ou tail)
- **Memória**: Maior overhead devido ao ponteiro adicional

### 🔧 Operações Principais

| Operação | Complexidade | Descrição |
|----------|--------------|-----------|
| `add(value)` | O(1) | Adiciona no final |
| `insertAt(index, value)` | O(n/2) | Insere - otimizado para direção |
| `remove(value)` | O(n) | Remove primeira ocorrência |
| `get(index)` | O(n/2) | Acessa - otimizado para direção |
| `peekFirst()` | O(1) | Retorna primeiro elemento |
| `peekLast()` | O(1) | Retorna último elemento |

### 💡 Exemplo de Uso

```typescript
import { DoubleLinkedList } from './list/DoubleLinkedList';

const list = new DoubleLinkedList<string>();

list.add("A");
list.add("B");
list.add("C");

console.log(list.get(1)); // "B"

// Busca otimizada: índice próximo ao fim usa tail
console.log(list.get(2)); // "C" - busca reversa é mais rápida

list.insertAt(1, "A.5");
// Lista: A ⇄ A.5 ⇄ B ⇄ C

list.remove("B");
// Lista: A ⇄ A.5 ⇄ C
```

### 📍 Localização

- **Pasta**: `src/list/`
- **Arquivos principais**:
  - `DoubleLinkedList.ts` - Implementação da lista
  - `IDoubleLinkedList.ts` - Interface
  - `DoubleNode.ts` - Classe do nó duplo

---

## Lista Encadeada Circular (CircularLinkedList)

### 📖 Descrição

Uma **Lista Encadeada Circular** é uma variação onde o último nó aponta de volta para o primeiro, formando um círculo. Não há ponteiros `null`.

### 🏗️ Estrutura

```
      ┌─────────────────────────────────────┐
      ↓                                     │
head → [value|next] → [value|next] → [value|next]
                                         ↑
                                        tail
```

### ✨ Características

- **Estrutura Circular**: tail.next sempre aponta para head
- **Sem Final**: Útil para processos cíclicos (round-robin)
- **Iteração Controlada**: Precisa de contador para não entrar em loop infinito
- **Acesso ao Início**: Sempre possível a partir de qualquer nó

### 🎯 Casos de Uso

- **Buffers circulares**
- **Algoritmos round-robin**
- **Jogos com turnos circulares**
- **Playlists em loop**
- **Processos cíclicos**

### 🔧 Operações Principais

Mesmas complexidades da lista encadeada simples, mas mantém a circularidade:

| Operação | Diferença Principal |
|----------|---------------------|
| `add(value)` | tail.next = head após inserção |
| `insertAt(0, value)` | tail.next = novo head |
| `remove(value)` | Mantém circularidade após remoção |

### 💡 Exemplo de Uso

```typescript
import { CircularLinkedList } from './circular-list/CircularLinkedList';

const playlist = new CircularLinkedList<string>();

playlist.add("Música 1");
playlist.add("Música 2");
playlist.add("Música 3");

// Simula reprodução em loop
let current = 0;
for (let i = 0; i < 10; i++) {
    console.log(playlist.get(current % playlist.size()));
    current++;
}
// Output: Música 1, Música 2, Música 3, Música 1, Música 2, ...

// Iterator para de iterar após visitar todos os elementos uma vez
for (const musica of playlist) {
    console.log(musica); // Não entra em loop infinito
}
```

### 📍 Localização

- **Pasta**: `src/circular-list/`
- **Arquivos principais**:
  - `CircularLinkedList.ts` - Implementação da lista circular
  - `ICircularLinkedList.ts` - Interface
  - `Nodes.ts` - Classe do nó (mesma da lista simples)

---

## Lista Duplamente Encadeada Circular (CircularDoubleLinkedList)

### 📖 Descrição

A **Lista Duplamente Encadeada Circular** combina navegação bidirecional com estrutura circular. O tail aponta para head e head aponta para tail, em ambas as direções.

### 🏗️ Estrutura

```
      ┌──────────────────────────────────────────┐
      ↓                                          ↑
head ⇄ [prev|value|next] ⇄ [prev|value|next] ⇄ [prev|value|next]
  ↑                                                ↓
  └────────────────────────────────────────────────┘
                                                   tail
```

### ✨ Características

- **Duplamente Circular**: Conexões bidirecionais em loop
- **Máxima Flexibilidade**: Acesso eficiente de qualquer direção
- **Busca Otimizada**: Escolhe caminho mais curto considerando circularidade
- **Sem Início/Fim Definido**: Qualquer nó pode ser referência

### 🎯 Casos de Uso

- **Editores de texto** (navegação bidirecional com wrap)
- **Gerenciadores de janelas** (ciclo entre aplicações)
- **Navegação de histórico** (frente/trás com loop)
- **Carrosséis** de imagens
- **Estruturas de dados avançadas** (cache LRU circular)

### 🔧 Operações Principais

Combina as otimizações da lista dupla com manutenção da circularidade:

| Operação | Otimização | Complexidade |
|----------|------------|--------------|
| `add(value)` | Mantém ligações circulares bi direcionais | O(1) |
| `insertAt(index, value)` | Busca otimizada + circularidade | O(n/2) |
| `get(index)` | Escolhe direção mais próxima | O(n/2) |
| `remove(value)` | Mantém circularidade após remoção | O(n) |

### 💡 Exemplo de Uso

```typescript
import { CircularDoubleLinkedList } from './circular-list/CircularDoubleLinkedList';

const janelas = new CircularDoubleLinkedList<string>();

janelas.add("Navegador");
janelas.add("Editor");
janelas.add("Terminal");

// Navega para frente (Alt+Tab)
console.log(janelas.get(0)); // Navegador
console.log(janelas.get(1)); // Editor
console.log(janelas.get(2)); // Terminal

// Graças à circularidade, pode navegar além do fim
// (implementação interna trata isso no get otimizado)

// Busca otimizada: get(2) é mais rápido acessando de trás
console.log(janelas.get(2)); // Acessa via tail (mais rápido)

// Iterator percorre todos uma vez
for (const janela of janelas) {
    console.log(janela);
}
```

### 📍 Localização

- **Pasta**: `src/circular-list/`
- **Arquivos principais**:
  - `CircularDoubleLinkedList.ts` - Implementação
  - `ICircularDoubleLinkedList.ts` - Interface
  - `DoubleNode.ts` - Classe do nó duplo

---

## Comparação de Desempenho

### Complexidade Temporal

| Operação | LinkedList | DoubleLinkedList | CircularLinkedList | CircularDoubleLinkedList |
|----------|------------|------------------|--------------------|-----------------------|
| **add (fim)** | O(1) | O(1) | O(1) | O(1) |
| **insertAt (início)** | O(1) | O(1) | O(1) | O(1) |
| **insertAt (meio)** | O(n) | O(n/2)* | O(n) | O(n/2)* |
| **remove** | O(n) | O(n) | O(n) | O(n) |
| **get** | O(n) | O(n/2)* | O(n) | O(n/2)* |
| **peekFirst/Last** | O(1) | O(1) | O(1) | O(1) |
| **size/isEmpty** | O(1) | O(1) | O(1) | O(1) |

_* Otimizado: escolhe a direção mais próxima (head ou tail)_

### Complexidade Espacial

| Estrutura | Memória por Nó | Overhead |
|-----------|----------------|----------|
| **LinkedList** | value + 1 ponteiro | Baixo |
| **DoubleLinkedList** | value + 2 ponteiros | Médio |
| **CircularLinkedList** | value + 1 ponteiro | Baixo |
| **CircularDoubleLinkedList** | value + 2 ponteiros | Médio |

### Quando Usar Cada Estrutura?

#### 📍 **LinkedList**
✅ Quando só precisa percorrer para frente  
✅ Inserções/remoções frequentes no início ou fim  
✅ Memória é limitada  
❌ Quando precisa acesso rápido por índice

#### 📍 **DoubleLinkedList**
✅ Quando precisa navegar nos dois sentidos  
✅ Remoções frequentes de elementos no meio  
✅ Buscas que podem ser otimizadas pela direção  
❌ Quando memória é muito limitada

#### 📍 **CircularLinkedList**
✅ Processos cíclicos (round-robin)  
✅ Buffers circulares  
✅ Aplicações que precisam "dar a volta"  
❌ Quando circularidade não é necessária

#### 📍 **CircularDoubleLinkedList**
✅ Navegação bidirecional com wrap  
✅ Estruturas que precisam voltar ao início automaticamente  
✅ Máxima flexibilidade de navegação  
❌ Quando a complexidade adicional não é justificada

---

## 🚀 Como Executar

### Instalação

```bash
npm install
```

### Compilação

```bash
npm run build
```

### Testes

```typescript
import { LinkedList, DoubleLinkedList } from './list';
import { CircularLinkedList, CircularDoubleLinkedList } from './circular-list';

// Crie suas instâncias e teste!
```

---

## 📂 Estrutura do Projeto

```
estruturas/
├── src/
│   ├── list/                      # Listas Lineares
│   │   ├── LinkedList.ts
│   │   ├── DoubleLinkedList.ts
│   │   ├── ILinkedList.ts
│   │   ├── IDoubleLinkedList.ts
│   │   ├── Nodes.ts
│   │   └── DoubleNode.ts
│   │
│   ├── circular-list/             # Listas Circulares
│   │   ├── CircularLinkedList.ts
│   │   ├── CircularDoubleLinkedList.ts
│   │   ├── ICircularLinkedList.ts
│   │   ├── ICircularDoubleLinkedList.ts
│   │   ├── Nodes.ts
│   │   └── DoubleNode.ts
│   │
│   ├── stack/                     # Pilha
│   ├── queue/                     # Fila
│   └── index.ts                   # Exports centralizados
│
├── LISTAS_ENCADEADAS.md           # Este arquivo
├── package.json
└── tsconfig.json
```

---

## 🎓 Conceitos Importantes

### Node (Nó)

Elemento básico de uma lista encadeada:

```typescript
class Node<T> {
    value: T;
    next: Node<T> | null;
}
```

### DoubleNode (Nó Duplo)

Elemento com referência bidirecional:

```typescript
class DoubleNode<T> {
    value: T;
    next: DoubleNode<T> | null;
    prev: DoubleNode<T> | null;
}
```

### Head e Tail

- **Head**: Primeiro elemento da lista
- **Tail**: Último elemento da lista
- Permitem acesso O(1) às extremidades

### Circularidade

Em listas circulares:
- **Simples**: `tail.next = head`
- **Dupla**: `tail.next = head` e `head.prev = tail`

---

## 📝 Notas de Implementação

### Método `get(index: number)`

Todas as estruturas implementam o método `get()` conforme a interface:

```typescript
get(index: number): T | undefined {
    if(index < 0 || index >= this.length) return undefined;
    // Implementação específica...
}
```

**Otimizações em Listas Duplas:**
- Se `index < length/2`: percorre do head
- Se `index >= length/2`: percorre do tail (reverso)

### Iterator Pattern

Todas as estruturas implementam `Iterable<T>`:

```typescript
for (const item of list) {
    console.log(item);
}
```

**Importante**: Em listas circulares, o iterator para após visitar cada elemento exatamente uma vez, evitando loops infinitos.

---

## 📚 Referências

- Estruturas de Dados e Algoritmos em TypeScript
- Design Patterns: Iterator
- Análise de Complexidade Algorítmica

---

**Desenvolvido como material de estudo de Estruturas de Dados** 🎯
