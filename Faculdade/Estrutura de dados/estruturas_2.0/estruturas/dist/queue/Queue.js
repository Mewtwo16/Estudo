import { Nodes } from "./Nodes.js";
export class Queue {
    head = null;
    tail = null;
    length = 0;
    enqueue(value) {
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
    dequeue() {
        if (!this.head)
            return undefined;
        const { value } = this.head;
        this.head = this.head.next;
        this.length--;
        if (!this.head)
            this.tail = null;
        return value;
    }
    peek() {
        return this.head?.value;
    }
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
//# sourceMappingURL=Queue.js.map