export interface IStack<T> {

    push(value: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty() : boolean;
    size(): number;
    clear(): void;
    [Symbol.iterator](): Iterator<T>;
}