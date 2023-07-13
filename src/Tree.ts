import { NoDe } from "./Node.js";
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
      }
    }
      this._deleteHelper(node.left, num, node);
      this._deleteHelper(node.right, num, node);
  }
}
