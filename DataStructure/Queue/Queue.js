export class Queue {
    #data;
    #capacity;
    #size;

    #front;
    #back;

    constructor(cap = 8){
        if(!Number.isInteger(cap) || cap < 0) throw new Error("Initialization Error!");
        this.#capacity = cap;
        this.#init(cap);
    }
    size(){
        return this.#size;
    }
    isEmpty(){
        return !this.#size;
    }
    isFull(){
        return this.#size === this.#capacity;
    }
    clear(){
        if(this.isEmpty()) return;
        this.#init(this.#capacity);
    }

    enqueue(value){
        if(this.isFull()) this.#grow();
        this.#back =(this.#back + 1) % this.#capacity;
        this.#data[this.#back] = value;
        ++this.#size;
    }
    dequeue(){
        if(this.isEmpty()) throw new Error("Queue is already empty!");
        const value = this.#data[this.#front];
        this.#data[this.#front++] = undefined;
        this.#front %= this.#capacity;
        --this.#size;
        return value;
    }


    *[Symbol.iterator](){
        for(let i = 0; i < this.#size; ++i){
            yield this.#data[(this.#front + i) % this.#capacity];
        }
        return;
    }
    toArray(){
        const arr = new Array(this.#size);
        for(let i = 0; i < this.#size; ++i){
            arr[i] = this.#data[(this.#front + i) % this.#capacity];
        }
        return arr;
    }

    peekFront(){
        if(this.isEmpty()) throw new Error("Queue is empty!");
        return this.#data[this.#front];
    }
    peekBack(){
        if(this.isEmpty()) throw new Error("Queue is empty!");
        return this.#data[this.#back];
    }

    contains(value){
        for(let i = 0; i < this.#size; i++){
            if(this.#data[(this.#front + i) % this.#capacity] === value) return true;
        }
        return false;
    }

    drain(){
        const copyes = this.toArray();
        this.clear();
        return copyes;
    }
    debug(){
        const info = {
            data: [...this],
            front: this.#front,
            back: this.#back,
            size: this.#size,
            capacity: this.#capacity
        }
        return info;
    }

    #init(cap){
        this.#data = new Array(cap);
        this.#size = 0;
        this.#front = 0;
        this.#back = -1;
    }
    #grow(){
        const cap = this.#capacity * 2 || 1;
        const arr = new Array(cap);
        for(let i = 0; i < this.#size; ++i){
            arr[i] = this.#data[(this.#front + i) % this.#capacity];
        }
        this.#data = arr;
        this.#capacity = cap;
        this.#front = 0;
        this.#back = this.#size - 1; 
    }
}

const qu = new Queue();
qu.enqueue(8);
qu.enqueue(8);
qu.enqueue(8);
qu.enqueue(8);
console.log(qu.toArray());
console.log(qu.debug());