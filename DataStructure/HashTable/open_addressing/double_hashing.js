// ...ԿԻՍԱՏ

class Node {
    constructor(key = null, value = null){
        this.key = key;
        this.val = value;
    }
}

class HashTable {
  #size;
  #cap;
  #loadFactor;
  #table;

  constructor(capacity = 7, factor = 0.75) {
    if(!Number.isInteger(capacity)) throw new Error('Capacity Error');
    if(typeof factor !== 'number' || factor <= 0 || factor > 1) throw new Error('Factor Error');
    if(!this.#isPrime(capacity)) capacity = this.#nextPrime(capacity);
    this.#init(capacity, factor);
  }
  
  get size() {
    return this.#size;
  }
  
  clear() {
    this.#init(this.#cap, this.#loadFactor);
  }

  hash(key) {
    key = toString(key);
    let hash = 0;
    for(let i = 0; i < key.length; ++i){
        hash += key.charCodeAt(i);
    }
    return hash % this.#table.length;
  }



  set(key, value) {
    if(++this.#size / this.#cap >= this.#loadFactor) this.resize();
    let idx = this.hash(key);
    if(this.has(key)) idx = this.#getUniqIdx(key, idx);
    this.#table[idx] = new Node(key, value);
  }

  get(key) {

  }

  delete(key) {
    let idx = this.hash(key);
    if(this.#table[idx].key) this.#table[idx] = null;
  }

  has(key) {
    
  }

  resize() {
    const length = this.#cap;
    this.#cap = this.#nextPrime(cap * 2);
    const newTable = new Array(this.#cap);

    for(let i = 0; i < length; ++i){
        if(this.#table[i].key){
            newTable[this.has] //...
        }
        newTable[i] = this.#table[i];
    }

    this.#table = newTable;
  }

  #init(capacity, factor) {
    this.#size = 0;
    this.#cap = capacity;
    this.#loadFactor = factor;
    this.#table = new Array(this.#cap);
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
        if(this.#isPrime(number)) return number;
    }
  }
  #getUniqIdx() {
    
  }
}