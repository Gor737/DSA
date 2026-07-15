class PriorityQueue {
 #heap;
 #cmp;

 constructor() {
   this.#heap = [];
//    this.#cmp = cmp;
 }

 //---implementation---

 #parent(index) {
    return Math.floor((index - 1) / 2);
 }

 #left(index) {
    return index * 2 + 1;
 }

 #right(index) {
    return index * 2 + 2;
 }

 #shiftUp(index) {
    let parent = this.#parent(index);
    while(this.#heap[parent] > this.#heap[index] && index){
        this.#swap(parent, index);
        index = parent;
        parent = this.#parent(index);
    }
 }

 #shiftDown(index) {
    let left = this.#heap[this.#left(index)] ?? +Infinity;
    let right = this.#heap[this.#right(index)] ?? +Infinity;
    while(Math.min(left, right) < this.#heap[index]){
        let minChildIdx = left > right ? this.#right(index) : this.#left(index);
        this.#swap(index, minChildIdx);
        index = minChildIdx;
        left = this.#heap[this.#left(index)] ?? +Infinity;
        right = this.#heap[this.#right(index)] ?? +Infinity;
    }
 }

 //---interface---

 size() {
    return this.#heap.length;
 }

 isEmpty() {
    return !this.#heap.length;
 }

 clear() {
    this.#heap = [];
 }

 peek() {
    if(this.isEmpty()) throw new Error('Heap is already empty');
    return this.#heap[0];
 }

 pop() {
    if(this.isEmpty()) throw new Error('Heap is already empty');
    if(this.#heap.length === 1) return this.#heap.pop();
    const val = this.#heap[0];
    this.#heap[0] = this.#heap.pop();
    this.#shiftDown(0);
    return val;
 }

 push(value) {
    this.#heap.push(value);
    this.#shiftUp(this.#heap.length - 1);
 }

 #swap(x, y){
    [this.#heap[x], this.#heap[y]] = [this.#heap[y], this.#heap[x]];
 }
}


const heap = new PriorityQueue();

console.log(heap.size());
heap.push(1);
heap.push(10);
heap.push(-1);
heap.push(-11);
heap.push(111);

console.log(heap.size());


// heap.pop();
// heap.pop();
// heap.pop();
// heap.pop();
console.log(heap.peek());
console.log(heap.pop());
console.log(heap.peek());
