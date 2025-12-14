import { Nodes } from "./Nodes.js";
export class LinkedList {
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
    add(value) {
        const node = new Nodes(value);
        if (!this.head) {
            this.head = this.tail = node;
        }
        else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }
    insertAt(index, value) {
        if (index < 0 || index > this.length)
            return false;
        if (index === 0) {
            const node = new Nodes(value, this.head);
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
        let prev = this.head;
        for (let i = 0; i < index; i++) {
            prev = prev.next;
        }
        const node = new Nodes(value, prev.next);
        prev.next = node;
        this.length++;
        return true;
    }
    remove(value) {
        if (!this.head)
            return false;
        if (this.head.value === value) {
            this.head = this.head.next;
            this.length--;
            if (!this.head)
                this.tail = null;
            return true;
        }
        let prev = this.head;
        let curr = this.head.next;
        while (curr) {
            if (curr.value === value) {
                prev.next = curr.next;
                if (curr === this.tail)
                    this.tail = prev;
                this.length--;
                return true;
            }
            prev = curr;
            curr = curr.next;
        }
        return false;
    }
    get(index) {
        if (index < 0 || index >= this.length)
            return undefined;
        let i = 0;
        let curr = this.head;
        while (curr && i < index) {
            curr = curr.next;
            i++;
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
//# sourceMappingURL=LinkedList.js.map