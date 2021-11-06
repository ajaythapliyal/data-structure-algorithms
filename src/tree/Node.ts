export class Node<T> {
  constructor(
    public item: T,
    public parent?: Node<T>,
    public left?: Node<T>,
    public right?: Node<T>
  ) {}

  get isLeaf() {
    return !this.left && !this.right;
  }

  get hasOneChild() {
    return !this.left || !this.right;
  }
}
