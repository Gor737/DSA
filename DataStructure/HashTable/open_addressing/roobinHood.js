class Slot {
  constructor(key, value, psl){
    this.key = key ?? null;
    this.value = value ?? null;
    this.psl = psl ?? null;
  }
}

class HashTable {
  #size;
  #slots;
  #mask;
  #capacity;
  #loadFactor = 0.75;

  constructor(initialCapacity = 8) {
    if(!Number.isInteger(initialCapacity)) throw new Error('Capacity type Error!');
    if(!this.#isPowerOfTwo(initialCapacity)) initialCapacity = this.#nextPowerOfTwo(initialCapacity);
    this.#init(initialCapacity);
  }
  
  get size() {
    return this.#size;
  }
  
  get capacity() {
    return this.#capacity;
  }
  
  get loadFactor() {
    return this.#loadFactor;
  }

  set(key, value) {
    let idx = this.#findSlot(key);
    if(idx >= 0){
      this.#slots[idx].value = value;
      return;
    };
    if((this.#size / this.#capacity) >= this.#loadFactor) this.#resize(this.#capacity * 2);

    ++this.#size;
    let curr = 0;
    const ideal = this.#hash(key);
    
    let slot = new Slot(key, value, 0);
    
    for(let i = ideal; true; i = (ideal + curr) % this.#capacity){
      i %= this.#capacity;
      slot.psl = curr;  //(slot.psl + 1) % this.#capacity;

      if(!this.#slots[i]){
        this.#slots[i] = slot;
        break;
      }
      if(this.#slots[i].psl < curr){
        let tmp = slot;
        slot = this.#slots[i];
        this.#slots[i] = tmp;
      }

      ++curr;
    }
  }
  
  get(key) {
    const idx = this.#findSlot(key);
    if(idx < 0) return undefined;
    return this.#slots[idx].value;
  }
  
  has(key) {
    if(this.#findSlot(key) < 0) return false;
    return true;
  }
  
  delete(key) {
    let idx = this.#findSlot(key);
    if(idx < 0) throw new Error('slot not found for deleting');
    const val = this.#slots[idx].value;
    
    let curr = (idx + 1) % this.#capacity;

    for(let i = curr; true; i = (i + 1) % this.#capacity){
      if(!this.#slots[i]) break;
      if(!this.#slots[i].psl) break;
      
      this.#slots[idx] = this.#slots[i];
      --this.#slots[idx].psl;
      this.#slots[i] = null;
      idx = i;
    }

    this.#slots[idx] = null;
    --this.#size;
    
    return val;
  }
  
  
  clear() {
    this.#init(this.#capacity);
  }
  
  
  *entries() {
    for(let i = 0; i < this.#capacity; ++i){
      if(!this.#slots[i]) continue;
      yield [this.#slots[i].key, this.#slots[i].value];
    }
  }
  
  *keys() {
    for(let i = 0; i < this.#capacity; ++i){
      if(!this.#slots[i]) continue;
      yield this.#slots[i].key;
    }
  }
  
  *values() {
    for(let i = 0; i < this.#capacity; ++i){
      if(!this.#slots[i]) continue;
      yield this.#slots[i].value;
    }
  }
  
  [Symbol.iterator]() {
    return this.entries();
  }


  #psl(currIdx, idealIdx){
    return (currIdx - idealIdx + this.#capacity) % this.#capacity;
  }

  #hash(key) {
    let hash = 0;
    if(typeof key === 'number'){
      for(let i = key % 10; key; i = key % 10){
        hash += i;
        key = Math.floor(key / 10);
      }
    }else if(typeof key === 'string'){
      for(let i = 0; i < key.length; ++i){
        hash += key.charCodeAt(i);
      }
    }else throw new Error('key type Error!');
    return hash & this.#mask;
  }

  #resize(newCapacity) {
    const oldSlots = this.#slots;
    this.#init(newCapacity);

    for(let i = 0; i < oldSlots.length; i++){
      if(!oldSlots[i]) continue;
      this.set(oldSlots[i].key, oldSlots[i].value);
    }
  }

  #findSlot(key) {
    const ideal = this.#hash(key);
    let curr = 0;
    for(let curr = 0; curr < this.#capacity; ++curr){
      const idx = (ideal + curr) % this.#capacity;
      if(!this.#slots[idx]) return -1;
      if(key === this.#slots[idx].key) return idx;
      if(this.#slots[idx].psl < curr) return -1;
    }
    return -1;
  }

  #isPowerOfTwo(n){
    let pow = 1;
    while(pow <= n){
      if(pow === n) return true;
      pow *= 2;
    }
    return false;
  }

  #nextPowerOfTwo(n) {
    if(n % 2 === 0) n += 2;
    else n += 1; 
    for(let i = n; true; i += 2){
      if(this.#isPowerOfTwo(i)) return i;
    }
  }

  #init(cap){
    this.#size = 0;
    this.#mask = cap - 1;
    this.#capacity = cap;
    this.#slots = new Array(cap).fill(null);
  }

  #debugStats() {
    //...
  }
}



                                                  //-------TESTS-------
const ht = new HashTable();

// Basic set/get
ht.set('a', 1);
ht.set('b', 2);
ht.set('c', 3);
console.log(ht.get('a')); // 1
console.log(ht.get('b')); // 2

// Update
ht.set('a', 99);
console.log(ht.get('a')); // 99

// Has
console.log(ht.has('b')); // true
console.log(ht.has('z')); // false

// Delete
ht.delete('b');
console.log(ht.has('b')); // false
console.log(ht.get('c')); // 3 — chain չի կոտրվել

// Size
console.log(ht.size); // 2

// Iterator
for(const [k, v] of ht) console.log(k, v);

// Resize trigger — շատ տարրեր
for(let i = 0; i < 20; i++) ht.set(`key${i}`, i);
console.log(ht.capacity); // 32 կամ ավելի