// Sorts array
const merge = (array1, array2) => {
  const merged = [];

  while (array1.length && array2.length) {
    if (array1[0] < array2[0]) {
      merged.push(array1.shift());
    } else if (array1[0] > array2[0]) {
      merged.push(array2.shift());
    } else {
      merged.push(array1.shift(), array2.shift());
    }
  }

  return [...merged, ...array1, ...array2];
};

const mergeSort = (array) => {
  if (array.length === 0) {
    console.log("Empty Array");
    return;
  } else if (array.length === 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  return merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid)));
};

// Classes
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(mergeSort(array), 0, array.length - 1);
  }

  // Insert w/ loop
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let curr = this.root;

    while (curr) {
      if (value === curr.data) {
        console.log("Duplicate Value");
        return;
      }

      if (value < curr.data) {
        if (curr.left === null) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      } else {
        if (curr.right === null) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      }
    }
  }

  // Insert w/ recursion
  insertRecursion(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNodeRecursion(this.root, newNode);
    }
  }

  insertNodeRecursion(root, newNode) {
    if (newNode.data < root.data) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNodeRecursion(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNodeRecursion(root.right, newNode);
      }
    }
  }

  // Depth-first
  preOrder(node = this.root) {
    if (node === null) {
      return;
    }
    console.log(node.data);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  inOrder(node = this.root) {
    if (node === null) {
      return;
    }
    this.inOrder(node.left);
    console.log(node.data);
    this.inOrder(node.right);
  }

  postOrder(node = this.root) {
    if (node === null) {
      return;
    }
    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.data);
  }
}

// Function to build tree
// Returns middle of array (root)
const buildTree = (array, start, end) => {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const node = new Node(array[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
};

// From TOP to help visualize tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const numbers = [1, 4, 2, 7, 6, 3, 5];
const bst = new Tree(numbers);
bst.insert(8);
bst.insertRecursion(0);
prettyPrint(bst.root);
