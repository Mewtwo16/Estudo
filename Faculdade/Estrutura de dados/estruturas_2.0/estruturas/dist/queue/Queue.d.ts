import type { IQueue } from "./IQueue.js";
export declare class Queue<T> implements IQueue<T>, Iterable<T> {
    private head;
    private tail;
    private length;
    enqueue(value: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=Queue.d.ts.map