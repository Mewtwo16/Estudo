import type { IStack } from "./IStack.js";
import { Nodes } from "./Nodes.js";

export class Stack<T> implements IStack<T>, Iterable<T>{
  
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

    private head: Nodes<T> | null = null;
    private length = 0;

    push(value: T): void{
        this.head = new Nodes(value, this.head);
        this.length++;
    }

    pop(): T | undefined{
        if(!this.head) return undefined;
        const {value} = this.head;
        this.head = this.head.next;
        this.length--;
        return value;
    }

    peek(): T | undefined{
        return this.head?.value;
    }

    isEmpty() : boolean{
        return this.length === 0;
    }

    size(): number{
        return this.length;
    }

    clear(): void{
        this.head = null;
        this.length = 0;
    }

}