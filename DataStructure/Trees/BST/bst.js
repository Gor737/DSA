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
        // Must remove node with given value if exists
        // Must preserve BST structure
        // Must correctly handle 3 cases:
        //   1) Leaf node
        //   2) Node with one child
        //   3) Node with two children
        // Must decrease size if node removed
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

    find_successor(value) {
        // Must return inorder successor of node
        // Smallest value greater than given value
        // If none → return null
    }

    find_predecessor(value) {
        // Must return inorder predecessor of node
        // Largest value smaller than given value
    }

    is_balanced() {
        // Must return true if tree is height-balanced
        // |height(left) - height(right)| <= 1 for all nodes
    }

    validate_BST() {
        // Must verify tree satisfies BST property
        // All nodes in left subtree < node < right subtree
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
        // Must return deep copy of entire tree
        // New tree must not share nodes
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
        // Must iterate tree in inorder (sorted order)
        // Must not modify tree
    }

    values() {
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
        // Must return minimum value in subtree
    }

    #_find_max(node) {
        if(!node.right) return node.value;
        return this.#_find_min(node.right);
        // Must return maximum value in subtree
    }

    #_get_height(node) {
        // Must compute subtree height recursively
    }

    #_inorder(node, result) {
        // Recursive inorder traversal helper
    }

    #_preorder(node, result) {
        // Recursive preorder traversal helper
    }

    #_postorder(node, result) {
        // Recursive postorder traversal helper
    }
}


