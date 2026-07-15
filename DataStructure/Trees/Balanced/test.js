// ===================================================================
// AVL Test Suite
// ===================================================================
// Օգտագործման կարգը.
//   1. Համոզվիր, որ քո AVL ֆայլի վերջում ունես `export { AVL };`
//      (եթե դեռ չունես, ուղղակի ավելացրու ֆայլի ամենավերջում)։
//   2. Ներքևում փոխիր IMPORT_PATH-ը՝ քո AVL ֆայլի իրական path-ով
//      (հարաբերական՝ այս test ֆայլից)։
//   3. Աշխատացրու՝  node test_avl.mjs
//
// Թեստերն ընդգրկում են՝ insert/delete, size/is_empty, BST validity,
// AVL balance-ը (ներառյալ worst-case ascending insert), search,
// getMin/getMax, traversal-ներ (levelOrder, inorder_itr, toArray),
// iterator protocol, equals(), clone(), և մեկ մեծ random stress test։
// ===================================================================

import { AVL } from './avl.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`PASS: ${name}`);
        passed++;
    } catch (e) {
        console.log(`FAIL: ${name} -> ${e.message}`);
        failed++;
    }
}

function assertEqual(actual, expected, msg) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a !== e) {
        throw new Error(`${msg ? msg + ': ' : ''}expected ${e}, got ${a}`);
    }
}

// ------------------------------------------------------------------
// Basic insert / traversal correctness
// ------------------------------------------------------------------

test('insert + inorder_itr returns sorted values', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9].forEach(v => t.insert(v));
    assertEqual(t.inorder_itr(), [1, 3, 4, 5, 7, 8, 9]);
});

test('toArray matches inorder', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9].forEach(v => t.insert(v));
    assertEqual(t.toArray(), [1, 3, 4, 5, 7, 8, 9]);
});

test('levelOrder returns the correct number of values (non-empty tree)', () => {
    const t = new AVL();
    [5, 3, 8].forEach(v => t.insert(v));
    const out = t.levelOrder();
    if (out.length !== 3) throw new Error(`expected 3 values, got ${JSON.stringify(out)}`);
});

test('levelOrder on empty tree returns []', () => {
    const t = new AVL();
    assertEqual(t.levelOrder(), []);
});

// ------------------------------------------------------------------
// size() / is_empty()
// ------------------------------------------------------------------

test('size() tracks number of inserts', () => {
    const t = new AVL();
    t.insert(5);
    t.insert(3);
    t.insert(8);
    assertEqual(t.size(), 3);
});

test('inserting a duplicate value does not increase size', () => {
    const t = new AVL();
    t.insert(5);
    t.insert(5);
    assertEqual(t.size(), 1);
});

test('is_empty() correct before/after insert', () => {
    const t = new AVL();
    if (!t.is_empty()) throw new Error('expected empty on fresh tree');
    t.insert(5);
    if (t.is_empty()) throw new Error('expected non-empty after insert');
});

test('clear() empties the tree', () => {
    const t = new AVL();
    [5, 3, 8].forEach(v => t.insert(v));
    t.clear();
    if (!t.is_empty() || t.size() !== 0) throw new Error('expected empty tree after clear()');
});

// ------------------------------------------------------------------
// BST validity + AVL balance
// ------------------------------------------------------------------

test('validateBST after several inserts', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9, 2, 6].forEach(v => t.insert(v));
    if (!t.validateBST()) throw new Error('expected a valid BST');
});

test('isBalanced stays true after ascending inserts (worst case for a plain BST)', () => {
    const t = new AVL();
    for (let i = 1; i <= 31; i++) t.insert(i);
    if (!t.isBalanced()) {
        throw new Error(`tree should be balanced, height=${t.getHeight()} for 31 nodes`);
    }
    // AVL height for 31 nodes should stay close to log2(31) ~ 5
    if (t.getHeight() > 7) {
        throw new Error(`height too large for a balanced AVL: ${t.getHeight()}`);
    }
});

test('isBalanced stays true after descending inserts', () => {
    const t = new AVL();
    for (let i = 31; i >= 1; i--) t.insert(i);
    if (!t.isBalanced()) throw new Error('tree should be balanced after descending inserts');
});

// ------------------------------------------------------------------
// search / getMin / getMax
// ------------------------------------------------------------------

test('search finds existing values', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9].forEach(v => t.insert(v));
    if (!t.search(7)) throw new Error('expected search(7) to be true');
});

test('search rejects missing values', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9].forEach(v => t.insert(v));
    if (t.search(100)) throw new Error('expected search(100) to be false');
});

test('getMin / getMax correct', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9].forEach(v => t.insert(v));
    assertEqual(t.getMin(), 1);
    assertEqual(t.getMax(), 9);
});

// ------------------------------------------------------------------
// delete()
// ------------------------------------------------------------------

test('delete removes a leaf and keeps the BST valid', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9].forEach(v => t.insert(v));
    t.delete(1);
    const out = t.inorder_itr();
    if (out.includes(1)) throw new Error(`1 should have been deleted, got ${JSON.stringify(out)}`);
    if (!t.validateBST()) throw new Error('BST invalid after delete');
});

