import { Nodes } from "./Nodes.js";
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
export class CircularLinkedList {
    head = null;
    tail = null;
    length = 0;
    isEmpty() {
        return this.length === 0;
    }
    size() {
        return this.length;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    peekFirst() {
        return this.head?.value;
    }
    peekLast() {
        return this.tail?.value;
    }
    /**
     * Adiciona um elemento no final da lista
     * Mantém a propriedade circular: tail.next sempre aponta para head
     */
    add(value) {
        const node = new Nodes(value);
        if (!this.head) {
            this.head = this.tail = node;
            node.next = node; // Aponta para si mesmo
        }
        else {
            node.next = this.head; // Novo nó aponta para head
            this.tail.next = node; // Tail aponta para novo nó
            this.tail = node; // Atualiza tail
        }
        this.length++;
    }
    /**
     * Insere um elemento em uma posição específica
     * Mantém a estrutura circular após inserção
     */
    insertAt(index, value) {
        if (index < 0 || index > this.length)
            return false;
        if (index === 0) {
            const node = new Nodes(value);
            if (!this.head) {
                this.head = this.tail = node;
                node.next = node;
            }
            else {
                node.next = this.head;
                this.head = node;
                this.tail.next = this.head; // Mantém circularidade
            }
            this.length++;
            return true;
        }
        if (index === this.length) {
            this.add(value);
            return true;
        }
        let prev = this.head;
        for (let i = 0; i < index - 1; i++) {
            prev = prev.next;
        }
        const node = new Nodes(value, prev.next);
        prev.next = node;
        this.length++;
        return true;
    }
    /**
     * Remove a primeira ocorrência do valor
     * Mantém a estrutura circular após remoção
     */
    remove(value) {
        if (!this.head)
            return false;
        // Remove head
        if (this.head.value === value) {
            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            }
            else {
                this.head = this.head.next;
                this.tail.next = this.head; // Mantém circularidade
            }
            this.length--;
            return true;
        }
        let prev = this.head;
        let curr = this.head.next;
        // Percorre até encontrar o valor ou voltar ao head
        for (let i = 0; i < this.length - 1; i++) {
            if (curr.value === value) {
                prev.next = curr.next;
                if (curr === this.tail) {
                    this.tail = prev;
                }
                this.length--;
                return true;
            }
            prev = curr;
            curr = curr.next;
        }
        return false;
    }
    /**
     * Retorna o elemento na posição especificada
     */
    get(index) {
        if (index < 0 || index >= this.length)
            return undefined;
        let curr = this.head;
        for (let i = 0; i < index; i++) {
            curr = curr.next;
        }
        return curr?.value;
    }
    /**
     * Iterator que percorre a lista circular
     * Para após visitar todos os elementos exatamente uma vez
     */
    [Symbol.iterator]() {
        let curr = this.head;
        let count = 0;
        const maxCount = this.length;
        return {
            next: () => {
                if (curr && count < maxCount) {
                    const value = curr.value;
                    curr = curr.next;
                    count++;
                    return { value, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}
//# sourceMappingURL=CircularLinkedList.js.map