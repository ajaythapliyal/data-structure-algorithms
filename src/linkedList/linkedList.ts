export class Node<T> {
  public next: Node<T> | undefined = undefined;
  readonly item;
  constructor(item: T) {
    this.item = item;
  }
}
