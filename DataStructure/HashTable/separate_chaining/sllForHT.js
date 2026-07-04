export class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    head;
    #size;

    constructor() {
        this.head = null;
        this.#size = 0;
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    insert(key, value) {
        let current = this.head;

        while (current) {
            if (current.key === key) {
                current.value = value;
                return false; 
            }
            current = current.next;
        }

        const node = new Node(key, value);
        node.next = this.head;
        this.head = node;

        this.#size++;
        return true; 
    }

    find(key) {
        let current = this.head;

        while (current) {
            if (current.key === key) {
                return current.value;
            }

            current = current.next;
        }

        return undefined;
    }

    remove(key) {
        if (!this.head) {
            return undefined;
        }

        if (this.head.key === key) {
            const removedValue = this.head.value;

            this.head = this.head.next;
            this.#size--;

            return removedValue;
        }

        let prev = this.head;
        let current = this.head.next;

        while (current) {
            if (current.key === key) {
                prev.next = current.next;
                this.#size--;

                return current.value;
            }

            prev = current;
            current = current.next;
        }

        return undefined;
    }

    containsKey(key) {
        let current = this.head;

        while (current) {
            if (current.key === key) {
                return true;
            }

            current = current.next;
        }

        return false;
    }

    keys() {
        const result = [];

        let current = this.head;

        while (current) {
            result.push(current.key);
            current = current.next;
        }

        return result;
    }

    values() {
        const result = [];

        let current = this.head;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }

    entries() {
        const result = [];

        let current = this.head;

        while (current) {
            result.push([current.key, current.value]);
            current = current.next;
        }

        return result;
    }

    clear() {
        this.head = null;
        this.#size = 0;
    }

    *[Symbol.iterator]() {
        let current = this.head;

        while (current) {
            yield [current.key, current.value];
            current = current.next;
        }
    }

    toString() {
        let result = "";
        let current = this.head;

        while (current) {
            result += `(${current.key}: ${current.value})`;

            if (current.next) {
                result += " -> ";
            }

            current = current.next;
        }

        return result || "empty";
    }
}