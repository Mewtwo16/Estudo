import { DoubleNode } from "./DoubleNode.js";
import type { ICircularDoubleLinkedList } from "./ICircularDoubleLinkedList.js";

export class CircularDoubleLinkedList<T> implements ICircularDoubleLinkedList<T>, Iterable<T>{
    
    private length = 0;
    private head: DoubleNode<T> | null = null;
    private tail: DoubleNode<T> | null = null;

    isEmpty(): boolean{
        return this.length === 0;
    }

    size(): number{
        return this.length;
    }

    peekFirst(): T | undefined {
        return this.head?.value;
    }

    peekLast(): T | undefined {
        return this.tail?.value;
    }

    add(value: T): void{
        const node = new DoubleNode(value);
        if(!this.head){
            this.head = this.tail = node;
            node.next = node;
            node.prev = node;
        } else {
            node.prev = this.tail;
            node.next = this.head;
            this.tail!.next = node;
            this.head.prev = node;
            this.tail = node;
        }
        this.length++;
    }

    insertAt(index: number, value: T): boolean{
        if(index < 0 || index > this.length) return false;

        if(index === 0){
            const node = new DoubleNode(value);
            if(!this.head){
                this.head = this.tail = node;
                node.next = node;
                node.prev = node;
            } else {
                node.next = this.head;
                node.prev = this.tail;
                this.head.prev = node;
                this.tail!.next = node;
                this.head = node;
            }
            this.length++;
            return true;
        }

        if(index === this.length){
            this.add(value);
            return true;
        }

        let curr: DoubleNode<T> | null;
        if(index < this.length / 2){
            curr = this.head;
            for(let i = 0; i < index; i++) 
                curr = curr!.next;
        } else {
            curr = this.tail;
            for(let i = this.length - 1; i > index; i--)
                curr = curr!.prev;
        }

        const prev = curr!.prev!;
        const node = new DoubleNode(value, prev, curr);
        prev.next = node;
        curr!.prev = node;
        this.length++;
        return true;
    }

    remove(value: T): boolean {
        if(!this.head) return false;

        if(this.head.value === value){
            if(this.length === 1){
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head!.prev = this.tail;
                this.tail!.next = this.head;
            }
            this.length--;
            return true;
        }

        let curr = this.head.next;
        let visited = 0;

        while(curr && visited < this.length - 1){
            if(curr.value === value){
                const prev = curr.prev!;
                const next = curr.next!;

                prev.next = next;
                next.prev = prev;

                if(curr === this.tail) {
                    this.tail = prev;
                }

                this.length--;
                return true;
            }
            curr = curr.next;
            visited++;
        }
        return false;
    }

    get(index: number): T | undefined {
        if(index < 0 || index >= this.length) return undefined;

        let curr: DoubleNode<T> | null;

        if(index < this.length / 2){
            curr = this.head;
            for(let i = 0; i < index; i++){
                curr = curr!.next;
            }
        } else {
            curr = this.tail;
            for(let i = this.length - 1; i > index; i--){
                curr = curr!.prev;
            }
        }

        return curr?.value;
    }

    clear(): void{
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    [Symbol.iterator](): Iterator<T> {
        let curr = this.head;
        let count = 0;
        const maxCount = this.length;
        
        return {
            next : () : IteratorResult<T> => {
                if(curr && count < maxCount){
                    const value = curr.value;
                    curr = curr.next;
                    count++;
                    return {value, done: false}
                }
                return {value: undefined as any, done: true}
            }
        }
    }

}
