export class Node<T> {
  public next?: Node<T>;
  readonly item;
  constructor(item: T) {
    this.item = item;
  }
}

export class DoublyNode<T> {
  public next?: DoublyNode<T>;
  public prev?: DoublyNode<T>;
  readonly item;
  constructor(item: T) {
    this.item = item;
  }
}
