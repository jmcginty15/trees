/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /** isAncestor(node): return true if this node is an ancestor of the parameter node */

  isAncestor(node) {
    if (!this.left && !this.right) return false;
    const stack = [this];
    while (stack.length) {
      const nextNode = stack.pop();
      if (nextNode.left) {
        if (nextNode.left == node) return true;
        else stack.push(nextNode.left);
      }
      if (nextNode.right) {
        if (nextNode.right == node) return true;
        else stack.push(nextNode.right);
      }
    }
    return false;
  }

  /** maxSumLeft(): returns the max sum possible traveling downwards from the left child node
   * not including the current node's value */

  maxSumLeft() {
    if (this.left) return this.left.maxSum();
    else return 0;
  }

  /** maxSumRight(): returns the max sum possible traveling downwards from the right child node
   * not including the current node's value */

  maxSumRight() {
    if (this.right) return this.right.maxSum();
    else return 0;
  }

  /** maxSum(): returns the max sum possible traveling downwards from either child node
   * including the current node's value */

  maxSum() {
    const leftSum = this.maxSumLeft();
    const rightSum = this.maxSumRight();
    if (leftSum > rightSum) return leftSum + this.val;
    else return rightSum + this.val;
  }

  /** maxPathSum(): returns the max sum possible traveling through the current node
   * but not necessarily starting at it
   */

  maxPathSum() {
    let maxPathSum = this.val;
    const leftSum = this.maxSumLeft();
    const rightSum = this.maxSumRight();
    if (leftSum > 0) maxPathSum += leftSum;
    if (rightSum > 0) maxPathSum += rightSum;
    return maxPathSum;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let minDepth = null;
    const stack = [{ node: this.root, depth: 1 }];
    while (stack.length) {
      const current = stack.pop();
      if (!current.node.left && !current.node.right && (current.depth < minDepth || !minDepth)) minDepth = current.depth;
      else {
        if (current.node.left) stack.push({ node: current.node.left, depth: current.depth + 1 });
        if (current.node.right) stack.push({ node: current.node.right, depth: current.depth + 1 });
      }
    }
    return minDepth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    let maxDepth = 0;
    const stack = [{ node: this.root, depth: 1 }];
    while (stack.length) {
      const current = stack.pop();
      if (!current.node.left && !current.node.right && current.depth > maxDepth) maxDepth = current.depth;
      else {
        if (current.node.left) stack.push({ node: current.node.left, depth: current.depth + 1 });
        if (current.node.right) stack.push({ node: current.node.right, depth: current.depth + 1 });
      }
    }
    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;
    let maxSum = 0;
    const stack = [this.root];
    while (stack.length) {
      const nextNode = stack.pop();
      const maxNodeSum = nextNode.maxPathSum();
      if (maxNodeSum > maxSum) maxSum = maxNodeSum;
      if (nextNode.left) stack.push(nextNode.left);
      if (nextNode.right) stack.push(nextNode.right);
    }
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let nextLarger = null;
    const stack = [this.root];
    while (stack.length) {
      const nextNode = stack.pop();
      if (nextNode.val > lowerBound && (nextNode.val < nextLarger || !nextLarger)) nextLarger = nextNode.val;
      if (nextNode.left) stack.push(nextNode.left);
      if (nextNode.right) stack.push(nextNode.right);
    }
    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const stack = [{ node: this.root, depth: 1 }];
    let node1Depth = null;
    let node2Depth = null;
    while (stack.length) {
      const next = stack.pop();
      if (next.node.left == node1 && next.node.right == node2) return false;
      if (next.node.left == node2 && next.node.right == node1) return false;
      if (next.node == node1) node1Depth = next.depth;
      if (next.node == node2) node2Depth = next.depth;
      if (next.node.left) stack.push({ node: next.node.left, depth: next.depth + 1 });
      if (next.node.right) stack.push({ node: next.node.right, depth: next.depth + 1 });
    }
    return node1Depth === node2Depth;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    return tree.root ? JSON.stringify(tree) : 'null';
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(treeString) {
    if (treeString === 'null') return new BinaryTree;
    const tree = new BinaryTree;
    const obj = JSON.parse(treeString);
    const root = new BinaryTreeNode(obj.root.val, obj.root.left, obj.root.right);
    const stack = [root];
    while (stack.length) {
      const nextNode = stack.pop();
      if (nextNode.left) {
        const nextLeft = new BinaryTreeNode(nextNode.left.val, nextNode.left.left, nextNode.left.right);
        nextNode.left = nextLeft;
        stack.push(nextLeft);
      }
      if (nextNode.right) {
        const nextRight = new BinaryTreeNode(nextNode.right.val, nextNode.right.left, nextNode.right.right);
        nextNode.right = nextRight;
        stack.push(nextRight);
      }
    }
    tree.root = root;
    return tree;
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    if (!this.root) return null;
    if (node1.isAncestor(node2)) return node1;
    if (node2.isAncestor(node1)) return node2;
    let maxDepth = 0;
    let lowestCommonAncestor = this.root;
    const stack = [{ node: this.root, depth: 0 }];
    while (stack.length) {
      const nextNode = stack.pop();
      if (nextNode.node.isAncestor(node1) && nextNode.node.isAncestor(node2) && nextNode.depth > maxDepth) {
        maxDepth = nextNode.depth;
        lowestCommonAncestor = nextNode.node;
      }
      if (nextNode.node.left) stack.push({ node: nextNode.node.left, depth: nextNode.depth + 1 });
      if (nextNode.node.right) stack.push({ node: nextNode.node.right, depth: nextNode.depth + 1 });
    }
    return lowestCommonAncestor;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
