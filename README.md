# Data structures & algorithms in TypeScript


## Trees : 

[**Binary search tree**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/tree/binarySearchTree.ts) : A node backed implementation of Binary search tree. BST helps with storage of data in such a manner that for each comparision search space is divided by half thus bringing down time complexity to O(log n). Having said that, the worst time complexity is still O(n) in case of skewed trees. 

[**AVL tree**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/tree/avlTree.ts) : A self balancing binary tree data structure. It improves over binary search tree by implementing a logic which rotates the tree as soon as the tree becomes unbalanced due to Insert or Delete operation. This keeps the time complexity to O(log n).

[**B tree**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/tree/bTree.ts) : A tree based self balancing data structure used for storing large quantities of data on the disk. Popular usage in Databases.

[**Suffix tree**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/tree/heap.ts) : Suffix tree builds the tree data structure based on all the suffixes of the input text. Searching over this tree allows for fast pattern matching.

[**Heap**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/tree/suffixTree.ts) : An array based min heap implementation. Keeps the tree in sorted order and always returns min element.


## Graph :

[**Graph**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/tree/suffixTree.ts) : An adjacency matrix graph with BFS and DFS operations.


## Elementary Data structures : 

[**Singly Linked List**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/linkedList/singlyLinkedList.ts) : A node based implementation of Singly linked list.

[**Doubly Linked List**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/linkedList/doublyLinkedList.ts) : A node based implementation of Doubly linked list.

[**Linear Queue**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/queue/LinearArrayQueue.ts) : An Array backed implementation of Linear queue.

[**Circular Queue**](https://github.com/ajaythapliyal/data-structure-algorithms/blob/main/src/queue/CircularArrayQueue.ts) : An implementation of fixed length Circular queue.
