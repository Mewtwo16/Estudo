# Estruturas de Dados Lineares

Este projeto implementa estruturas de dados lineares em TypeScript, incluindo listas encadeadas simples, duplamente encadeadas e suas versões circulares.

## 📚 Estruturas Implementadas

### 1. Lista Encadeada (LinkedList)
**Localização:** `src/list/LinkedList.ts`

Uma estrutura linear onde cada elemento (nó) contém um valor e uma referência para o próximo elemento.

#### Características:
- ✅ Acesso ao primeiro e último elemento em O(1)
- ✅ Inserção no início ou fim em O(1)
- ✅ Remoção do primeiro elemento em O(1)
- ⚠️ Acesso por índice em O(n)
- ⚠️ Busca por valor em O(n)

#### Operações Principais:
```typescript
const list = new LinkedList<number>();
list.add(10);              // Adiciona no final
list.insertAt(0, 5);       // Insere em posição específica
list.get(0);               // Acessa elemento por índice
list.remove(10);           // Remove primeiro elemento com valor
list.peekFirst();          // Visualiza primeiro elemento
list.peekLast();           // Visualiza último elemento
```

---

### 2. Lista Duplamente Encadeada (DoubleLinkedList)
**Localização:** `src/list/DoubleLinkedList.ts`

Uma estrutura linear onde cada nó possui referências tanto para o próximo quanto para o anterior.

#### Características:
- ✅ Navegação bidirecional (frente e trás)
- ✅ Acesso ao primeiro e último elemento em O(1)
- ✅ Remoção de qualquer elemento em O(1) (se já tiver referência)
- ✅ Busca otimizada: escolhe direção mais próxima (head ou tail)
- ⚠️ Usa mais memória (2 ponteiros por nó)

#### Operações Principais:
```typescript
const list = new DoubleLinkedList<number>();
list.add(10);              // Adiciona no final
list.insertAt(2, 15);      // Insere em posição específica
list.get(5);               // Acesso otimizado por índice
list.remove(10);           // Remove primeiro elemento com valor
```

#### Otimização do método `get()`:
```typescript
get(index: number): T | undefined {
    if(index < this.length / 2){
        // Percorre a partir do head (mais próximo)
        curr = this.head;
        for(let i = 0; i < index; i++) curr = curr!.next;
    } else {
        // Percorre a partir do tail (mais próximo)
        curr = this.tail;
        for(let i = this.length - 1; i > index; i--) curr = curr!.prev;
    }
    return curr?.value;
}
```

---

## 🔄 Versões Circulares

### 3. Lista Encadeada Circular (CircularLinkedList)
**Localização:** `src/circular-list/CircularLinkedList.ts`

Uma lista encadeada onde o último nó aponta de volta para o primeiro, formando um círculo.

#### Características:
- 🔄 `tail.next` sempre aponta para `head`
- 🔄 Não há ponteiro `null` no final
- ✅ Útil para buffers circulares
- ✅ Implementação de algoritmos round-robin
- ⚠️ Iterator para após visitar todos os elementos (evita loop infinito)

#### Diagrama:
```
head → [A] → [B] → [C] ← tail
       ↑_______________|
```

#### Exemplo de Uso:
```typescript
const circular = new CircularLinkedList<string>();
circular.add("A");
circular.add("B");
circular.add("C");

// tail.next aponta para head automaticamente
// Ideal para: playlist circular, round-robin scheduling
```

---

### 4. Lista Duplamente Encadeada Circular (CircularDoubleLinkedList)
**Localização:** `src/circular-list/CircularDoubleLinkedList.ts`

Uma lista duplamente encadeada onde o primeiro e último nós estão conectados circularmente em ambas as direções.

#### Características:
- 🔄 `tail.next` aponta para `head`
- 🔄 `head.prev` aponta para `tail`
- ✅ Navegação bidirecional infinita
- ✅ Método `get()` implementado com otimização de direção
- ✅ Ideal para estruturas que requerem navegação circular em ambas direções

#### Diagrama:
```
     ←────────────────────
    ↓                      ↑
head ↔ [A] ↔ [B] ↔ [C] ← tail
    ↓                      ↑
     ──────────────────────→
```

