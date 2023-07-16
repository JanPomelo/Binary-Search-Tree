import { NoDe } from "./Node.js";
import { Queue } from "./Queue.js";
import pkg from "lodash";
const { uniq } = pkg;
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
    height(node, depthCounter = 0, arr = []) {
        if (!node.left && !node.right) {
            arr.push(depthCounter);
        }
        if (node.left) {
            this.height(node.left, depthCounter + 1, arr);
        }
        if (node.right) {
            this.height(node.right, depthCounter + 1, arr);
        }
        return Math.max(...arr);
    }
    depth(node, depthCounter = 0, curNode = this.root) {
        if (!curNode) {
            const err = new Error(`The NoDe ${node} is not in the list.`);
            console.log(err);
            return;
        }
        if (curNode === node) {
            return depthCounter;
        }
        if (curNode.data > node.data) {
            return this.depth(node, depthCounter + 1, curNode.left);
        }
        else {
            return this.depth(node, depthCounter + 1, curNode.right);
        }
    }
    isBalanced(node = this.root) {
        var _a, _b, _c, _d;
        if (node) {
            if (!node.left && (((_a = node.right) === null || _a === void 0 ? void 0 : _a.right) || ((_b = node.right) === null || _b === void 0 ? void 0 : _b.left))) {
                return false;
            }
            if (!node.right && (((_c = node.left) === null || _c === void 0 ? void 0 : _c.left) || ((_d = node.left) === null || _d === void 0 ? void 0 : _d.right))) {
                return false;
            }
            if (!this.isBalanced(node === null || node === void 0 ? void 0 : node.left)) {
                return false;
            }
            if (!this.isBalanced(node === null || node === void 0 ? void 0 : node.right)) {
                return false;
            }
        }
        return true;
    }
    rebalance() {
        if (this.root === null) {
            return;
        }
        else {
            const arr = this.inOrder();
            this.root = buildTree(arr);
        }
    }
}
function sortAndFilterArray(array) {
    array.sort((a, b) => {
        return a - b;
    });
    array = uniq(array);
    //array = array.filter((item, index) => myArr.indexOf(item) === index);
    return array;
}
export function buildTree(array) {
    if (array.length === 0) {
        const err = new Error("Array is empty");
        console.log(err);
        return null;
    }
    let sortedArray = sortAndFilterArray(array);
    const tree = makeTree(sortedArray, 0, sortedArray.length - 1);
    return tree;
}
function makeTree(array, start, end) {
    if (start > end) {
        return null;
    }
    let mid = Math.floor((start + end) / 2);
    let nodi = new NoDe(array[mid]);
    nodi.setLeft(makeTree(array, start, mid - 1));
    nodi.setRight(makeTree(array, mid + 1, end));
    return nodi;
}
export const prettyPrint = (node, prefix = "", isLeft = true) => {
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
