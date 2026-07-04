import {Node, LinkedList} from "./sllForHT.js";

class HashTable {
    #table;
    #capacity;
    #size;
    #loadFactor;

    constructor(capacity = 7, factor = 0.75) {
        if(!Number.isInteger(capacity)) throw new Error('Capacity Error');
        if(typeof factor !== 'number' || factor <= 0 || factor > 1) throw new Error('Factor Error');
        if(capacity < 7) capacity = 7;
        else if(!this.#isPrime(capacity)) capacity = this.#nextPrime(capacity);
        
        this.#init(capacity, factor);
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    isEmpty() {
        return !this.#size;
    }

    clear() {
        this.#init(this.#capacity, this.#loadFactor);
    }

    /* ================= Hashing ================= */

    #hash(key) {
        let hash = 0;
        if(typeof key === 'number'){
            key = Math.abs(key);
            for(let i = key % 10; i; i = key % 10){
                hash += i;
                key = Math.floor(key / 10);
            }
        }else if(typeof key === 'string'){
            for(let i = 0; i < key.length; ++i){
                hash += key[i].charCodeAt();
            }
        }else throw new Error('Key type error!');
        return hash % this.#capacity;
    }

    /* ================= Core Operations ================= */

    put(key, value) {
        let idx = this.#hash(key);
        if(this.containsKey(key)){
            let list = this.#table[idx].head;
            while(list){
                if(list.key === key){
                    list.value = value;
                    return;
                }
                list = list.next;
            }
        }else if(this.loadFactor() >= this.#loadFactor) this.#resize();
        
        idx = this.#hash(key);
        this.#table[idx].insert(key, value);
        ++this.#size;
    }

    get(key) {
        const idx = this.#hash(key);
        const list = this.#table[idx];
        return list.find(key);
    }
    
    remove(key) {
        const idx = this.#hash(key);
        if(!this.#table[idx].containsKey(key)) return undefined;
        --this.#size;
        return this.#table[idx].remove(key);
    }

    containsKey(key) {
        const idx = this.#hash(key);
        let list = this.#table[idx].head;
        while(list){
            if(list.key === key) return true;
            list = list.next;
        }
        return false;
    }

    containsValue(value) {
        for(let i = 0; i < this.#table.length; ++i){
            let list = this.#table[i].head;
            while(list){
                if(list.value === value) return true;
                list = list.next;
            }
        }
        return false;
    }

    /* ================= Resize / Rehash ================= */

    #resize() {

        const oldTable = this.#table;
        this.#capacity = this.#nextPrime(this.#capacity * 2);
        this.#table = new Array(this.#capacity);
        this.#size = 0;

        for(let i = 0; i < this.#table.length; ++i){
            this.#table[i] = new LinkedList();
        }
        for(let list of oldTable){
            list = list.head;
            while(list){
                this.put(list.key, list.value);
                list = list.next;
            }
        }
    }

    loadFactor() {
        return this.#size / this.#capacity;
    }

    /* ================= Entry Views ================= */

    keys() {
        const keys = [];
        for(let list of this.#table){
            list = list.head;
            while(list){
                keys.push(list.key);
                list = list.next;
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for(let list of this.#table){
            list = list.head;
            while(list){
                values.push(list.value);
                list = list.next;
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for(let list of this.#table){
            list = list.head;
            while(list){
                entries.push([list.key, list.value]);
                list = list.next;
            }
        }
        return entries;
    }

    /* ================= Iteration ================= */

    *[Symbol.iterator]() {
        for(let list of this.#table){
            list = list.head;
            while(list){
                yield [list.key, list.value];
                list = list.next;
            }
        }
        return;
    }

    /* ================= Debug ================= */

    bucketSizes() {
        const bucketSizes = [];
        for(const list of this.#table){
            bucketSizes.push(list.size());
        }
        return bucketSizes;
    }

    #init(capacity, factor) {
        this.#size = 0;
        this.#capacity = capacity;
        this.#loadFactor = factor;
        this.#table = new Array(this.#capacity);
        for(let i = 0; i < this.#table.length; ++i){
            this.#table[i] = new LinkedList();
        }
    }

    #isPrime(number) {
        if(number === 2) return true;
        if(!(number % 2) || number < 2) return false;
        for(let i = 3; i <= number/2; i += 2){
            if(number % i === 0) return false;
        }
        return true;
    }
    #nextPrime(number) {
        if(!(number % 2)) number += 1;
        else number += 2;
        for(let i = number; true; i += 2){
            if(this.#isPrime(i)) return i;
        }
    }
    
    print() {
        for (let i = 0; i < this.#capacity; i++) {
            let result = `Bucket ${i}: `;
            let current = this.#table[i].head;

            while (current) {
                result += `(${current.key}: ${current.value}) -> `;
                current = current.next;
            }

            result += "null";

            console.log(result);
        }
    }
}