#### Exemplo de Uso:
```typescript
const circularDouble = new CircularDoubleLinkedList<number>();
circularDouble.add(1);
circularDouble.add(2);
circularDouble.add(3);

// Pode navegar infinitamente em qualquer direção
// tail.next = head e head.prev = tail
```

---

## 📦 Estrutura do Projeto

```
estruturas/
├── src/
│   ├── list/                      # Listas lineares clássicas
│   │   ├── LinkedList.ts          # Lista encadeada simples
│   │   ├── DoubleLinkedList.ts    # Lista duplamente encadeada
│   │   ├── ILinkedList.ts         # Interface lista simples
│   │   ├── IDoubleLinkedList.ts   # Interface lista dupla
│   │   ├── Nodes.ts               # Nó simples
│   │   └── DoubleNode.ts          # Nó duplo
│   │
│   ├── circular-list/             # Listas circulares
│   │   ├── CircularLinkedList.ts         # Lista circular simples
│   │   ├── CircularDoubleLinkedList.ts   # Lista circular dupla
│   │   ├── ICircularLinkedList.ts        # Interface circular simples
│   │   ├── ICircularDoubleLinkedList.ts  # Interface circular dupla
│   │   ├── Nodes.ts                      # Nó simples
│   │   └── DoubleNode.ts                 # Nó duplo
│   │
│   ├── stack/                     # Pilha (LIFO)
│   ├── queue/                     # Fila (FIFO)
│   └── index.ts                   # Exportações principais
```

---

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Compilação
```bash
npm run build
```

### Importação
```typescript
// Listas clássicas
import { LinkedList, DoubleLinkedList } from './estruturas';

// Listas circulares
import { CircularLinkedList, CircularDoubleLinkedList } from './estruturas';
```

---

## 📊 Comparação de Complexidade

| Operação | LinkedList | DoubleLinkedList | CircularLinkedList | CircularDoubleLinkedList |
|----------|------------|------------------|-------------------|-------------------------|
| add() | O(1) | O(1) | O(1) | O(1) |
| insertAt() | O(n) | O(n) | O(n) | O(n) |
| get() | O(n) | O(n/2)* | O(n) | O(n/2)* |
| remove() | O(n) | O(n) | O(n) | O(n) |
| peekFirst() | O(1) | O(1) | O(1) | O(1) |
| peekLast() | O(1) | O(1) | O(1) | O(1) |

*Otimizado: escolhe direção mais próxima (head ou tail)

---

## 🎯 Quando Usar Cada Estrutura

### LinkedList
- ✅ Inserções/remoções frequentes no início/fim
- ✅ Não precisa de acesso aleatório
- ✅ Memória limitada (1 ponteiro por nó)

### DoubleLinkedList
- ✅ Necessita navegação bidirecional
- ✅ Remoções frequentes em posições arbitrárias
- ✅ Acesso por índice com melhor desempenho

### CircularLinkedList
- ✅ Buffers circulares
- ✅ Round-robin scheduling
- ✅ Playlist em loop
- ✅ Jogos com turnos circulares

### CircularDoubleLinkedList
- ✅ Navegação circular bidirecional
- ✅ Editor de texto com histórico circular
- ✅ Carrossel de imagens (frente e trás)
- ✅ Estruturas que requerem volta ao início/fim automaticamente

---

## 🔍 Diferenças Principais

### Linear vs Circular

**Linear:**
```
head → [A] → [B] → [C] → null
```

**Circular:**
```
head → [A] → [B] → [C] → volta para head
       ↑_______________|
```

### Simples vs Dupla

**Simples:**
```
[A] → [B] → [C]
```

**Dupla:**
```
[A] ↔ [B] ↔ [C]
```

---

## 📝 Notas Importantes

1. **Iterator Circular**: Os iterators das listas circulares foram implementados com contador para evitar loops infinitos, parando após visitar todos os elementos exatamente uma vez.

2. **Método get() em DoubleLinkedList**: Implementado com otimização que escolhe a direção mais próxima (do head ou tail), reduzindo o número de iterações pela metade em média.

3. **Interface Consistency**: A interface `IDoubleLinkedList` foi corrigida para que `insertAt()` retorne `boolean`, mantendo consistência com a implementação.

---

## 👨‍💻 Autor
André - Estudos de Estrutura de Dados

## 📅 Data
Novembro de 2025
