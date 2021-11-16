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

export class AvlNode<T> extends Node<T> {
  constructor(
    public item: T,
    public parent?: AvlNode<T>,
    public left?: AvlNode<T>,
    public right?: AvlNode<T>,
    public height = 0
  ) {
    super(item, parent, left, right);
  }
}
