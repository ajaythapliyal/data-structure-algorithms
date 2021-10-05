import { Node } from './linkedList';

export class SinglyLinkedList<T> {
  private headNode: Node<T> | undefined;
  private length = 0;

  public append(item: T): void {
    if (this.isEmpty) {
      this.prepend(item);
      return;
    }
    const newNode = new Node(item);
    const lastNode = this.getLastNode()!;
    lastNode.next = newNode;
    this.length++;
  }

  public prepend(item: T): void {
    const newNode = new Node(item);
    newNode.next = this.headNode;
    this.headNode = newNode;
    this.length++;
  }

  public insert(item: T, position: number): void {
    if (this.isPositionInvalid(position)) this.append(item);
    else if (position == 1) this.prepend(item);
    else {
      const newNode = new Node(item);
      const [prevNode, nextNode] = this.getNodes(position);
      prevNode!.next = newNode;
      newNode!.next = nextNode;
      this.length++;
    }
  }

  public removeFirst(): void {
    if (this.isEmpty) return;
    this.headNode = this.headNode?.next;
    this.length--;
  }

  public removeLast(): void {
    if (this.isEmpty) return;
    if (this.size === 1) {
      this.removeFirst();
      return;
    }
    const prevNode = this.getNodes(this.size)[0];
    prevNode!.next = undefined;
    this.length--;
  }

  public remove(position: number): void {
    if (this.isPositionInvalid(position) || this.isEmpty) return;
    if (this.size === 1 || position === 1) {
      this.removeFirst();
      return;
    }
    const nodes = this.getNodes(position);
    const prevNode = nodes[0];
    const nextNode = nodes[1];
    prevNode!.next = nextNode!.next;
    this.length--;
  }

  public *values(): Generator<T, void, unknown> {
    let currentNode = this.headNode;
    while (currentNode) {
      yield currentNode.item;
      currentNode = currentNode.next;
    }
  }

  get size(): number {
    return this.length;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  private isPositionInvalid(position: number): boolean {
    return position < 1 || position > this.size;
  }

  private getLastNode(): Node<T> | undefined {
    return this.getNodes(this.size)[1];
  }

  private getNodes(
    position: number
  ): [Node<T> | undefined, Node<T> | undefined] {
    let prevNode = undefined;
    let nextNode = this.headNode;
    let currentPos = 1;
    while (nextNode?.next && currentPos < position) {
      prevNode = nextNode;
      nextNode = nextNode.next;
      currentPos = currentPos + 1;
    }
    return [prevNode, nextNode];
  }
}
