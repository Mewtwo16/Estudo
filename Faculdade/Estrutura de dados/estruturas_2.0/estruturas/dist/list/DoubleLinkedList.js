import { DoubleNode } from "./DoubleNode.js";
export class DoubleLinkedList {
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
    add(value) {
        const node = new DoubleNode(value);
        if (!this.head) {
            this.head = this.tail = node;
        }
        else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }
    insertAt(index, value) {
        if (index < 0 || index >= this.length)
            return false;
        if (index === 0) {
            const node = new DoubleNode(value, null, this.head);
            if (this.head)
                this.head.prev = node;
            this.head = node;
            if (!this.tail)
                this.tail = node;
            this.length++;
            return true;
        }
        if (index === this.length) {
            this.add(value);
            return true;
        }
        let curr;
        if (index < this.length / 2) {
            curr = this.head;
            for (let i = 0; i < index; i++)
                curr = curr.next;
        }
        else {
            curr = this.tail;
            for (let i = this.length - 1; i >= index; i--)
                curr = curr.prev;
        }
        const prev = curr.prev;
        const node = new DoubleNode(value, prev, curr);
        prev.next = node;
        curr.prev = node;
        this.length++;
        return true;
    }
    remove(value) {
        if (!this.head)
            return false;
        if (this.head.value === value) {
            this.head = this.head.next;
            if (this.head)
                this.head.prev = null;
            else
                this.tail = null;
            this.length--;
            return true;
        }
        let curr = this.head.next;
        while (curr) {
            if (curr.value === value) {
                const prev = curr.prev;
                const next = curr.next;
                prev.next = next;
                if (next)
                    next.prev = prev;
                else
                    this.tail = prev;
                this.length--;
                return true;
            }
            curr = curr.next;
        }
        return false;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
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
    [Symbol.iterator]() {
        let curr = this.head;
        return {
            next: () => {
                if (curr) {
                    const value = curr.value;
                    curr = curr.next;
                    return { value, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}
//# sourceMappingURL=DoubleLinkedList.js.map