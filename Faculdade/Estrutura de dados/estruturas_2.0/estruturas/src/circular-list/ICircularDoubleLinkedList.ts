export interface ICircularDoubleLinkedList<T> {

    isEmpty(): boolean;
    size(): number;
    peekFirst(): T | undefined;
    peekLast(): T | undefined;
    get(index: number): T | undefined;
    clear(): void;

    add(value: T): void;
    insertAt(index: number, value: T): boolean;
    remove(value: T): boolean;

    [Symbol.iterator]():Iterator<T>;
}
