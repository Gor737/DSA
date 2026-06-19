class Stack {
    #size;
    #backColumn;
    #backRow;
    #origin;
    #originSize;
    #bucketSize;
    constructor(originSize = 4, bucketSize = 8){
        this.#originSize = originSize;
        this.#bucketSize = bucketSize;
        this.#init(originSize, bucketSize);
    }
    size(){
        return this.#size;
    }
    isEmpty(){
        return !this.#size;
    }
    isFully(){
        if(this.#backColumn >= this.#bucketSize && this.#backRow >= this.#origin.length - 1) return true;
        return false;
    }
    clear(){
        this.#init(this.#originSize, this.#bucketSize);
    }
    push(value){
        if(this.#backColumn >= this.#bucketSize){
            if(this.isFully()) this.#resize();
            ++this.#backRow;
            this.#backColumn %= this.#bucketSize;
        }
        
        this.#origin[this.#backRow][this.#backColumn++] = value;
        ++this.#size;
    }
    pop(){
        if(this.isEmpty()) throw new Error("Stack is empty!");
        if(this.#backColumn <= 0){
            this.#backColumn = this.#bucketSize;
            --this.#backRow;
        }
        const value = this.#origin[this.#backRow][--this.#backColumn];
        this.#origin[this.#backRow][this.#backColumn] = undefined;
        --this.#size;
        return value;
    }
    peek(){
        if(this.isEmpty()) throw new Error("Stack is empty!");
        if(this.#backColumn <= 0){
            return this.#origin[this.#backRow - 1][this.#bucketSize - 1];
        }else return this.#origin[this.#backRow][this.#backColumn - 1];
    }
    toArray(){
        if(this.isEmpty()) return [];
        const arr = new Array(this.#size);
        let column = 0;
        let row = 0;
        let idx = 0;

        while(idx < this.#size){
            if(column >= this.#bucketSize){
                column = 0;
                ++row;
            }
            // console.log(row, `row`,  column, `column`, idx, `idx`)
            arr[idx++] = this.#origin[row][column++];
        }
        return arr;
    }
    toString(){
        return this.toArray().join('');
    }
    *[Symbol.iterator](){
        let column = 0;
        let row = 0;
        let length = this.#size;
        while(length--){
            if(column >= this.#bucketSize){
                column %= this.#bucketSize;
                ++row;
            }
            yield this.#origin[row][column++];
        }
        return;
    }

    #resize(){
        const newArr = new Array(this.#origin.length * 2);
        let i = 0;
        while(i < this.#origin.length){
            newArr[i] = this.#origin[i++];
        }
        while(i < newArr.length){
            newArr[i++] = new Array(this.#bucketSize);
        }
        this.#origin = newArr;
    }
    #init(originSize, bucketSize){
        if(originSize < 0 || !Number.isInteger(originSize)) throw new Error("Invalid size for initialization!");
        if(bucketSize < 0 || !Number.isInteger(bucketSize)) throw new Error("Invalid size for initialization!");

        this.#origin = new Array(originSize);
        for(let i = 0; i < originSize; ++i){
            this.#origin[i] = new Array(bucketSize);
        }
        this.#size = 0;
        this.#backRow = 0;
        this.#backColumn = 0;
    }
}


const s = new Stack();
s.push(3);
s.push(3);
s.push(3);
s.push(3);
console.log(s.toArray())

s.push(3);
s.push(3);
s.push(3);
s.push(3);
s.push(3);
s.push(3);
s.push(3);
console.log(s.peek())

for(let i = 0; i < 50; i++){
    s.push(3);
}
s.push(5);
console.log(s.toArray())
console.log(s.peek())
s.pop()
console.log(s.size())

// console.log(s.toArray())


// const s = new Stack(4);

// for (let i = 1; i <= 8; i++) {
//     s.push(i);
// }

// console.log(s.peek());
// console.log(s.toArray());