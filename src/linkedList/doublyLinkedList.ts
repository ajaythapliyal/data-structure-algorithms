import { DoublyNode } from './linkedList';

export class DoublyLinkedList<T> {
  private headNode?: DoublyNode<T>;
  private length = 0;

  public append(item: T): void {
    if (this.isEmpty) {
      this.prepend(item);
      return;
    }
    const newNode = new DoublyNode(item);
    const lastNode = this.getLastNode()!;
    lastNode.next = newNode;
    newNode.prev = lastNode;
    this.length++;
  }

  public prepend(item: T): void {
    const newNode = new DoublyNode(item);
    newNode.next = this.headNode;
    this.headNode = newNode;
    this.length++;
  }

  public insert(item: T, position: number): void {
    if (this.isPositionInvalid(position)) this.append(item);
    else if (position == 1) this.prepend(item);
    else {
      const newNode = new DoublyNode(item);
      const [prevNode, nextNode] = this.getNodes(position);
      prevNode!.next = newNode;
      newNode.prev = prevNode;
      newNode!.next = nextNode;
      nextNode!.prev = newNode;
      this.length++;
    }
  }

  public removeFirst(): void {
    if (this.isEmpty) return;
    const lostNode = this.headNode;
    this.headNode = this.headNode?.next;
    if (this.headNode) this.headNode!.prev = undefined;
    lostNode!.next = undefined;
    this.length--;
  }

  public removeLast(): void {
    if (this.isEmpty) return;
    if (this.size === 1) {
      this.removeFirst();
      return;
    }
    const [prevNode, nextNode] = this.getNodes(this.size);
    prevNode!.next = undefined;
    nextNode!.prev = undefined;
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
    const targetNode = nodes[1];
    const nextNode = targetNode?.next;
    prevNode!.next = nextNode;
    if (nextNode) nextNode.prev = prevNode;
    targetNode!.next = undefined;
    targetNode!.prev = undefined;
    this.length--;
  }

  public removeItem(item: T): void {
    if (this.isEmpty) return;
    let target: DoublyNode<T> | undefined;
    let current = this.headNode;
    while (current) {
      if (current.item === item) {
        target = current;
        break;
      }
      current = current.next;
    }
    if (!target) return;
    if (target === this.headNode!) {
      this.removeFirst();
      return;
    }
    const predecessor = target.prev!;
    const successor = target.next;
    predecessor.next = successor;
    if (successor) successor.prev = predecessor;
    this.length--;
  }

  public *values(): Generator<T, void, unknown> {
    let currentNode = this.headNode;
    while (currentNode) {
      yield currentNode.item;
      currentNode = currentNode.next;
    }
  }

  public *reverseValues(
    node = this.headNode,
    pointer = 1
  ): Generator<T, void, unknown> {
    if (pointer > this.size) return;
    yield* this.reverseValues(node?.next, pointer + 1);
    yield node!.item;
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

  private getLastNode(): DoublyNode<T> | undefined {
    return this.getNodes(this.size)[1];
  }

  private getNodes(
    position: number
  ): [DoublyNode<T> | undefined, DoublyNode<T> | undefined] {
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
