import { NoDe } from "./Node.js";
import pkg from "lodash";
const { uniq } = pkg;
//let myArr: number[] = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let myArr2 = [3, 4, 5, 6, 1, 2];
function sortAndFilterArray(array) {
    array.sort((a, b) => {
        return a - b;
    });
    array = uniq(array);
    console.log(array);
    //array = array.filter((item, index) => myArr.indexOf(item) === index);
    return array;
}
function buildTree(array) {
    if (array.length === 0) {
        const err = new Error("Array is empty");
        console.log(err);
        return null;
    }
    let sortedArray = sortAndFilterArray(array);
    console.log(sortedArray);
    console.log(sortedArray.length - 1);
    const tree = makeTree(sortedArray, 0, sortedArray.length - 1);
    return tree;
}
function makeTree(array, start, end) {
    if (start > end) {
        return null;
    }
    let mid = Math.floor((start + end) / 2);
    console.log(array[mid]);
    let Nodi = new NoDe(array[mid]);
    Nodi.setLeft(makeTree(array, start, mid - 1));
    Nodi.setRight(makeTree(array, mid + 1, end));
    return Nodi;
}
console.log(buildTree(myArr2));
