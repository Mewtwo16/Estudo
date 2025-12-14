export class DoubleNode<T>{

    constructor(
        public value: T,
        public prev: DoubleNode<T> | null = null,
        public next: DoubleNode<T> | null = null
    ){}

}