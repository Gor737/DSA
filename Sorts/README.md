# 🔄 Sorting Algorithms

A collection of fundamental and advanced sorting algorithms implemented as part of the **DSA (Data Structures & Algorithms)** repository.

Sorting is one of the most important topics in Computer Science. It is used to organize data, improve search efficiency, and serves as a foundation for many advanced algorithms.

---

## 📚 Implemented Algorithms

### 🟢 Simple Sorting Algorithms

#### 1. Insertion Sort

Builds the final sorted array one element at a time by inserting each element into its correct position.

* Time Complexity:

  * Best: `O(n)`
  * Average: `O(n²)`
  * Worst: `O(n²)`
* Space Complexity: `O(1)`
* Stable: ✅

---

#### 2. Bubble Sort

Repeatedly compares adjacent elements and swaps them if they are in the wrong order.

* Time Complexity:

  * Best: `O(n)`
  * Average: `O(n²)`
  * Worst: `O(n²)`
* Space Complexity: `O(1)`
* Stable: ✅

---

#### 3. Selection Sort

Finds the minimum element and places it in its correct position during each iteration.

* Time Complexity:

  * Best: `O(n²)`
  * Average: `O(n²)`
  * Worst: `O(n²)`
* Space Complexity: `O(1)`
* Stable: ❌

---

#### 4. Counting Sort

Counts occurrences of each element and reconstructs the sorted sequence.

* Time Complexity: `O(n + k)`
* Space Complexity: `O(k)`
* Stable: ✅
* Non-Comparison Based Sorting

> `k` = range of input values.

---

## 🚀 Advanced Sorting Algorithms

### 5. Merge Sort

Uses the Divide & Conquer paradigm by recursively splitting the array and merging sorted halves.

* Time Complexity:

  * Best: `O(n log n)`
  * Average: `O(n log n)`
  * Worst: `O(n log n)`
* Space Complexity: `O(n)`
* Stable: ✅

---

### 6. Quick Sort

Selects a pivot element and partitions the array around it.

* Time Complexity:

  * Best: `O(n log n)`
  * Average: `O(n log n)`
  * Worst: `O(n²)`
* Space Complexity: `O(log n)`
* Stable: ❌

---

### 7. Cumulative Counting Sort

An optimized variation of Counting Sort that uses cumulative frequencies to determine the exact position of elements.

* Time Complexity: `O(n + k)`
* Space Complexity: `O(k)`
* Stable: ✅
* Non-Comparison Based Sorting

---

## 📊 Complexity Comparison

| Algorithm                | Best       | Average    | Worst      | Space    |
| ------------------------ | ---------- | ---------- | ---------- | -------- |
| Insertion Sort           | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Bubble Sort              | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Selection Sort           | O(n²)      | O(n²)      | O(n²)      | O(1)     |
| Counting Sort            | O(n+k)     | O(n+k)     | O(n+k)     | O(k)     |
| Merge Sort               | O(n log n) | O(n log n) | O(n log n) | O(n)     |
| Quick Sort               | O(n log n) | O(n log n) | O(n²)      | O(log n) |
| Cumulative Counting Sort | O(n+k)     | O(n+k)     | O(n+k)     | O(k)     |

---

## 🎯 Learning Goals

This project aims to:

* Understand how sorting algorithms work internally.
* Compare algorithmic complexities.
* Learn when to use each sorting technique.
* Practice Data Structures & Algorithms fundamentals.
* Build a strong foundation for coding interviews and competitive programming.

---

## 📁 Repository Structure

```text
Sorting/
│
├── InsertionSort/
├── BubbleSort/
├── SelectionSort/
├── CountingSort/
│
├── MergeSort/
├── QuickSort/
└── CumulativeCountingSort/
```

---

## 🧠 Key Takeaway

There is no universally "best" sorting algorithm.

* Use **Insertion Sort** for small or nearly sorted datasets.
* Use **Merge Sort** when stability is required.
* Use **Quick Sort** for fast average-case performance.
* Use **Counting Sort** when the value range is limited.

Choosing the right algorithm depends on the data size, memory constraints, and performance requirements.
