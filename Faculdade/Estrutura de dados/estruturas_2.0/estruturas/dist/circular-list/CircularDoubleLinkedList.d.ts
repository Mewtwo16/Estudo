import type { ICircularDoubleLinkedList } from "./ICircularDoubleLinkedList.js";
/**
 * Lista Duplamente Encadeada Circular
 *
 * Estrutura linear onde cada nó possui referências para o próximo e anterior.
 * O último nó (tail) aponta para o primeiro (head) e vice-versa, formando um círculo.
 *
 * Características:
 * - Navegação bidirecional (frente e trás)
 * - Acesso ao primeiro e último elemento em O(1)
 * - tail.next aponta para head e head.prev aponta para tail
 * - Otimização: busca pelo meio escolhe a direção mais próxima
 */
export declare class CircularDoubleLinkedList<T> implements ICircularDoubleLinkedList<T>, Iterable<T> {
    private length;
    private head;
    private tail;
    isEmpty(): boolean;
    size(): number;
    peekFirst(): T | undefined;
    peekLast(): T | undefined;
    /**
     * Adiciona um elemento no final da lista
     * Mantém as ligações circulares bidirecionais
     */
    add(value: T): void;
    /**
     * Insere um elemento em uma posição específica
     * Mantém a estrutura circular bidirecional
     */
    insertAt(index: number, value: T): boolean;
    /**
     * Remove a primeira ocorrência do valor
     * Mantém as ligações circulares após remoção
     */
    remove(value: T): boolean;
    /**
     * Retorna o elemento na posição especificada
     * Implementação otimizada que escolhe a direção mais próxima
     */
    get(index: number): T | undefined;
    clear(): void;
    /**
     * Iterator que percorre a lista circular
     * Para após visitar todos os elementos exatamente uma vez
     */
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=CircularDoubleLinkedList.d.ts.map