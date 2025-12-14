import type { ILinkedList } from "./ILinkedList.js";
export declare class LinkedList<T> implements ILinkedList<T>, Iterable<T> {
    private head;
    private tail;
    private length;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    peekFirst(): T | undefined;
    peekLast(): T | undefined;
    add(value: T): void;
    insertAt(index: number, value: T): boolean;
    remove(value: T): boolean;
    get(index: number): T | undefined;
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=LinkedList.d.ts.map