//Dynamic Array


/**
 * Class representing a "Dynamic Array" data structure.
 * Uses a typed array (Uint32Array) as internal storage.
 */
export class DArray {
  // Private fields
  /** @private @type {number} Current number of elements in the array */
  #size = 0;
  
  /** @private @type {number} Current capacity (allocated memory) of the array */
  #capacity = 0;
  
  /** @private @type {Uint32Array|null} Internal array for storing data */
  #arr = null;

  // Public fields
  /** @public @type {number} Capacity multiplier when the array is full */
  CAP_EXPONENT = 1.75;

  /**
   * Initializes the dynamic array with a given initial capacity.
   * @param {number} initialCapacity - Initial capacity of the array (must be a strictly positive integer).
   * @throws {TypeError} If initialCapacity is not a positive integer.
   */
  constructor(initialCapacity) {
    if(typeof initialCapacity !== 'number' || !Number.isFinite(initialCapacity)) throw new Error('Capacity type Error');
    else if(initialCapacity <= 0) throw new Error('Capacity negative Error');
    this.#capacity = initialCapacity;
    this.#arr = new Uint32Array(initialCapacity);
  }

  get size(){
    return this.#size;
  }
  set size(value){
    if(!Number.isInteger(value)) throw new Error('...');
    if(value < 0) throw new Error('...');
    this.#size = value;
  }
  get capacity() {
    return this.#capacity;
  }
  set capacity(value){
    if(!Number.isInteger(value)) throw new Error('...');
    if(value < 0) throw new Error('...');
    this.#capacity = value;
  }

  /**
   * Changes the capacity of the internal array.
   * @param {number} newCapacity - The new capacity of the array.
   * @param {number} [fill=0] - The value used to fill new elements if newCapacity > #size.
   */
  
