// Remove duplicates
const removeDuplicates = (array) => {
  return array.filter((item, index) => array.indexOf(item) === index);
};

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
    console.log("Empty Tree");
    return;
  } else if (array.length === 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  return merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid)));
};

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
        console.log("No Duplicate Values");
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
    if (newNode.data === root.data) {
      console.log("No Duplicate Values");
    } else if (newNode.data < root.data) {
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

  // Delete;
  delete(value, node = this.root) {
    if (value === undefined) {
      console.log("No Value Entered");
      return;
    }
    if (node === null) {
      return node;
    }
    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else {
      // Has 0 children
      if (node.left === null && node.right === null) {
        console.log(`Deleted ${value}`);
        return null;
      }
      // Has 1 child
      if (node.left === null) {
        console.log(`Deleted ${value}`);
        return node.right;
      } else if (node.right === null) {
        console.log(`Deleted ${value}`);
        return node.left;
      }
      // Has 2 children
      // Traverse tree to get lowest number that is greater than value
      let parent = node;
      let child = node.right;
      while (child.left) {
        parent = child;
        child = child.left;
      }
      // Determines which child of the parent to remove
      // Removes duplicate
      if (parent !== node) {
        parent.left = child.right;
      } else {
        parent.right = child.right;
      }
      // Node.data is replaced with lowest number that is greater than value
      node.data = child.data;
      console.log(`Deleted ${value}`);
    }
    return node;
  }

  // Find w/ loop
  find(value) {
    if (this.root === null) {
      console.log("Empty Tree");
    } else {
      let curr = this.root;
      while (curr) {
        if (value === curr.data) {
          console.log(curr);
          return;
        } else if (value < curr.data) {
          curr = curr.left;
        } else {
          curr = curr.right;
        }
      }
      console.log(`Node Not Found`);
    }
  }

  // Find w/ recursion
  findRecursion(value, root = this.root) {
    if (root === null) {
      console.log("Node Not Found");
      return;
    }
    if (value === root.data) {
      console.log(root);
    } else if (value < root.data) {
      this.findRecursion(value, root.left);
    } else {
      this.findRecursion(value, root.right);
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

  // Breadth-first
  levelOrder() {
    if (this.root === null) {
      return;
    }
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      console.log(node.data);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
}

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

const numbers = removeDuplicates([1, 1, 4, 2, 7, 6, 3, 5]);
const bst = new Tree(numbers);
prettyPrint(bst.root);
bst.delete(4);
prettyPrint(bst.root);
