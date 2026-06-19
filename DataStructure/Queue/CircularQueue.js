import { DArray } from "../DynamicArray.js";

class CircularQueue {
    #data;
    #front;
    #back;


    constructor(initialCapacity = 8) {
        this.#init(initialCapacity);
    }

    /* ================= Basic State ================= */

    size() {
        return this.#data.size;
    }

    capacity() {
        return this.#data.capacity;
    }

    isEmpty() {
        return !this.#data.size;
    }

    clear() {
        this.#init(this.capacity());
    }

    /* ================= Core Queue Operations ================= */

    enqueue(value) {
        if(this.size() === this.capacity()) this.#grow();

        this.#back = ++this.#back % this.capacity();         // (this.#back + 1) % this.capacity -----> my custom method
        this.#data.write(this.#back, value);
        ++this.#data.size;
    }

    dequeue() {
        if(this.isEmpty()) throw new Error("Queue is empty!");
        let value = this.#data.read(this.#front);
        this.#data.write(this.#front, undefined);
        this.#front = ++this.#front % this.capacity();
        --this.#data.size;
        return value;
    }

    front() {
        if(this.isEmpty()) throw new Error("Queue is empty!");
        return this.#data.read(this.#front);
    }

    back() {
        if(this.isEmpty()) throw new Error("Queue is empty!");
        return this.#data.read(this.#back);
    }

    /* ================= Internal Resize ================= */

    #grow() {
        const newCap = this.#data.capacity * 2;
        const newArr = new Array(newCap);
        
        let offset = 0;
        let size = this.#data.size;

        //my custom method 
        for(let i = this.#front, j = this.#back; offset < size / 2; ++offset){
            newArr[offset] = this.#data.read((i + offset) % size);
            newArr[size - offset - 1] = this.#data.read((j - offset + size) % size);
        }

        this.#front = 0;
        this.#back = this.#data.size - 1;
        this.#data.replace(newArr);
        this.#data.capacity = newCap;
    }

    /* ================= Utilities ================= */

    toArray() {
        if(this.isEmpty()) return [];
        const arr = new Array(this.#data.size);
        let length = this.#data.size;
        for(let i = this.#front, j = 0; length--; ++j){
            let rare = (i + j) % this.capacity();

            arr[j] = this.#data.read(rare);
        }
        return arr;
    }

    toString() {
        const arr = this.toArray();
        let str = "";
        for(let i = 0; i < arr.length; ++i){
            str += arr[i];
        }
        return str;
    }

    [Symbol.iterator]() {
        let start = this.#front;
        let length = this.#data.size;
        return {
            next: () => {
                if(length--){
                    return {value: this.#data.read(start++ % this.capacity()), done: false}
                }else return {done: true};
            }
        }
    }
    #init(initialCapacity){
        if(typeof initialCapacity !== 'number' || !Number.isFinite(initialCapacity)) throw new Error('Capacity type Error');
        if(initialCapacity <= 0) throw new Error('Capacity negative Error');
        
        this.#data = new DArray(initialCapacity);
        this.#front = 0;
        this.#back = -1;
    }

}



                                            //TESTS
const q = new CircularQueue(3);
const ref = [];

for (let i = 0; i < 200; i++) {
    const op = Math.random();

    if (op < 0.6) {
        q.enqueue(i);
        ref.push(i);
    } else if (ref.length > 0) {
        q.dequeue();
        ref.shift();
    }

    const a = q.toArray();

    // compare with reference array
    const ok =
        a.length === ref.length &&
        a.every((v, idx) => v === ref[idx]);

    if (!ok) {
        console.log("Mismatch detected!");
        console.log("Queue:", a);
        console.log("Ref:", ref);
        break;
    }
}

console.log("Done");