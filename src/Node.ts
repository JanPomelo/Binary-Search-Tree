export class NoDe {
  data: number;
  left: NoDe | null;
  right: NoDe | null;
  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  setLeft(left: NoDe | null) {
    this.left = left;
  }

  setRight(right: NoDe | null) {
    this.right = right;
  }
}
