class Deque {
    #origin;
    #frontIdx;
    #frontBucketIdx;
    #backIdx;
    #backBucketIdx;
    #size = 0;
    #bucketSize = 8;
    
    // (this.#backBucketIdx - this.#frontBucketIdx) * this.#bucketSize + (this.#backIdx - this.#frontIdx - 1);  ---> my custom method for size

    constructor(){
        this.#init();
    }

    get front(){
        if(this.isEmpty()) return undefined;
        if(this.#frontIdx === this.#bucketSize - 1){
            return this.#origin[this.#frontBucketIdx + 1][0];
        }
        return this.#origin[this.#frontBucketIdx][this.#frontIdx + 1];
    }
    get back(){
        if(this.isEmpty()) return undefined;
        if(!this.#backIdx){
            return this.#origin[this.#backBucketIdx - 1][this.#bucketSize - 1];
        }
        return this.#origin[this.#backBucketIdx][this.#backIdx - 1];
    }

    isEmpty(){
        return !this.#size;
    }
    clear(){
        this.#init();
        this.#size = 0;
    }
    pushBack(val){
        if(this.#backIdx === this.#bucketSize){
            this.#backIdx %= this.#bucketSize;
            if(this.#backBucketIdx === this.#origin.length - 1){
                this.#resize();
            }
            ++this.#backBucketIdx;
        }
        this.#origin[this.#backBucketIdx][this.#backIdx] = val;
        ++this.#backIdx;
        ++this.#size;
    }
    pushFront(val){
        if(this.#frontIdx < 0){
            this.#frontIdx = this.#bucketSize - 1;
            if(!this.#frontBucketIdx){
                this.#resize();
            }
            --this.#frontBucketIdx;
        }
        this.#origin[this.#frontBucketIdx][this.#frontIdx] = val;
        --this.#frontIdx;
        ++this.#size;
    }
    popBack(){
        if(this.isEmpty()) throw new Error('Deque is empty!');
        if(this.#backIdx === 0){
            this.#backIdx = this.#bucketSize - 1;
            --this.#backBucketIdx;
        }
        else --this.#backIdx;
        --this.#size;
        return this.#origin[this.#backBucketIdx][this.#backIdx];
    }
    popFront(){
        if(this.isEmpty()) throw new Error('Deque is empty!');
        if(this.#frontIdx === this.#bucketSize - 1){
            this.#frontIdx = 0;
            ++this.#frontBucketIdx;
        }
        else ++this.#frontIdx;
        --this.#size;
        return this.#origin[this.#frontBucketIdx][this.#frontIdx];
    }
    at(position){
        if(position > this.#size || position < 1) throw new Error('Invalid position');
        let idx = this.#frontIdx + position;
        const column = idx % this.#bucketSize;
        const row = Math.floor(idx / this.#bucketSize);
        return this.#origin[this.#frontBucketIdx + row][column];
    }
    toArray() {
        let row = this.#frontBucketIdx;
        let column = this.#frontIdx + 1;
        const res = new Array(this.#size);
        let idx = 0;
        let count = this.#size;
        while(count--){
            if(column >= this.#bucketSize){
                column = 0;
                ++row;
            }
            res[idx] = this.#origin[row][column];
            ++idx;
            ++column;
        }
        return res;
    }
    *[Symbol.iterator](){
        let row = this.#frontBucketIdx;
        let column = this.#frontIdx + 1;
        let count = this.#size;
        while(count--){
            if(column >= this.#bucketSize){
                column = 0;
                ++row;
            }
            yield this.#origin[row][column];
            ++column;
        }
    }

    #resize(adder = 2){
        const newOrigin = new Array(this.#origin.length + 2 * adder);
        let i = 0;
        let j = newOrigin.length - 1;
        while(i < adder){
            newOrigin[i++] = new Array(this.#bucketSize);
            newOrigin[j--] = new Array(this.#bucketSize);
        }
        j = 0;
        while(j < this.#origin.length){
            newOrigin[i++] = this.#origin[j++];
        }
        this.#origin = newOrigin;
        this.#frontBucketIdx += adder;
        this.#backBucketIdx += adder;
    }
    #init(buckets = 4){
        this.#origin = new Array(buckets);
        for(let i = 0; i < this.#origin.length; ++i){
            this.#origin[i] = new Array(this.#bucketSize);
        }
        let mid = buckets / 2;
        this.#backBucketIdx = mid;
        this.#backIdx = 0;
        this.#frontBucketIdx = mid - 1;
        this.#frontIdx = this.#bucketSize - 1;
    }
}




                                                    