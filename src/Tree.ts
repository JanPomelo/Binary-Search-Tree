import { NoDe } from "./Node.js";
import { Queue } from "./Queue.js";
import { buildTree } from "./index.js";
export class Tree {
  root: NoDe | null;
  constructor(root: NoDe | null) {
    this.root = root;
  }

  insert(num: number): string | void {
    if (!this.root) {
      this.root = new NoDe(num);
      return `successfully added ${num} to the tree`;
    }
    const node: NoDe | null = this.root;
    return this._insertHelper(node, num);
  }

  private _insertHelper(node: NoDe, num: number): string | void {
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
    } else {
      if (!node.right) {
        node.setRight(new NoDe(num));
        return `${num} successfully added right of ${node.data}`;
      }
      return this._insertHelper(node.right, num);
    }
  }

  delete(num: number) {
    if (!this.root) {
      return "Tree is empty";
    }
    const node: NoDe = this.root;
    return this._deleteHelper(node, num, null);
  }

  private _deleteHelper(node: NoDe | null, num: number, prevNode: NoDe | null) {
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
          } else {
            prevNode.setRight(null);
            return;
          }
        }
        this.root = null;
        return;
      } else if (node.left && !node.right) {
        if (prevNode) {
          if (prevNode.data > node.data) {
            prevNode.setLeft(node.left);
            return;
          } else {
            prevNode.setRight(node.left);
            return;
          }
        }
        this.root = node.left;
        return;
      } else if (node.right && !node.left) {
        if (prevNode) {
          if (prevNode.data > node.data) {
            prevNode.setLeft(node.right);
            return;
          } else {
            prevNode.setRight(node.right);
            return;
          }
        }
        this.root = node.right;
        return;
      } else {
        let leftNode = node.right as NoDe;
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
          } else {
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

  find(value: number, node: NoDe | null = this.root): NoDe | void {
    if (!node) {
      const err = new Error(`The value ${value} is not in the Tree!`);
      console.log(err);
      return;
    }
    if (value === node?.data) {
      return node;
    }
    if (node.data > value) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrder(fun: Function | null = null) {
    if (this.root === null) {
      return [];
    }
    const queue: Queue = new Queue();
    queue.enqueue(this.root);
    const arr = [];
    while (!queue.isEmpty) {
      let node = queue.peek();
      if (!fun) arr.push(node.data);
      else fun(node.data);
      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
      queue.dequeue();
    }
    if (!fun) {
      return arr;
    }
    return;
  }

  inOrder(
    fun: Function | null = null,
    node: NoDe | null = this.root,
    arr: number[] = []
  ): any {
    if (!node) {
      return;
    }
    if (!fun) {
      let left = this.inOrder(null, node.left, arr);
      if (typeof left === "number") arr.push(left);
      arr.push(node.data);
      let right = this.inOrder(null, node.right, arr);
      if (typeof right === "number") arr.push(right);
    } else {
      this.inOrder(fun, node.left);
      fun(node);
      this.inOrder(fun, node.right);
    }
    return arr;
  }

  preOrder(
    fun: Function | null = null,
    node: NoDe | null = this.root,
    arr: number[] = []
  ): any {
    if (!node) {
      return;
    }
    if (!fun) {
      arr.push(node.data);
      let left = this.preOrder(null, node.left, arr);
      if (typeof left === "number") arr.push(left);
      let right = this.preOrder(null, node.right, arr);
      if (typeof right === "number") arr.push(right);
    } else {
      fun(node);
      this.preOrder(fun, node.left);
      this.preOrder(fun, node.right);
    }
    return arr;
  }

  postOrder(
    fun: Function | null = null,
    node: NoDe | null = this.root,
    arr: number[] = []
  ): any {
    if (!node) {
      return;
    }
    if (!fun) {
      let left = this.postOrder(null, node.left, arr);
      if (typeof left === "number") arr.push(left);
      let right = this.postOrder(null, node.right, arr);
      if (typeof right === "number") arr.push(right);
      arr.push(node.data);
    } else {
      this.postOrder(fun, node.left);
      this.postOrder(fun, node.right);
      fun(node);
    }
    return arr;
  }

  height(node: NoDe, depthCounter: number = 0, arr: number[] = []) {
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

  depth(
    node: NoDe,
    depthCounter: number = 0,
    curNode: NoDe | null = this.root
  ): number | void {
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
    } else {
      return this.depth(node, depthCounter + 1, curNode.right);
    }
  }

  isBalanced(node: NoDe | null = this.root): boolean {
    if (node) {
      console.log(node.data);
      if (!node.left && (node.right?.right || node.right?.left)) {
        return false;
      }
      if (!node.right && (node.left?.left || node.left?.right)) {
        return false;
      }
      if (!this.isBalanced(node?.left)) {
        return false;
      }
      if (!this.isBalanced(node?.right)) {
        return false;
      }
    }
    return true;
  }

  rebalance(): void {
    if (this.root === null) {
      return;
    }
    else {
      const arr = this.inOrder();
      this.root = buildTree(arr);
    }
  }

}
