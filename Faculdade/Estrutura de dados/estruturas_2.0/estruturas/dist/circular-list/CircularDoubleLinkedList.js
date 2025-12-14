import { DoubleNode } from "./DoubleNode.js";
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
export class CircularDoubleLinkedList {
    length = 0;
    head = null;
    tail = null;
    isEmpty() {
        return this.length === 0;
    }
    size() {
        return this.length;
    }
    peekFirst() {
        return this.head?.value;
    }
    peekLast() {
        return this.tail?.value;
    }
    /**
     * Adiciona um elemento no final da lista
     * Mantém as ligações circulares bidirecionais
     */
    add(value) {
        const node = new DoubleNode(value);
        if (!this.head) {
            this.head = this.tail = node;
            node.next = node;
            node.prev = node;
        }
        else {
            node.prev = this.tail;
            node.next = this.head;
            this.tail.next = node;
            this.head.prev = node;
            this.tail = node;
        }
        this.length++;
    }
    /**
     * Insere um elemento em uma posição específica
     * Mantém a estrutura circular bidirecional
     */
    insertAt(index, value) {
        if (index < 0 || index > this.length)
            return false;
        if (index === 0) {
            const node = new DoubleNode(value);
            if (!this.head) {
                this.head = this.tail = node;
                node.next = node;
                node.prev = node;
            }
            else {
                node.next = this.head;
                node.prev = this.tail;
                this.head.prev = node;
                this.tail.next = node;
                this.head = node;
            }
            this.length++;
            return true;
        }
        if (index === this.length) {
            this.add(value);
            return true;
        }
        // Otimização: escolhe a direção mais próxima
        let curr;
        if (index < this.length / 2) {
            // Percorre a partir do head
            curr = this.head;
            for (let i = 0; i < index; i++)
                curr = curr.next;
        }
        else {
            // Percorre a partir do tail (reverso)
            curr = this.tail;
            for (let i = this.length - 1; i > index; i--)
                curr = curr.prev;
        }
        const prev = curr.prev;
        const node = new DoubleNode(value, prev, curr);
        prev.next = node;
        curr.prev = node;
        this.length++;
        return true;
    }
    /**
     * Remove a primeira ocorrência do valor
     * Mantém as ligações circulares após remoção
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
                this.head.prev = this.tail;
                this.tail.next = this.head;
            }
            this.length--;
            return true;
        }
        let curr = this.head.next;
        let visited = 0;
        // Percorre até encontrar o valor ou visitar todos os nós
        while (curr && visited < this.length - 1) {
            if (curr.value === value) {
                const prev = curr.prev;
                const next = curr.next;
                prev.next = next;
                next.prev = prev;
                if (curr === this.tail) {
                    this.tail = prev;
                }
                this.length--;
                return true;
            }
            curr = curr.next;
            visited++;
        }
        return false;
    }
    /**
     * Retorna o elemento na posição especificada
     * Implementação otimizada que escolhe a direção mais próxima
     */
    get(index) {
        if (index < 0 || index >= this.length)
            return undefined;
        let curr;
        // Otimização: escolhe a direção mais próxima
        if (index < this.length / 2) {
            // Percorre a partir do head (frente)
            curr = this.head;
            for (let i = 0; i < index; i++) {
                curr = curr.next;
            }
        }
        else {
            // Percorre a partir do tail (trás)
            curr = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                curr = curr.prev;
            }
        }
        return curr?.value;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
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
//# sourceMappingURL=CircularDoubleLinkedList.js.map