import type { IStack } from "./IStack.js";
export declare class Stack<T> implements IStack<T>, Iterable<T> {
    private head;
    private length;
    push(value: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=Stack.d.ts.map