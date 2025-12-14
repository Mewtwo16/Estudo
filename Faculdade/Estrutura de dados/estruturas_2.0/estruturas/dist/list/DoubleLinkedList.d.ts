import type { IDoubleLinkedList } from "./IDoubleLinkedList.js";
export declare class DoubleLinkedList<T> implements IDoubleLinkedList<T>, Iterable<T> {
    private length;
    private head;
    private tail;
    isEmpty(): boolean;
    size(): number;
    peekFirst(): T | undefined;
    peekLast(): T | undefined;
    add(value: T): void;
    insertAt(index: number, value: T): boolean;
    remove(value: T): boolean;
    clear(): void;
    /**
     * Retorna o elemento na posição especificada
     * Implementação otimizada que escolhe a direção mais próxima
     */
    get(index: number): T | undefined;
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=DoubleLinkedList.d.ts.map