/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    let sum = 0;
    const stack = [this.root];
    while (stack.length) {
      const nextNode = stack.pop();
      sum += nextNode.val;
      for (let child of nextNode.children) stack.push(child);
    }
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    let count = 0
    const stack = [this.root];
    while (stack.length) {
      const nextNode = stack.pop();
      if (nextNode.val % 2 === 0) count += 1;
      for (let child of nextNode.children) stack.push(child);
    }
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    let count = 0;
    const stack = [this.root];
    while (stack.length) {
      const nextNode = stack.pop();
      if (nextNode.val > lowerBound) count += 1;
      for (let child of nextNode.children) stack.push(child);
    }
    return count;
  }
}

module.exports = { Tree, TreeNode };