  resize(newCapacity, fill = 0) {
    if(typeof newCapacity !== 'number' || !Number.isFinite(newCapacity)) throw new Error('newCapacity type Error');
    else if(newCapacity < 0) throw new Error('newCapacity negative Error');
    else if(this.#size >= newCapacity) this.#size = newCapacity; 
    const newArray = new Uint32Array(newCapacity).fill(fill);
    for(let i = 0; i < this.#size; ++i){
        newArray[i] = this.#arr[i];
    }
    this.#arr = newArray;
    this.#capacity = newCapacity;
  }

  /**
   * Adds an element to the end of the array. If the array is full, increases its capacity by CAP_EXPONENT.
   * @param {number} elem - The element to add.
   */
  push_back(elem) {
    if(typeof elem !== 'number' || !Number.isFinite(elem)) throw new Error('push_back type Error');
    if(this.#size === this.#capacity) this.resize(Math.ceil(this.CAP_EXPONENT * this.#capacity));

    this.#arr[this.#size++] = elem;
  }

  /**
   * Removes the last element from the array (decreases the size). Does nothing if the array is empty.
   */
  pop_back() {
    if(!this.#size) ;
    else --this.#size;
  }

  /**
   * Removes an element at the specified index, shifting all subsequent elements to the left.
   * @param {number} index - The index of the element to remove.
   * @throws {Error} If the index is out of bounds.
   */
  erase(index) {
    if(typeof index !== 'number' || !Number.isFinite(index)) throw new Error('erase index type Error');
    else if(index >= this.#size || index < 0) throw new Error('Invalid erase index');
    for(let i = index; i < this.#size - 1; ++i){
        this.#arr[i] = this.#arr[i + 1];
    }
    --this.#size;
  }

  /**
   * Returns the element at the specified index.
   * @param {number} index - The index of the element.
   * @returns {number} The value of the element.
   * @throws {Error} If the index is out of bounds.
   */
  at(index) {
    if(typeof index !== 'number' || !Number.isFinite(index)) throw new Error('at index type Error');
    else if(index >= this.#size || index < 0) throw new Error('Invalid at index');
    return this.#arr[index];
  }

  /**
   * Checks if the array is empty.
   * @returns {boolean} true if the array is empty, otherwise false.
   */
  empty() {
    if(!this.#size) return true;
    return false;
  }

  /**
   * Clears the array (logically, by resetting the size to 0).
   */
  clear() {
    if(this.empty()) ;
    else this.#size = 0;
  }

  /**
   * Sets a new value for the element at the specified index.
   * @param {number} i - The index of the element.
   * @param {number} value - The new value.
   */
  setValue(i, value) {
    if(typeof i !== 'number' || !Number.isFinite(i)) throw new Error('setValue index type Error');
    else if(i >= this.#size || i < 0) throw new Error('Invalid setValue index');
    else if(typeof value !== 'number' || !Number.isFinite(value)) throw new Error('setValue value type Error');

    this.#arr[i] = value;
  }

  /**
   * Returns the first element of the array.
   * @returns {number|undefined} The first element.
   */
  front() {
    if(this.empty()) ;
    else return this.#arr[0];
  }

  /**
   * Returns the last element of the array.
   * @returns {number|undefined} The last element.
   */
  back() {
    if(this.empty()) ;
    else return this.#arr[this.#size - 1];
  }

  /**
   * Makes the object iterable (allows the use of a for...of loop).
   * @returns {Iterator} Iterator object.
   */
  [Symbol.iterator]() {
    let start = 0;
    return {
        next: () => {
            if(start < this.#size){
                return {value: this.#arr[start++], done: false};
            }else return {done: true};
        }
    }
  }

  /**
   * Reserves memory, increasing capacity to n if the current capacity is less than n.
   * @param {number} n - The desired minimum capacity.
   */
  reserve(n) {
    if(typeof n !== 'number' || !Number.isFinite(n)) throw new Error('setValue index type Error');
    else if(n < this.#capacity || n < 0) ;
    else this.resize(n);
  }

  /**
   * Shrinks the capacity of the array to fit its actual size (#size).
   */
  shrinkToFit() {
    if(this.#size !== this.#capacity) this.resize(this.#size);
  }

  /**
   * Converts the structure to a standard JavaScript array.
   * @returns {Array<number>} A standard array of elements.
   */
  toArray() {
    const arr = new Array(this.#size).fill(0);
    for(let i = 0; i < this.#size; ++i){
        arr[i] = this.#arr[i];
    }
    return arr;
  }

  /**
   * Inserts an element at the specified position, shifting the rest of the elements to the right.
   * @param {number} pos - The index to insert at.
   * @param {number} value - The value to insert.
   * @throws {Error} If the position is out of bounds.
   */
  insert(pos, value) {
    if(typeof pos !== 'number' || !Number.isFinite(pos)) throw new Error('Insert position type Error');
    else if(pos > this.#size || pos < 0) throw new Error('Invalid insert position');
    else if(typeof value !== 'number' || !Number.isFinite(value)) throw new Error('Insert value type Error');
    if(this.#size === this.#capacity) this.resize(Math.ceil(this.CAP_EXPONENT * this.#capacity));

    for(let i = this.#size - 1; i >= pos; --i){
        this.#arr[i + 1] = this.#arr[i];
    }
    this.#arr[pos] = value;
    ++this.#size;
  }

  write(pos, value){
    // if(typeof pos !== 'number' || !Number.isFinite(pos)) throw new Error('Write position type Error');
    // else if(pos > this.#size - 1 || pos < 0) throw new Error('Invalid write position');
    // else if(typeof value !== 'number' || !Number.isFinite(value)) throw new Error('Write value type Error');
    // if(this.#size === this.#capacity) this.resize(Math.ceil(this.CAP_EXPONENT * this.#capacity));

    this.#arr[pos] = value;
  }

  /**
   * Swaps two elements by their indices.
   * @param {number} i - The index of the first element.
   * @param {number} j - The index of the second element.
   * @throws {RangeError} If either index is out of bounds.
   */
  swap(i, j) {
    if(typeof i !== 'number' || !Number.isFinite(i)) throw new Error('swap fisrt index type Error');
    else if(i >= this.#size || i < 0) throw new Error('Invalid swap first index');
    if(typeof j !== 'number' || !Number.isFinite(j)) throw new Error('swap second index type Error');
    else if(j >= this.#size || j < 0) throw new Error('Invalid swap second index');

    [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
  }

  /**
   * Returns an iterator for the array's values.
   * @returns {Iterator} Value iterator.
   */
  *values() {
    if(this.empty()) return;
    for(let i = 0; i < this.#size; ++i){
        yield this.#arr[i];
    }
  }

  /**
   * Returns an iterator for the array's keys (indices).
   * @returns {Iterator} Key iterator.
   */
  *keys() {
    if(this.empty()) return;
    for(let i = 0; i < this.#size; ++i){
        yield i;
    }
  }

  /**
   * Returns an iterator for [index, value] pairs.
   * @returns {Iterator} Entries iterator.
   */
  *entries() {
    if(this.empty()) return;
    for(let i = 0; i < this.#size; ++i){
        yield [i, this.#arr[i]];
    }
  }

  /**
   * Executes a provided function once for each array element.
   * @param {Function} callback - Function to execute on each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @throws {TypeError} If callback is not a function.
   */
  forEach(callback, thisArg) {
    if(typeof callback !== 'function') throw new TypeError('forEach callback type Error');
    const thisArr = this.toArray();
    for(let i = 0; i < this.#size; ++i){
        callback.call(thisArg, thisArr[i], i, thisArr);
    }
  }

  /**
   * Creates a new DArray populated with the results of calling a provided function on every element.
   * @param {Function} callback - Function that is called for every element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {DArray} A new dynamic array.
   */
  map(callback, thisArg) {
    if(typeof callback !== 'function') throw new TypeError('forEach callback type Error');
    const thisArr = this.toArray();
    const result = new DArray(this.#size);
    for(let i = 0; i < this.#size; ++i){
        result.push_back(callback.call(thisArg, thisArr[i], i, thisArr));
    }
    return result;
  }

  /**
   * Creates a new DArray with all elements that pass the test implemented by the provided function.
   * @param {Function} callback - Predicate function to test each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {DArray} A filtered dynamic array.
   */
  filter(callback, thisArg) {
    if(typeof callback !== 'function') throw new TypeError('forEach callback type Error');
    const thisArr = this.toArray();
    const result = new DArray(this.#size);
    for(let i = 0; i < this.#size; ++i){
        if(callback.call(thisArg, thisArr[i], i, thisArr)) result.push_back(thisArr[i]);
    }
    return result;
  }

  /**
   * Executes a user-supplied "reducer" callback function on each element of the array, passing in the return value from the calculation on the preceding element.
   * @param {Function} callback - Function to execute on each element.
   * @param {*} [initialValue] - Initial value for the accumulator.
   * @returns {*} The final reduced value.
   * @throws {TypeError} If the array is empty and no initialValue is provided.
   */
  reduce(callback, initialValue) {
    if(typeof callback !== 'function') throw new TypeError('forEach callback type Error');
    else if(this.empty() && arguments.length < 2) throw new TypeError('Array is empty');
     
    const thisArr = this.toArray();
    let i = 0;
    if(arguments.length < 2){
        initialValue = thisArr[0];
        i = 1;
    };
    while(i < this.#size){ 
        initialValue = callback(initialValue, thisArr[i], i, thisArr);
        ++i;
    }
    return initialValue;
  }

  /**
   * Tests whether at least one element in the array passes the test implemented by the provided function.
   * @param {Function} callback - Function to test for each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {boolean} true if at least one element passes the test, otherwise false.
   */
  some(callback, thisArg) {
    if(typeof callback !== 'function') throw new TypeError('forEach callback type Error');
    const thisArr = this.toArray();
    for(let i = 0; i < this.#size; ++i){
        if(callback.call(thisArg, thisArr[i], i, thisArr)) return true;
    }
    return false;
  }

  /**
   * Tests whether all elements in the array pass the test implemented by the provided function.
   * @param {Function} callback - Function to test for each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {boolean} true if all elements pass the test, otherwise false.
   */
  every(callback, thisArg) {
    if(typeof callback !== 'function') throw new TypeError('forEach callback type Error');
    const thisArr = this.toArray();
    for(let i = 0; i < this.#size; ++i){
        if(!callback.call(thisArg, thisArr[i], i, thisArr)) return false;
    }
    return true;
  }

  /**
   * Returns the value of the first element in the array that satisfies the provided testing function.
   * @param {Function} callback - Function to test for each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {number|undefined} The value of the found element, or undefined.
   */
  find(callback, thisArg) {
    if(typeof callback !== 'function') throw new TypeError('forEach callback type Error');
    const thisArr = this.toArray();
    for(let i = 0; i < this.#size; ++i){
        if(callback.call(thisArg, thisArr[i], i, thisArr)) return thisArr[i];
    }
  }

  /**
   * Returns the index of the first element in the array that satisfies the provided testing function.
   * @param {Function} callback - Function to test for each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {number} The index of the found element, or -1 if not found.
   */
  findIndex(callback, thisArg) {
    if(typeof callback !== 'function') throw new TypeError('forEach callback type Error');
    const thisArr = this.toArray();
    for(let i = 0; i < this.#size; ++i){
        if(callback.call(thisArg, thisArr[i], i, thisArr)) return i;
    }
    return -1;
  }

  /**
   * Determines whether an array includes a certain value among its entries.
   * @param {number} value - The value to search for.
   * @returns {boolean} true if the value is found, otherwise false.
   */
  includes(value) {
    for(let i = 0; i < this.#size; ++i){
        if(this.#arr[i] === value) return true;
    }
    return false;
  }

  replace(newArr){
    this.#arr = newArr;
  }
  read(index){
    if(index < 0 || index >= this.#capacity) throw new Error("Invalid read index");

    return this.#arr[index];
  }
}







