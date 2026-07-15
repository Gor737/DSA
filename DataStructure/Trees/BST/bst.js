import {Queue} from '../../Queue/Queue.js'
//Binary Search Tree (BST).  ----->  ...ԿԻՍԱՏ

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BST {
    #root;
    #size;

    constructor() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return !this.#root;
    }

    clear() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Insert / Delete ================= */

    insert(value) {
        const node = new Node(value);
        if(!this.#root){
            this.#root = node;
            ++this.#size;
            return;
        }

        let curr = this.#root;
        while(true){
            if(value > curr.value){
                if(!curr.right) curr.right = node;
                curr = curr.right;
                ++this.#size;
                break;
            }else if(value < curr.value){
                if(!curr.left) curr.left = node;
                curr = curr.left;
                ++this.#size;
                break;
            }else{
                return;
            }
        }
    }

    delete(value) {
        if(this.is_empty()) return undefined;
        let curr = this.#root;
        let parent = null;
        while(curr || curr.value !== value){
            parent = curr;
            if(curr.value > value) curr = curr.left;
            else curr = curr.right;
        }
        if(!curr) return undefined;
        let value = curr.val;
        if(!curr.left && !curr.right){
            if(parent.left === curr) parent.left = null;
            else parent.right = null;
        }else if(!curr.left || !curr.right){
            let child = curr.left ?? curr.right;
            if(parent.left === curr) parent.left = child;
            else parent.right = child;
        }else{
            const successor = this.find_successor(curr);
            this.delete(successor);
            curr.val = successor;
        }
        return value;
    }

    contains(value) {
        let curr = this.#root;
        while(curr){
            if(curr.value === value) return true;
            if(curr.value > value) curr = curr.left;
            else curr = curr.right;
        }
        return false;
    }

    /* ================= Height & Depth ================= */

    get_height() {
        if(!this.#root) return 0;
        const queue = new Queue();
        queue.enqueue(this.#root);
        let height = 0;

        while(queue.isEmpty){
            const size = queue.size();
            ++height;
            for(let i = 0; i < size; ++i){
                const node = queue.dequeue();
                if(node.left) queue.enqueue(node.left);
                if(node.right) queue.enqueue(node.right);
            }
        }
        
        return height;
    }

    get_depth(value) {
        let distance = 0;
        if(!this.#root) return distance;
        let curr = this.#root;

        while(curr || curr.value !== value){
            curr = value > curr.value ? curr.right : curr.left;
            ++distance;
        }

        return distance;
    }

    /* ================= Min / Max ================= */

    find_min() {
        let curr = this.#root;
        if(curr.left){
            curr = curr.left;
        }
        if(!curr) return undefined;
        return curr.value;
    }

    find_max() {
        let curr = this.#root;
        if(curr.right){
            curr = curr.right;
        }
        if(!curr) return undefined;
        return curr.value;
    }

    /* ================= Traversals ================= */

    level_order() {
        if(!this.#root) return [];
        const data = [];
        const queue = new Queue();
        queue.enqueue(this.#root);

        while(queue.isEmpty){
            const size = queue.size();
            for(let i = 0; i < size; ++i){
                const node = queue.dequeue();
                data.push(node.value);
                if(node.left) queue.enqueue(node.left);
                if(node.right) queue.enqueue(node.right);
            }
        }

        return data;
    }

    inorder_rec() {
        const data = [];
        const rec = (node) => {
            if(!node) return;
            rec(node.left);
            data.push(node.value);
            rec(node.right);
        }
        rec(this.#root);
        return data;
    }

    inorder_itr(root = this.#root) {
        if(!root) return [];
        const data = [];
        const stack = [];
        let curr = root;

        while(curr || stack.length){
            while(curr){
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            data.push(curr.value);
            curr = curr.right;
        }

        return data;
    }

    preorder_rec() {
        const data = [];
        const rec = (node) => {
            if(!node) return;
            data.push(node.value);
            rec(node.left);
            rec(node.right);
        }
        rec(this.#root);
        return data;
    }

    preorder_itr() {
        if(!this.#root) return [];
        const data = [];
        const stack = [this.#root];

        while(stack.length){
            const vertex = stack.pop();
            data.push(vertex.value);

            if(node.right) stack.push(node.right);
            if(node.left) stack.push(node.left);
        }

        return data;
    }

    postorder_rec() {
        const data = [];
        const rec = (node) => {
            if(!node) return;
            rec(node.left);
            rec(node.right);
            data.push(node.value);
        }
        rec(this.#root);
        return data;
    }

    postorder_itr() {
        if(!this.#root) return [];
        const data = [];
        const stack = [this.#root];

        while(stack.length){
            const node = stack.pop();
            data.push(node.value);
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
        }

        for(let i = 0, j = data.length - 1; i < j; ++i, --j){
            [data[i], data[j]] = [data[j], data[i]];
        }

        return data;
    }

    /* ================= Advanced Operations ================= */

    find_successor(node) {
        let curr = node.right;
        while(curr.left) curr = curr.left;
        return curr.val;
    }

    find_predecessor(node) {
        let curr = node.left;
        while(curr.right) curr = curr.right;
        return curr.val;
    }

    is_balanced() {
        let h1 = this.#_get_height(this.#root.left);
        let h2 = this.#_get_height(this.#root.right);
        return Math.abs(h1 - h2) <= 1;
    }

    validate_BST() {
        const data = this.inorder_rec();
        for(let i = 1; i < data.length; ++i){
            if(data[i] <= data[i - 1]) return false;
        }
        return true;
    }

    /* ================= Utilities ================= */

    toArray() {
        if(!this.#root) return [];
        const data = [];
        const stack = [];
        let curr = this.#root;

        while(curr || stack.length){
            while(curr){
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            data.push(curr.value);
            curr = curr.right;
        }
        
        return data;
    }

    clone() {
        let cloned = new BST();
        const helper = (node) => {
            if(!node) return null;
            cloned.insert(node.value);
            helper(node.left);
            helper(node.right);
        }
        helper(this.#root);
        return cloned;
    }

    equals(otherTree) {
        const data = this.inorder_itr();
        const otherData = this.inorder_itr(otherTree);
        if(data.length !== otherData.length) return false;
        for(let i = 0; i < data.length; ++i){
            if(data[i] !== otherData[i]) return false;
        }
        return true;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        return this.values();
    }

    *values() {
        const stack = [];
        let curr = this.#root;

        while(curr || stack.length){
            while(curr){
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            yield curr.value;
            curr = curr.right;
        }
    }

    *entries() {
        const stack = [];
        let curr = this.#root;
        let idx = 0;

        while(curr || stack.length){
            while(curr){
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            yield [idx++, curr.value];
            curr = curr.right;
        }
    }

    /* ================= Private Helpers ================= */
    #inorder_nodes_count(node){
        if(!node) return 0;
        let c1 = this.#inorder_nodes_count(node.left);
        let c2 = this.#inorder_nodes_count(node.right);
        if(node.left || node.right) return 1 + c1 + c2;
        else return 0;
    }

    #_insert(node, value) {
        // Recursive insertion helper
        // Must return updated subtree root
    }

    #_delete(node, value) {
        // Recursive deletion helper
        // Must return updated subtree root
    }

    #_find_min(node) {
        if(!node.left) return node.value;
        return this.#_find_min(node.left);
    }

    #_find_max(node) {
        if(!node.right) return node.value;
        return this.#_find_min(node.right);
    }

    #_get_height(node) {
        if(!node) return 0;
        let h1 = this.#_get_height(node.left);
        let h2 = this.#_get_height(node.right);
        return 1 + Math.max(h1, h2);
    }

    #_inorder(node, result) {
        if(!node) return null;
        if(node.left) this.#_inorder(node.left, result);
        result.push(node.value);
        if(node.right) this.#_inorder(node.right, result);
    }

    #_preorder(node, result) {
        if(!node) return null;
        result.push(node.value);
        if(node.left) this.#_preorder(node.left, result);
        if(node.right) this.#_preorder(node.right, result);
    }

    #_postorder(node, result) {
        if(!node) return null;
        if(node.left) this.#_postorder(node.left, result);
        if(node.right) this.#_postorder(node.right, result);
        result.push(node.value);
    }
}


