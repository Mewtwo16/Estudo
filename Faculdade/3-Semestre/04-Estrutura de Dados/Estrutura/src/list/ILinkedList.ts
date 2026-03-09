export interface ILinkedList<T> {

    isEmpty(): boolean;
    size(): number;
    peekFirst(): T | undefined;
    peekLast(): T | undefined;
    get(index: number): T | undefined;

    add(value: T): void;
    insertAt(value: T): void;

    remove(value: T): void;


    [Symbol.iterator]():Iterator<T>;

}