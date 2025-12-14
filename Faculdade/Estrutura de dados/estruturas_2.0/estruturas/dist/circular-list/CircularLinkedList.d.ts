import type { ICircularLinkedList } from "./ICircularLinkedList.js";
/**
 * Lista Encadeada Circular
 *
 * Estrutura linear onde cada nó aponta para o próximo, e o último nó (tail)
 * aponta de volta para o primeiro (head), formando um círculo.
 *
 * Características:
 * - Acesso ao primeiro e último elemento em O(1)
 * - Não há ponteiro null no final, o tail.next aponta para head
 * - Útil para implementar buffers circulares e round-robin
 */
export declare class CircularLinkedList<T> implements ICircularLinkedList<T>, Iterable<T> {
    private head;
    private tail;
    private length;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    peekFirst(): T | undefined;
    peekLast(): T | undefined;
    /**
     * Adiciona um elemento no final da lista
     * Mantém a propriedade circular: tail.next sempre aponta para head
     */
    add(value: T): void;
    /**
     * Insere um elemento em uma posição específica
     * Mantém a estrutura circular após inserção
     */
    insertAt(index: number, value: T): boolean;
    /**
     * Remove a primeira ocorrência do valor
     * Mantém a estrutura circular após remoção
     */
    remove(value: T): boolean;
    /**
     * Retorna o elemento na posição especificada
     */
    get(index: number): T | undefined;
    /**
     * Iterator que percorre a lista circular
     * Para após visitar todos os elementos exatamente uma vez
     */
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=CircularLinkedList.d.ts.map