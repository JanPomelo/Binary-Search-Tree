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
}
