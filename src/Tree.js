import { NoDe } from "./Node.js";
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
                this.root = null;
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
                this.root = null;
                return;
            }
        }
        this._deleteHelper(node.left, num, node);
        this._deleteHelper(node.right, num, node);
    }
}
