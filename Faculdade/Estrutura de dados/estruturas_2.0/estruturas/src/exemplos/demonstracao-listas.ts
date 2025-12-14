/**
 * Demonstração das Estruturas de Lista Encadeada
 * 
 * Este arquivo apresenta exemplos práticos de uso de cada tipo de lista:
 * - Lista Encadeada (LinkedList)
 * - Lista Duplamente Encadeada (DoubleLinkedList)
 * - Lista Encadeada Circular (CircularLinkedList)
 * - Lista Duplamente Encadeada Circular (CircularDoubleLinkedList)
 */

import { LinkedList } from "../list/LinkedList.js";
import { DoubleLinkedList } from "../list/DoubleLinkedList.js";
import { CircularLinkedList } from "../circular-list/CircularLinkedList.js";
import { CircularDoubleLinkedList } from "../circular-list/CircularDoubleLinkedList.js";

console.log("═".repeat(70));
console.log("  DEMONSTRAÇÃO: ESTRUTURAS DE DADOS - LISTAS ENCADEADAS");
console.log("═".repeat(70));

// ============================================================================
// 1. LISTA ENCADEADA (LinkedList)
// ============================================================================
console.log("\n" + "─".repeat(70));
console.log("1️⃣  LISTA ENCADEADA (LinkedList)");
console.log("─".repeat(70));

const lista = new LinkedList<number>();

console.log("\n📍 Operações básicas:");
console.log(`Lista vazia? ${lista.isEmpty()}`);

lista.add(10);
lista.add(20);
lista.add(30);
console.log(`\nApós adicionar 10, 20, 30:`);
console.log(`Tamanho: ${lista.size()}`);
console.log(`Primeiro elemento: ${lista.peekFirst()}`);
console.log(`Último elemento: ${lista.peekLast()}`);

console.log(`\n📍 Acesso por índice (método get):`);
console.log(`get(0) = ${lista.get(0)}`);
console.log(`get(1) = ${lista.get(1)}`);
console.log(`get(2) = ${lista.get(2)}`);

lista.insertAt(1, 15);
console.log(`\n📍 Após insertAt(1, 15):`);
console.log(`Lista:`, [...lista]);

lista.remove(20);
console.log(`\n📍 Após remove(20):`);
console.log(`Lista:`, [...lista]);

console.log(`\n📍 Iteração com for...of:`);
for (const valor of lista) {
    console.log(`  → ${valor}`);
}

// ============================================================================
// 2. LISTA DUPLAMENTE ENCADEADA (DoubleLinkedList)
// ============================================================================
console.log("\n" + "─".repeat(70));
console.log("2️⃣  LISTA DUPLAMENTE ENCADEADA (DoubleLinkedList)");
console.log("─".repeat(70));

const listaDupla = new DoubleLinkedList<string>();

console.log("\n📍 Adicionando elementos:");
listaDupla.add("A");
listaDupla.add("B");
listaDupla.add("C");
listaDupla.add("D");
listaDupla.add("E");

console.log(`Lista:`, [...listaDupla]);
console.log(`Tamanho: ${listaDupla.size()}`);

console.log(`\n📍 Busca otimizada com get():`);
console.log(`get(0) = ${listaDupla.get(0)} (busca do início)`);
console.log(`get(4) = ${listaDupla.get(4)} (busca do fim - OTIMIZADO)`);
console.log(`get(2) = ${listaDupla.get(2)} (busca do início)`);

listaDupla.insertAt(2, "B.5");
console.log(`\n📍 Após insertAt(2, "B.5"):`);
console.log(`Lista:`, [...listaDupla]);

listaDupla.remove("C");
console.log(`\n📍 Após remove("C"):`);
console.log(`Lista:`, [...listaDupla]);

console.log(`\n📍 Vantagem da Lista Dupla:`);
console.log(`  ✓ Navegação bidirecional`);
console.log(`  ✓ Remoção sem precisar de ponteiro anterior`);
console.log(`  ✓ Busca otimizada (escolhe direção mais próxima)`);

// ============================================================================
// 3. LISTA ENCADEADA CIRCULAR (CircularLinkedList)
// ============================================================================
console.log("\n" + "─".repeat(70));
console.log("3️⃣  LISTA ENCADEADA CIRCULAR (CircularLinkedList)");
console.log("─".repeat(70));

const listaCircular = new CircularLinkedList<string>();

console.log("\n📍 Simulando playlist em loop:");
listaCircular.add("🎵 Música 1");
listaCircular.add("🎵 Música 2");
listaCircular.add("🎵 Música 3");

console.log(`\nPlaylist (${listaCircular.size()} músicas):`);
console.log([...listaCircular]);

console.log(`\n📍 Reprodução em loop (10 iterações):`);
for (let i = 0; i < 10; i++) {
    const index = i % listaCircular.size();
    console.log(`  ${i + 1}. ${listaCircular.get(index)}`);
}

