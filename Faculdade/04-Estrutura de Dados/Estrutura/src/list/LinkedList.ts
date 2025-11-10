import type { ILinkedList } from "./ILinkedList.js";
import { Nodes } from "./Nodes.js";

export class LinkedList<T> implements 
    ILinkedList<T>, Iterable<T>{

        private head: Nodes<T> | null = null;
        private tail: Nodes<T> | null = null;
        private length = 0;

        isEmpty(): boolean {
            return this.length === 0;
        }

        size(): number {
            return this.length;
        }

        clear(): void {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }

        peekFirst(): T | undefined {
            return this.head?.value
        }

        peekLast(): T | undefined {
            return this.tail?.value;
        }

        add(value: T): void {
            const node = new Nodes(value);
            if(!this.head){
                this.head = this.tail = node;
            } else {
                this.tail!.next = node;
                this.tail = node;
            }
            this.length++;
        }

        insertAt(index: number, value : T): boolean {
            if(index < 0 ||index > this.length) 
                return false;

            if(index === 0){
                const node = new Nodes(value, this.head!);
                this.head = node;
                if(!this.tail)
                    this.tail = node;
                this.length++;
                return true;
            }

            if(index === this.length){
                this.add(value);
                return true;
            }

            let prev  = this.head!;
            for(let i=0; i<index; i++){
                prev = prev.next!;
            }

            const node = new Nodes(value, prev.next);
            prev.next = node;
            this.length++;
            return true;
        }

        remove(value: T): boolean {
            
            if(!this.head) return false;

            if(this.head.value === value){
                this.head = this.head!.next;
                this.length--;
                if(!this.head) this.tail=null;
                return true;
            }

            let prev = this.head;
            let curr = this.head.next;

            while(curr){
                if(curr.value === value){
                    prev.next = curr.next;
                    if(curr === this.tail) 
                        this.tail = prev;
                    this.length--;
                    return true;
                }
                prev = curr;
                curr = curr.next;
            }

            return false;

        }

        [Symbol.iterator](): Iterator<T> {
        let curr = this.head;
        return {
            next : () : IteratorResult<T> => {
                if(curr){
                    const value = curr.value;
                    curr = curr.next;
                    return {value, done: false}
                }
                return {value: undefined as any, done: true}
            }
        }
    }

}
