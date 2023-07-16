import { NoDe } from "./Node.js";
import { Tree } from "./Tree.js";
import pkg from "lodash";
const { uniq } = pkg;

let myArr: number[] = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//let myArr2: number[] = [3, 4, 5, 6, 1, 2];
function sortAndFilterArray(array: number[]) {
  array.sort((a, b) => {
    return a - b;
  });
  array = uniq(array);
  //array = array.filter((item, index) => myArr.indexOf(item) === index);
  return array;
}

function buildTree(array: number[]): NoDe | null {
  if (array.length === 0) {
    const err = new Error("Array is empty");
    console.log(err);
    return null;
  }
  let sortedArray: number[] = sortAndFilterArray(array);
  const tree: NoDe | null = makeTree(sortedArray, 0, sortedArray.length - 1);
  return tree;
}

function makeTree(array: number[], start: number, end: number): NoDe | null {
  if (start > end) {
    return null;
  }
  let mid: number = Math.floor((start + end) / 2);
  let nodi = new NoDe(array[mid]);

  nodi.setLeft(makeTree(array, start, mid - 1));
  nodi.setRight(makeTree(array, mid + 1, end));

  return nodi;
}

const prettyPrint = (node: NoDe | null, prefix = "", isLeft = true) => {
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
const myTree = new Tree(buildTree(myArr));
myTree.insert(2);
prettyPrint(myTree.root);
//console.log(myTree.preOrder());
//const node: NoDe = myTree.find(27) as NoDe;
//console.log(myTree.depth(node));
console.log(myTree.isBalanced());