test('delete a node with two children keeps the BST valid', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9].forEach(v => t.insert(v));
    t.delete(5); // root, has two children
    const out = t.inorder_itr();
    if (out.includes(5)) throw new Error(`5 should have been deleted, got ${JSON.stringify(out)}`);
    if (!t.validateBST()) throw new Error('BST invalid after deleting a two-child node');
    assertEqual(out, [1, 3, 4, 7, 8, 9]);
});

test('delete decrements size correctly', () => {
    const t = new AVL();
    [5, 3, 8].forEach(v => t.insert(v));
    t.delete(3);
    assertEqual(t.size(), 2);
});

test('deleting a non-existent value does not change size', () => {
    const t = new AVL();
    [5, 3, 8].forEach(v => t.insert(v));
    t.delete(999);
    assertEqual(t.size(), 3);
});

test('tree stays balanced after many deletes', () => {
    const t = new AVL();
    for (let i = 1; i <= 31; i++) t.insert(i);
    for (let i = 1; i <= 20; i++) t.delete(i);
    if (!t.isBalanced()) throw new Error('tree should stay balanced after deletes');
    if (!t.validateBST()) throw new Error('tree should stay a valid BST after deletes');
    assertEqual(t.size(), 11);
});

// ------------------------------------------------------------------
// Iteration protocol
// ------------------------------------------------------------------

test('for...of iterates values in sorted order', () => {
    const t = new AVL();
    [5, 3, 8].forEach(v => t.insert(v));
    assertEqual([...t], [3, 5, 8]);
});

test('values() generator yields sorted values', () => {
    const t = new AVL();
    [5, 3, 8].forEach(v => t.insert(v));
    assertEqual([...t.values()], [3, 5, 8]);
});

test('entries() generator yields [index, value] pairs', () => {
    const t = new AVL();
    [5, 3, 8].forEach(v => t.insert(v));
    assertEqual([...t.entries()], [[0, 3], [1, 5], [2, 8]]);
});

// ------------------------------------------------------------------
// equals()
// ------------------------------------------------------------------

test('equals() is true for two identically-built trees', () => {
    const t1 = new AVL();
    const t2 = new AVL();
    [5, 3, 8, 1, 4].forEach(v => { t1.insert(v); t2.insert(v); });
    if (!t1.equals(t2)) throw new Error('expected trees to be equal');
});

test('equals() is false when trees differ', () => {
    const t1 = new AVL();
    const t2 = new AVL();
    [5, 3, 8, 1, 4].forEach(v => t1.insert(v));
    [5, 3, 8, 1, 9].forEach(v => t2.insert(v));
    if (t1.equals(t2)) throw new Error('expected trees to be unequal');
});

// ------------------------------------------------------------------
// clone()
// ------------------------------------------------------------------

test('clone() contains the same values as the original', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4, 7, 9].forEach(v => t.insert(v));
    const cloned = t.clone();
    if (!cloned || typeof cloned.toArray !== 'function') {
        throw new Error('clone() should return something usable like an AVL instance with a toArray() method');
    }
    assertEqual(cloned.toArray(), t.toArray());
});

test('clone() is independent from the original (no shared nodes)', () => {
    const t = new AVL();
    [5, 3, 8, 1, 4].forEach(v => t.insert(v));
    const cloned = t.clone();
    const before = t.toArray();
    cloned.insert(999); // mutate the clone
    const after = t.toArray();
    assertEqual(before, after, 'mutating the clone should not affect the original');
});

// ------------------------------------------------------------------
// Large randomized stress test
// ------------------------------------------------------------------

test('stress test: 500 random inserts stay a valid, balanced BST', () => {
    const t = new AVL();
    const seen = new Set();
    let count = 0;
    while (count < 500) {
        const v = Math.floor(Math.random() * 100000);
        if (!seen.has(v)) {
            seen.add(v);
            t.insert(v);
            count++;
        }
    }
    if (!t.validateBST()) throw new Error('BST invalid after 500 inserts');
    if (!t.isBalanced()) throw new Error('tree not balanced after 500 inserts');
    const expectedMaxHeight = Math.ceil(Math.log2(count + 1)) * 2; // generous margin
    if (t.getHeight() > expectedMaxHeight) {
        throw new Error(`height ${t.getHeight()} too large for ${count} nodes (expected <= ${expectedMaxHeight})`);
    }
    assertEqual(t.size(), count);
});

test('stress test: random inserts + random deletes stay valid', () => {
    const t = new AVL();
    const values = [];
    for (let i = 0; i < 300; i++) {
        const v = Math.floor(Math.random() * 50000);
        if (!values.includes(v)) {
            values.push(v);
            t.insert(v);
        }
    }
    // delete about half of them, in random order
    const shuffled = [...values].sort(() => Math.random() - 0.5);
    const toDelete = shuffled.slice(0, Math.floor(values.length / 2));
    toDelete.forEach(v => t.delete(v));

    if (!t.validateBST()) throw new Error('BST invalid after random deletes');
    if (!t.isBalanced()) throw new Error('tree not balanced after random deletes');
    assertEqual(t.size(), values.length - toDelete.length);

    const remaining = values.filter(v => !toDelete.includes(v)).sort((a, b) => a - b);
    assertEqual(t.toArray(), remaining, 'remaining values should match expected sorted list');
});

// ------------------------------------------------------------------

console.log(`\n--- ${passed} passed, ${failed} failed ---`);