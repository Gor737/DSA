class Node {
    constructor(value, next = null){
        this.value = value;
        this.next = next;
    }
}

class SinglyLinkedList{
    #head = null;
    constructor(head = null){
        this.#head = head;
    }
    empty(){
        if(!this.#head) return true;
        return false;
    }
    size(){
        if(this.empty()) return 0;
        let curr = this.#head;
        let length = 0;
        while(curr){
            curr = curr.next;
            ++length;
        }
        return length;
    }
    clear(){
        this.#head = null;
    }
    front(){
        if(this.empty()) throw new Error('Linked List is empty');
        return this.#head.value;
    }
    back(){
        if(this.empty()) throw new Error('Linked List is empty');
        let curr = this.#head;
        while(curr.next){
            curr = curr.next;
        }
        return curr.value;
    }
    at(index){
        if(this.empty()) throw new Error('Linked List is empty');
        if(!Number.isInteger(index)) throw new Error('Index must be an integer');
        else if(index >= this.size() || index < 0) throw new Error('Invalid index');
        if(index === 0) return this.#head.value;

        let curr = this.#head;
        while(index >= 1){
            curr = curr.next;
            --index;
        }
        return curr.value;
    }
    pushFront(value){
        const node = new Node(value);
        if(this.empty()) this.#head = node;
        else {
            node.next = this.#head;
            this.#head = node;
        }
    }
    pushBack(value){
        const node = new Node(value);
        if(this.empty()) this.#head = node;
        else{
            let curr = this.#head;
            while(curr.next){
                curr = curr.next;
            }
            curr.next = node;
        }
    }
    popFront(){
        if(this.empty()) throw new Error('Linked List is empty');
    
        if(!this.#head.next) this.#head = null;    
        else this.#head = this.#head.next;
    }

    popBack(){
        if(this.empty()) throw new Error('Linked List is empty');
        if(!this.#head.next) this.#head = null;
        else {
            let curr = this.#head;
            while(curr.next.next){
                curr = curr.next;
            }
            curr.next = null;
        }
    }
    insert(index, value){
        if(!Number.isInteger(index)) throw new Error('Index must be an integer');
        else if(index > this.size() || index < 0) throw new Error('Invalid index');

        if(!index) this.pushFront(value);
        else {
            const node = new Node(value);
            let curr = this.#head.next;
            let prev = this.#head;
            while(index > 1){
                curr = curr.next;
                prev = prev.next;
                --index;
            }
            node.next = curr;
            prev.next = node;
        }
    }
    erase(index){
        if(!Number.isInteger(index)) throw new Error('Index must be an integer');
        else if(index >= this.size() || index < 0) throw new Error('Invalid index');
        
        if(!index) this.#head = this.#head.next;
        else {
            let curr = this.#head;
            while(index > 1){
                curr = curr.next;
                --index;
            }
            curr.next = curr.next.next;
        }
    }
    find(value){
        if(this.empty()) return -1;
        let index = 0;
        if(this.#head.value === value) return index;
        let curr = this.#head;
        while(curr.next){
            curr = curr.next;
            ++index;
            if(curr.value === value) return index;
        }
        return -1;
    }
    contains(value){
        if(this.empty()) return false;
        let curr = this.#head;
        while(curr){
            if(curr.value === value) return true;
            curr = curr.next;
        }
        return false;
    }
    toArray(){
        if(this.empty()) return [];
        const res = [this.#head.value];
        let curr = this.#head;
        while(curr.next){
            curr = curr.next;
            res.push(curr.value);
        }
        return res;
    }
    reverse(){
        let prev = null;
        let curr = this.#head;
        while(curr){
            let tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
            tmp = tmp?.next;
        }
        head = prev;
    }
    [Symbol.iterator](){
        if(this.empty()) return { next: () => {done: true}};
        
        let start = this.#head;
        return {
            next: () => {
                if(start){
                    let val = start.value;
                    start = start.next;
                    return {value: val, done: false};
                }else{
                    return {done: true};
                }
            }
        }
    }
    *entries(){
        let curr = this.#head;
        let index = 0;
        while(curr){
            yield [index++, curr.value];
            curr = curr.next;
        }
    }
}



const list = new SinglyLinkedList();

list.pushBack(10);
list.pushBack(20);
list.pushBack(30);

// list.insert(1, 15);

// console.log(list.toArray());
// [10, 15, 20, 30]

// list.erase(2);

// console.log(list.toArray());
// [10, 15, 30]

// list.reverse();

// console.log(list.toArray());
// [30, 15, 10]

console.log();
console.log(list.toArray());
