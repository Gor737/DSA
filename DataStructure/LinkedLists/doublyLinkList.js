class Node {
    constructor(val){
        this.val = val ?? null;
        this.next = null;
        this.prev = null;
    }
}
class DLL {
    #head = null;
    #tail = null;
    #size;

    constructor(){
        this.#size = 0;
    }
    isEmpty(){
        return this.#size === 0;
    }
    clear(){
        if(this.isEmpty()) return;
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }
    pushFront(node){
        if(!(node instanceof Node)) throw new Error("Node type error");
        if(!this.#head){
            this.#head = node;
            this.#tail = node;
        }else{
            node.next = this.#head;
            this.#head.prev = node;
            this.#head = node;
        }
        ++this.#size;
    }
    popFront(){
        if(this.isEmpty()) throw new Error("Your list already empty!");
            let value = this.#head.val;
            if(this.#tail !== this.#head){
                this.#head = this.#head.next;
                this.#head.prev = null;
            }else{
                this.#head = null;
                this.#tail = null;
            }
            --this.#size;
            return value;
    }
    pushBack(node){
        if(!(node instanceof Node)) throw new Error("Node type error");
        if(!this.#head){
            this.#head = node;
            this.#tail = node;
        }else{
            node.prev = this.#tail;
            this.#tail.next = node;
            this.#tail = this.#tail.next;
        }
        ++this.#size;
    }
    popBack(){
        if(this.isEmpty()) throw new Error("Your list already empty!");
        let value = this.#tail.val;
        if(this.#tail !== this.#head) {
            this.#tail = this.#tail.prev;
            this.#tail.next = null;
        }else{
            this.#head = null;
            this.#tail = null;
        }
        --this.#size;
        return value;
    }
    getMid(){
        if(!this.#head || !this.#head.next) return this.#head;
        let start = this.#head;
        let end = this.#tail;
        while(start !== end && start.next !== end){
            start = start.next;
            end = end.prev;
        }
        return start;
    }
    at(position){
        if(!Number.isInteger(position)) throw new Error("Position type error");
        if(position > this.#size || position < 1) throw new Error("Invalid position!");
        let start = this.#head;
        while(position-- > 1){
            start = start.next;
        }
        return start;
    }
    insert(position, value){
        if(!Number.isInteger(position)) throw new Error("Position type error");
        if(position > this.#size + 1 || position < 1) throw new Error("Invalid position!");
        const node = new Node(value);
        if(position === 1) this.pushFront(node);
        else if(position === this.#size + 1) this.pushBack(node);
        else{
            let start = this.#head;
            while(position-- > 1){
                start = start.next;
            }
            node.prev = start.prev;
            node.next = start;
            start.prev.next = node;
            start.prev = node;
            ++this.#size;
        }
    }
    erase(position){
        if(!Number.isInteger(position)) throw new Error("Position type error");
        if(position > this.#size || position < 1) throw new Error("Invalid position!");
        if(position === 1) return this.popFront();
        else if(position === this.#size) return this.popBack();
        else {
            let start = this.#head;
            while(position-- > 1){
                start = start.next;
            }
            let tmp = start;
            start.prev.next = start.next;
            start.next.prev = start.prev;
            --this.#size;
            return tmp.val;
        }
    }
    reverse(){
        if(this.#size < 2) return this.#head;
        this.#head = this.#tail;
        while(this.#tail.prev){
            let tmp = this.#tail.next;
            this.#tail.next = this.#tail.prev;
            this.#tail.prev = tmp;
            this.#tail = this.#tail.next;
        }
        let tmp = this.#tail.next;
        this.#tail.next = this.#tail.prev;
        this.#tail.prev = tmp;
        return this.#head;
    }
    toArray(){
        if(this.isEmpty()) return [];
        const res = new Array(this.#size);
        let idx = 0;
        let start = this.#head;
        while(start){
            res[idx++] = start.val;
            start = start.next;
        }
        return res;
    }
    *[Symbol.iterator](){
        let start = this.#head;
        while(start){
            yield start.val;
            start = start.next;
        }
        return;
    }
    *entries(){
        let start = this.#head;
        let position = 1;
        while(start){
            yield [position++, start.val];
            start = start.next;
        }
        return;
    }
}
