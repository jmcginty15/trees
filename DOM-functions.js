class TreeNode {
    constructor(node) {
        const childNodes = [];
        if (node.childNodes.length) for (let child of node.childNodes) if (child.tagName) childNodes.push(new TreeNode(child));

        if (node.tagName) this.tag = node.tagName;
        if (node.id) this.id = node.id;
        if (node.classList.length) this.classList = [];
        if (childNodes.length) this.childNodes = childNodes;

        if (node.classList.length) for (let className of node.classList) this.classList.push(className);
    }
}

class Tree {
    constructor(root) {
        if (root instanceof TreeNode) this.root = root;
        else this.root = new TreeNode(root);
    }

    getElementById(id) {
        if (!this.root) return null;
        const stack = [this.root];
        while (stack.length) {
            const next = stack.pop();
            if (next.id === id) return next;
            if (next.childNodes) for (let child of next.childNodes) stack.push(child);
        }
        return null;
    }

    getElementsByTagName(tag) {
        if (!this.root) return null;
        tag = tag.toUpperCase();
        const queue = [this.root];
        const elements = [];
        while (queue.length) {
            const next = queue.shift();
            if (next.tag === tag) elements.push(next);
            if (next.childNodes) for (let child of next.childNodes) queue.push(child);
        }
        return elements.length ? elements : null;
    }

    getElementsByClassName(className) {
        if (!this.root) return null;
        const queue = [this.root];
        const elements = [];
        while (queue.length) {
            const next = queue.shift();
            if (next.classList) if (next.classList.includes(className)) elements.push(next);
            if (next.childNodes) for (let child of next.childNodes) queue.push(child);
        }
        return elements.length ? elements : null;
    }
}
