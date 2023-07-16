import { NoDe } from "./Node.js";
import { Queue } from "./Queue.js";
export class Tree {
    constructor(root) {
        this.root = root;
    }
    insert(num) {
        if (!this.root) {
            this.root = new NoDe(num);
            return `successfully added ${num} to the tree`;
        }
        const node = this.root;
        return this._insertHelper(node, num);
    }
    _insertHelper(node, num) {
        if (node.data === num) {
            return `${num} already in the tree.`;
        }
        console.log(node.data);
        if (node.data > num) {
            if (!node.left) {
                node.setLeft(new NoDe(num));
                return `${num} successfully added left of ${node.data}`;
            }
            return this._insertHelper(node.left, num);
        }
        else {
            if (!node.right) {
                node.setRight(new NoDe(num));
                return `${num} successfully added right of ${node.data}`;
            }
            return this._insertHelper(node.right, num);
        }
    }
    delete(num) {
        if (!this.root) {
            return "Tree is empty";
        }
        const node = this.root;
        return this._deleteHelper(node, num, null);
    }
    _deleteHelper(node, num, prevNode) {
        if (node === null) {
            return;
        }
        console.log(node.data);
        if (node.data === num) {
            if (!node.left && !node.right) {
                if (prevNode) {
                    if (prevNode.data > node.data) {
                        prevNode.setLeft(null);
                        return;
                    }
                    else {
                        prevNode.setRight(null);
                        return;
                    }
                }
                this.root = null;
                return;
            }
            else if (node.left && !node.right) {
                if (prevNode) {
                    if (prevNode.data > node.data) {
                        prevNode.setLeft(node.left);
                        return;
                    }
                    else {
                        prevNode.setRight(node.left);
                        return;
                    }
                }
                this.root = node.left;
                return;
            }
            else if (node.right && !node.left) {
                if (prevNode) {
                    if (prevNode.data > node.data) {
                        prevNode.setLeft(node.right);
                        return;
                    }
                    else {
                        prevNode.setRight(node.right);
                        return;
                    }
                }
                this.root = node.right;
                return;
            }
            else {
                let leftNode = node.right;
                let origNode = node;
                while (leftNode.left) {
                    origNode = leftNode;
                    leftNode = leftNode.left;
                }
                if (prevNode) {
                    if (prevNode.data > node.data) {
                        if (node != origNode) {
                            origNode.setLeft(null);
                        }
                        prevNode.setLeft(leftNode);
                        console.log(node.left);
                        leftNode.setLeft(node.left);
                        if (node.right != leftNode) {
                            leftNode.setRight(node.right);
                        }
                        return;
                    }
                    else {
                        if (node != origNode) {
                            origNode.setLeft(null);
                        }
                        prevNode.setRight(leftNode);
                        leftNode.setLeft(node.left);
                        if (node.right != leftNode) {
                            leftNode.setRight(node.right);
                        }
                        return;
                    }
                }
                this.root = leftNode;
                if (node != origNode) {
                    origNode.setLeft(null);
                }
                leftNode.setLeft(node.left);
                if (node.right != leftNode) {
                    leftNode.setRight(node.right);
                }
                return;
            }
        }
        this._deleteHelper(node.left, num, node);
        this._deleteHelper(node.right, num, node);
    }
    find(value, node = this.root) {
        if (!node) {
            const err = new Error(`The value ${value} is not in the Tree!`);
            console.log(err);
            return;
        }
        if (value === (node === null || node === void 0 ? void 0 : node.data)) {
            return node;
        }
        if (node.data > value) {
            return this.find(value, node.left);
        }
        else {
            return this.find(value, node.right);
        }
    }
    levelOrder(fun = null) {
        if (this.root === null) {
            return [];
        }
        const queue = new Queue();
        queue.enqueue(this.root);
        const arr = [];
        while (!queue.isEmpty) {
            let node = queue.peek();
            if (!fun)
                arr.push(node.data);
            else
                fun(node.data);
            if (node.left)
                queue.enqueue(node.left);
            if (node.right)
                queue.enqueue(node.right);
            queue.dequeue();
        }
        if (!fun) {
            return arr;
        }
        return;
    }
    inOrder(fun = null, node = this.root, arr = []) {
        if (!node) {
            return;
        }
        if (!fun) {
            let left = this.inOrder(null, node.left, arr);
            if (typeof left === "number")
                arr.push(left);
            arr.push(node.data);
            let right = this.inOrder(null, node.right, arr);
            if (typeof right === "number")
                arr.push(right);
        }
        else {
            this.inOrder(fun, node.left);
            fun(node);
            this.inOrder(fun, node.right);
        }
        return arr;
    }
    preOrder(fun = null, node = this.root, arr = []) {
        if (!node) {
            return;
        }
        if (!fun) {
            arr.push(node.data);
            let left = this.preOrder(null, node.left, arr);
            if (typeof left === "number")
                arr.push(left);
            let right = this.preOrder(null, node.right, arr);
            if (typeof right === "number")
                arr.push(right);
        }
        else {
            fun(node);
            this.preOrder(fun, node.left);
            this.preOrder(fun, node.right);
        }
        return arr;
    }
    postOrder(fun = null, node = this.root, arr = []) {
        if (!node) {
            return;
        }
        if (!fun) {
            let left = this.postOrder(null, node.left, arr);
            if (typeof left === "number")
                arr.push(left);
            let right = this.postOrder(null, node.right, arr);
            if (typeof right === "number")
                arr.push(right);
            arr.push(node.data);
        }
        else {
            this.postOrder(fun, node.left);
            this.postOrder(fun, node.right);
            fun(node);
        }
        return arr;
    }
}
