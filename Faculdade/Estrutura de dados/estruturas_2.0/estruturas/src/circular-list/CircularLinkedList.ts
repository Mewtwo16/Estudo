import type { ICircularLinkedList } from "./ICircularLinkedList.js";
import { Nodes } from "./Nodes.js";

export class CircularLinkedList<T> implements 
    ICircularLinkedList<T>, Iterable<T>{

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
                node.next = node; 
            } else {
                node.next = this.head; 
                this.tail!.next = node; 
                this.tail = node; 
            }
            this.length++;
        }

        insertAt(index: number, value : T): boolean {
            if(index < 0 || index > this.length) 
                return false;

            if(index === 0){
                const node = new Nodes(value);
                if(!this.head){
                    this.head = this.tail = node;
                    node.next = node;
                } else {
                    node.next = this.head;
                    this.head = node;
                    this.tail!.next = this.head;
                }
                this.length++;
                return true;
            }

            if(index === this.length){
                this.add(value);
                return true;
            }

            let prev = this.head!;
            for(let i = 0; i < index - 1; i++){
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
                if(this.length === 1){
                    this.head = null;
                    this.tail = null;
                } else {
                    this.head = this.head.next;
                    this.tail!.next = this.head;
                }
                this.length--;
                return true;
            }

            let prev = this.head;
            let curr = this.head.next;

            for(let i = 0; i < this.length - 1; i++){
                if(curr!.value === value){
                    prev.next = curr!.next;
                    if(curr === this.tail) {
                        this.tail = prev;
                    }
                    this.length--;
                    return true;
                }
                prev = curr!;
                curr = curr!.next;
            }

            return false;
        }

        get(index: number): T | undefined {
            if(index < 0 || index >= this.length) return undefined;

            let curr = this.head;
            for(let i = 0; i < index; i++){
                curr = curr!.next;
            }

            return curr?.value;
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
