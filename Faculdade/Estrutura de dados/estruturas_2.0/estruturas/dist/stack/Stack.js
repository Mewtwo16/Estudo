import { Nodes } from "./Nodes.js";
export class Stack {
    head = null;
    length = 0;
    push(value) {
        this.head = new Nodes(value, this.head);
        this.length++;
    }
    pop() {
        if (!this.head)
            return undefined;
        const { value } = this.head;
        this.head = this.head.next;
        this.length--;
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
//# sourceMappingURL=Stack.js.map