console.log(`\n📍 Características da Lista Circular:`);
console.log(`  ✓ tail.next aponta para head`);
console.log(`  ✓ Não há ponteiros null`);
console.log(`  ✓ Ideal para processos cíclicos`);
console.log(`  ✓ Iterator para após visitar todos os elementos uma vez`);

// Demonstração do round-robin
console.log(`\n📍 Exemplo: Round-Robin com processos:`);
const processos = new CircularLinkedList<string>();
processos.add("Processo A");
processos.add("Processo B");
processos.add("Processo C");

console.log(`\nEscalonamento Round-Robin (8 turnos):`);
for (let turno = 0; turno < 8; turno++) {
    const index = turno % processos.size();
    console.log(`  Turno ${turno + 1}: ${processos.get(index)}`);
}

// ============================================================================
// 4. LISTA DUPLAMENTE ENCADEADA CIRCULAR (CircularDoubleLinkedList)
// ============================================================================
console.log("\n" + "─".repeat(70));
console.log("4️⃣  LISTA DUPLAMENTE ENCADEADA CIRCULAR (CircularDoubleLinkedList)");
console.log("─".repeat(70));

const listaCircularDupla = new CircularDoubleLinkedList<string>();

console.log("\n📍 Simulando navegação de janelas (Alt+Tab):");
listaCircularDupla.add("🌐 Navegador");
listaCircularDupla.add("📝 Editor de Código");
listaCircularDupla.add("💻 Terminal");
listaCircularDupla.add("📧 Email");

console.log(`\nJanelas abertas (${listaCircularDupla.size()}):`);
console.log([...listaCircularDupla]);

console.log(`\n📍 Navegação para frente (Alt+Tab):`);
for (let i = 0; i < 6; i++) {
    const index = i % listaCircularDupla.size();
    console.log(`  ${i + 1}. ${listaCircularDupla.get(index)}`);
}

console.log(`\n📍 Busca otimizada em lista circular dupla:`);
console.log(`get(0) = ${listaCircularDupla.get(0)} (do início)`);
console.log(`get(3) = ${listaCircularDupla.get(3)} (do fim - OTIMIZADO)`);
console.log(`get(1) = ${listaCircularDupla.get(1)} (do início)`);

listaCircularDupla.remove("💻 Terminal");
console.log(`\n📍 Após fechar o Terminal:`);
console.log(`Janelas:`, [...listaCircularDupla]);

console.log(`\n📍 Características da Lista Circular Dupla:`);
console.log(`  ✓ tail.next = head e head.prev = tail`);
console.log(`  ✓ Navegação bidirecional com wrap`);
console.log(`  ✓ Busca otimizada (escolhe caminho mais curto)`);
console.log(`  ✓ Máxima flexibilidade de navegação`);

// ============================================================================
// 5. COMPARAÇÃO DE DESEMPENHO
// ============================================================================
console.log("\n" + "─".repeat(70));
console.log("5️⃣  COMPARAÇÃO DE DESEMPENHO");
console.log("─".repeat(70));

console.log("\n📊 Complexidade Temporal:");
console.log("┌─────────────────────┬──────────────┬──────────────────┬──────────────────────┐");
console.log("│ Operação            │ LinkedList   │ DoubleLinkedList │ CircularDoubleLinked │");
console.log("├─────────────────────┼──────────────┼──────────────────┼──────────────────────┤");
console.log("│ add (fim)           │ O(1)         │ O(1)             │ O(1)                 │");
console.log("│ insertAt (meio)     │ O(n)         │ O(n/2) ⚡        │ O(n/2) ⚡            │");
console.log("│ get (índice)        │ O(n)         │ O(n/2) ⚡        │ O(n/2) ⚡            │");
console.log("│ remove              │ O(n)         │ O(n)             │ O(n)                 │");
console.log("│ peekFirst/Last      │ O(1)         │ O(1)             │ O(1)                 │");
console.log("└─────────────────────┴──────────────┴──────────────────┴──────────────────────┘");

console.log("\n💡 Quando usar cada estrutura:");
console.log("\n  LinkedList:");
console.log("    ✓ Percorrer apenas para frente");
console.log("    ✓ Inserções/remoções no início ou fim");
console.log("    ✓ Economia de memória");

console.log("\n  DoubleLinkedList:");
console.log("    ✓ Navegação bidirecional");
console.log("    ✓ Buscas que podem ser otimizadas");
console.log("    ✓ Remoções frequentes no meio");

console.log("\n  CircularLinkedList:");
console.log("    ✓ Processos cíclicos (round-robin)");
console.log("    ✓ Buffers circulares");
console.log("    ✓ Playlists em loop");

console.log("\n  CircularDoubleLinkedList:");
console.log("    ✓ Navegação bidirecional com wrap");
console.log("    ✓ Carrosséis de imagens");
console.log("    ✓ Histórico com navegação circular");

console.log("\n" + "═".repeat(70));
console.log("  FIM DA DEMONSTRAÇÃO");
console.log("═".repeat(70) + "\n");
