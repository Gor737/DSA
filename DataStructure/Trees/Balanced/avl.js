import { Queue } from "../../Queue/Queue.js";

class Node {
    value;
    left = null;
    right = null;
    height = 1;

    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

export class AVL {
    #root;
    #size = 0;

    constructor() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return !this.#size;
    }

    clear() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= AVL Balancing ================= */

    #insert(node, value) {
        if(!node) return new Node(value);

        if(value > node.value) node.right = this.#insert(node.right, value);
        else if(value < node.value) node.left = this.#insert(node.left, value);
        else return node;

        node.height = this.#getHeight(node);
        return this.#reBalance(node);
    }

    #delete(node, value) {
        if(!node) return null;
        else if(node.value > value) node.left = this.#delete(node.left, value);
        else if(node.value < value) node.right = this.#delete(node.right, value);
        else {
            if(!node.left && !node.right) return null;
            if(!node.left || !node.right) return node.left || node.right;
            else{
                const successor = this.findSuccessor(node);
                node.right = this.#delete(node.right, successor);
                node.value = successor;
                return this.#reBalance(node);
            }
        }
        return this.#reBalance(node);
    }

    #reBalance(node) {
        const bf = this.#balanceFactor(node);
        if(bf > 1){
            if(!node.left.left) node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node);    
        }else if(bf < -1){
            if(!node.right.right) node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node);
        }else return node;
    }

    #balanceFactor(node) {
        if(!node) return 0;
        return this.#getHeight(node.left) - this.#getHeight(node.right);
    }

    #rotateLeft(node) {
        let child = node.right;
        node.right = child.left;
        child.left = node;
        ++node.height;
        --child.height;
        return child;
    }

    #rotateRight(node) {
        let child = node.left;
        node.left = child.right;
        child.right = node;
        ++node.height;
        --child.height;
        return child;
    }

    #getHeight(node) {
        if(!node) return 0;
        let h1 = this.#getHeight(node.left);
        let h2 = this.#getHeight(node.right);
        return 1 + Math.max(h1, h2);
    }

    /* ================= Core AVL Operations ================= */

    insert(value) {
        if(this.search(value)) return;
        this.#root = this.#insert(this.#root, value);
        this.#root.height = this.#getHeight(this.#root);
        ++this.#size;
    }

    delete(value) {
        if(!this.#search(this.#root, value)) return;
        this.#root = this.#delete(this.#root, value);
        this.#root = this.#reBalance(this.#root);
        --this.#size;
    }

    search(value) {
        return this.#search(this.#root, value);
    }

    /* ================= Height / Min / Max ================= */

    getHeight() {
        return this.#getHeight(this.#root);
    }

    getMin() {
        return this.#getMin(this.#root);
    }

    getMax() {
        return this.#getMax(this.#root);
    }

    /* ================= Traversals ================= */

    levelOrder() {
        if(!this.#root) return [];
        const data = [];
        const queue = new Queue();
        queue.enqueue(this.#root);

        while(queue.size()){
            let level = queue.size();
            for(let i = 0; i < level; ++i){
                let node = queue.dequeue();
                data.push(node.value);
                if(node.left) queue.enqueue(node.left);
                if(node.right) queue.enqueue(node.right);
            }
        }
        return data;
    }

    preorder_rec() {
        if(!this.#root) return;
        console.log(this.#root.value);
        if(this.#root.left) this.preorder_rec(this.#root.left);
        if(this.#root.right) this.preorder_rec(this.#root.right);
    }

    preorder_itr() {
        let node = this.#root;
        const data = [];

        while(node){
            if(!node.left){
                data.push(node.value);
                node = node.right;
            }else{
                let predecessor = node.left;
                while(predecessor.right && predecessor.right !== node){
                    predecessor = predecessor.right;
                }
                if(!predecessor.right){
                    data.push(node.value);
                    node = node.left;
                }else{
                    predecessor.right = null;
                    node = node.right;
                }
            }
        }
    }

    inorder_rec() {
        if(!this.#root) return null;
        if(this.#root.left) inorder_rec(this.#root.left);
        console.log(this.#root.value);
        if(this.#root.right) inorder_rec(this.#root.right);
    }

    inorder_itr() {
        let node = this.#root;
        const data = [];
        while(node){
            if(!node.left){
                data.push(node.value);
                node = node.right;
            }else{
                let predessessor = node.left;
                while(predessessor.right && predessessor.right !== node){
                    predessessor = predessessor.right;
                } 
                if(!predessessor.right){
                    predessessor.right = node;
                    node = node.left;
                }else{
                    predessessor.right = null;
                    data.push(node.value);
                    node = node.right;
                }
            }
        }
        return data;
    }

    postorder_rec() {
        if(!this.#root) return;
        if(this.#root.left) this.postorder_rec(this.#root.left);
        if(this.#root.right) this.postorder_rec(this.#root.right);
        console.log(this.#root.value);
    }

    postorder_itr() {
        if(!this.#root) return [];
        const data = [];
        const stack = [this.#root];
        while(stack.length){
            const node = stack.pop();
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
        }
        for(let i = 0, j = data.length - 1; i < j; ++i, --j){
            [data[i], data[j]] = [data[j], data[i]];
        }
    }

    /* ================= BST Helpers ================= */

    #getMin(node) {
        if(!node.left) return node.value;
        return this.#getMin(node.left);
    }

    #getMax(node) {
        if(!node.right) return node.value;
        return this.#getMax(node.right);
    }

    #search(node, value) {
        if(!node) return false;
        if(node.value > value) return this.#search(node.left, value);
        if(node.value < value) return this.#search(node.right, value);
        else return true;
    }

    /* ================= DFS Helpers ================= */

    #preorder_rec(node, res) {
        if(!node) return;
        res.push(node.value);
        if(node.left) this.#preorder_rec(node.left, res);
        if(node.right) this.#preorder_rec(node.right, res);
    }

    #inorder_rec(node, res) {
        if(!node) return;
        if(node.left) this.#inorder_rec(node.left, res);
        res.push(node.value);
        if(node.right) this.#inorder_rec(node.right, res);
    }

    #postorder_rec(node, res) {
        if(!node) return;
        if(node.left) this.#postorder_rec(node.left, res);
        if(node.right) this.#postorder_rec(node.right, res);
        res.push(node.value);
    }

    /* ================= Advanced AVL Utilities ================= */

    isBalanced() {
        return Math.abs(this.#balanceFactor(this.#root)) <= 1;
    }

    validateBST() {
        let prev = -Infinity;
        let isValid = true;
        const inorder = (node) => {
            if(!node) return;
            inorder(node.left);
            if(prev > node.value) isValid = false;
            prev = node.value; 
            inorder(node.right);
        }
        inorder(this.#root);
        return isValid;
    }

    findSuccessor(node) {
        if(!node.right) throw new Error('Dont have successor!');
        let successor = this.#getMin(node.right);
        return successor;
    }

    findPredecessor(node) {
        if(!node.left) throw new Error('Dont have predecessor!');
        let predecessor = this.#getMax(node.left);
        return predecessor;
    }

    toArray() {
        const data = [];
        this.#inorder_rec(this.#root, data);
        return data;
    }

    clone() {
        if(!this.#root) return null;
        const tree = new Node(this.#root.value);
        const helper = (node, tree) => {
            if(!node) return;
            if(node.left){
                tree.left = new Node(node.left.value);
                helper(node.left, tree.left);
            }
            if(node.right){
                tree.right = new Node(node.right.value);
                helper(node.right, tree.right);
            }
        }
        helper(this.#root, tree);
        return tree;
    }

    equals(otherTree) {
        let isSameTrees = true;
        const isSame = (orig, other) => {
            if(!isSameTrees) return;
            if(!orig && !other) return;
            if(!orig || !other){
                isSameTrees = false;
                return;
            }
            isSame(orig.left, other.left);
            if(orig.value !== other.value){
                isSameTrees = false;
                return;
            }
            isSame(orig.right, other.right);
        }
        isSame(this.#root, otherTree.#root);
        return isSameTrees;
    }

    /* ================= Iteration ================= */

    *[Symbol.iterator]() {
        let data = this.inorder_itr();
        for(let i = 0; i < data.length; ++i){
            yield data[i];
        }
        return;
    }

    *values() {
        let data = this.inorder_itr();
        for(let i = 0; i < data.length; ++i){
            yield data[i];
        }
        return;
    }

    *entries() {
        let data = this.inorder_itr();
        for(let i = 0; i < data.length; ++i){
            yield [i, data[i]];
        }
        return;
    }
}