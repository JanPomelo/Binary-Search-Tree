//import { NoDe } from "./Node";
import { Tree } from "./Tree.js";
import { buildTree } from "./Tree.js";
function createRndmArray(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}
const myTree = new Tree(buildTree(createRndmArray(30)));
console.log(`Balanced:      ${myTree.isBalanced()}`);
console.log(`Level Order:   ${myTree.levelOrder()}`);
console.log(`Pre Order:     ${myTree.preOrder()}`);
console.log(`Post Order:   ${myTree.postOrder()}`);
console.log(`In Order:     ${myTree.inOrder()}`);
console.log("------------------------------------");
console.log("---Unbalance the Tree by adding numbers over 100---");
console.log("------------------------------------");
myTree.insert(120);
myTree.insert(150);
myTree.insert(2000);
myTree.insert(130);
myTree.insert(132320);
console.log(`Balanced:      ${myTree.isBalanced()}`);
console.log(`...Rebalance...`);
myTree.rebalance();
console.log(`Balanced:      ${myTree.isBalanced()}`);
console.log(`Level Order:   ${myTree.levelOrder()}`);
console.log(`Pre Order:     ${myTree.preOrder()}`);
console.log(`Post Order:   ${myTree.postOrder()}`);
console.log(`In Order:     ${myTree.inOrder()}`);
