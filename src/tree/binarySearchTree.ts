import { Node } from './Node';

export class BinarySearchTree<T> {
  constructor(private root?: Node<T>) {}

  public insert(item: T): void {
    if (this.isEmpty) {
      this.root = new Node(item);
      return;
    }
    innerInsert(item, this.root);

    function innerInsert(item: T, node: Node<T> | undefined) {
      if (!node) {
        node = new Node(item);
      } else if (item < node.item) {
        const newNode = innerInsert(item, node.left);
        node.left = newNode;
        newNode.parent = node;
      } else if (item > node.item) {
        const newNode = innerInsert(item, node.right);
        node.right = newNode;
        newNode.parent = node;
      }
      return node;
    }
  }

  public search(item: T): boolean {
    return !!this.getNode(item, this.root)?.item;
  }

  public *values(node = this.root): Generator<T, void, unknown> {
    if (!node) return;
    if (node.left) yield* this.values(node.left);
    yield node.item;
    if (node.right) yield* this.values(node.right);
  }

  public delete(item: T): void {
    const node = this.getNode(item, this.root);
    if (!node) return;

    const innerDelete = (node: Node<T>) => {
      const parent = node.parent;
      const nodeParentRelation =
        node.item === parent?.left?.item ? 'left' : 'right';
      if (node.isLeaf) {
        parent
          ? (parent[nodeParentRelation] = undefined)
          : (this.root = undefined);
        node.parent = undefined;
      } else if (node.hasOneChild) {
        const child = node.left ? 'left' : 'right';
        parent![nodeParentRelation] = node[child]!;
        node[child]!.parent = parent;
      } else {
        const successor = this.successor(node)!;
        node.item = successor.item;
        innerDelete(successor);
      }
    };

    innerDelete(node);
  }

  get isEmpty(): boolean {
    return this.root === undefined;
  }

  private getNode(item: T, node: Node<T> | undefined): Node<T> | undefined {
    if (!node) return undefined;
    else if (item === node.item) return node;

    const nextNode = item < node.item ? node.left : node.right;
    return this.getNode(item, nextNode);
  }

  private predecessor(node: Node<T>): Node<T> | undefined {
    if (!node.left) return;
    return this.findMax(node.left);
  }

  private successor(node: Node<T>): Node<T> | undefined {
    if (!node.right) return;
    return this.findMin(node.right);
  }

  private findMax(node: Node<T>): Node<T> {
    if (!node.right) return node;
    return this.findMax(node.right);
  }

  private findMin(node: Node<T>): Node<T> {
    if (!node.left) return node;
    return this.findMin(node.left);
  }
}
