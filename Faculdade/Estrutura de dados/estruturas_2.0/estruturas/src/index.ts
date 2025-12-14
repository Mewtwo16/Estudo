import type { IQueue } from "./queue/IQueue.js";
import { Queue } from "./queue/Queue.js";
import type { IStack } from "./stack/IStack.js";
import { Stack } from "./stack/Stack.js";

// Exportações das Estruturas Lineares
// Lista Encadeada
export { LinkedList } from "./list/LinkedList.js";
export { DoubleLinkedList } from "./list/DoubleLinkedList.js";
export type { ILinkedList } from "./list/ILinkedList.js";
export type { IDoubleLinkedList } from "./list/IDoubleLinkedList.js";

// Listas Circulares
export { CircularLinkedList } from "./circular-list/CircularLinkedList.js";
export { CircularDoubleLinkedList } from "./circular-list/CircularDoubleLinkedList.js";
export type { ICircularLinkedList } from "./circular-list/ICircularLinkedList.js";
export type { ICircularDoubleLinkedList } from "./circular-list/ICircularDoubleLinkedList.js";

// Pilha e Fila
export { Stack } from "./stack/Stack.js";
export { Queue } from "./queue/Queue.js";
export type { IStack } from "./stack/IStack.js";
export type { IQueue } from "./queue/IQueue.js";


/*
const pilha: IStack<number> = new Stack<number>();

console.log("PILHA INICIADA");

console.log("Está vazia? ",pilha.isEmpty());

//Empilhar elementos
pilha.push(10);
pilha.push(20);
pilha.push(30);

console.log("\nPilha após empilhar 10 20 30");
console.log("Topo: ",pilha.peek());
console.log("Tamanho: ",pilha.size());

for(const valor of pilha){
    console.log("->",valor);
}

//Desempilhar
console.log("Pop: ",pilha.pop());
console.log("Pop: ",pilha.pop());

console.log("Está vazia? ",pilha.isEmpty());

console.log("Topo: ",pilha.peek());
console.log("Tamanho: ",pilha.size());

console.log("Pop: ",pilha.pop());
console.log("Pop: ",pilha.pop());

console.log("Está vazia? ",pilha.isEmpty());

for(const valor of pilha){
    console.log("->",valor);
}

console.log("Topo: ",pilha.peek());
console.log("Tamanho: ",pilha.size());
*/

const fila: IQueue<number> = 
    new Queue<number>();

fila.enqueue(10);
fila.enqueue(20);
fila.enqueue(30);

for(const valor of fila){
    console.log("posição -> ", valor);
}

console.log("saindo fila: ",fila.dequeue());
console.log("saindo fila: ",fila.dequeue());

for(const valor of fila){
    console.log("posição -> ", valor);
}