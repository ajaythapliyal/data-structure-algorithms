import { AvlNode } from './Node';

export class AvlTree<T> {
  constructor(private root?: AvlNode<T>) {}

  public insert(item: T): void {
    if (this.isEmpty) {
      this.root = new AvlNode(item);
      return;
    }

    const innerInsert = (item: T, node: AvlNode<T> | undefined) => {
      if (!node) {
        node = new AvlNode(item);
      } else {
        const relationship: 'left' | 'right' =
          item < node.item ? 'left' : 'right';
        const newNode = innerInsert(item, node[relationship]);
        node[relationship] = newNode;
        newNode.parent = node;
        this.calculateHeight(node);
        if (this.isImbalanced(node)) return this.rebalance(node);
      }
      return node;
    };
    innerInsert(item, this.root);
  }

  public search(item: T): boolean {
    return !!this.getNode(item, this.root)?.item;
  }

  public delete(item: T): void {
    const node = this.getNode(item, this.root);
    if (!node) return;

    const innerDelete: (node: AvlNode<T>) => AvlNode<T> | undefined = (
      node: AvlNode<T>
    ) => {
      const parent = node.parent;
      const nodeParentRelation =
        node.item === parent?.left?.item ? 'left' : 'right';
      if (node.isLeaf) {
        parent
          ? (parent[nodeParentRelation] = undefined)
          : (this.root = undefined);
        node.parent = undefined;
        return parent;
      } else if (node.hasOneChild) {
        const child = node.left ? 'left' : 'right';
        parent![nodeParentRelation] = node[child]!;
        node[child]!.parent = parent;
        return node.parent;
      } else {
        const successor = this.successor(node)!;
        node.item = successor.item;
        return innerDelete(successor);
      }
    };

    let parentToDeletedNode = innerDelete(node);

    while (parentToDeletedNode) {
      this.calculateHeight(parentToDeletedNode);
      parentToDeletedNode = this.isImbalanced(parentToDeletedNode)
        ? this.rebalance(parentToDeletedNode)
        : parentToDeletedNode.parent;
    }
  }

  public *values(node = this.root): Generator<T, void, unknown> {
    if (!node) return;
    if (node.left) yield* this.values(node.left);
    yield node.item;
    if (node.right) yield* this.values(node.right);
  }

  get isEmpty(): boolean {
    return this.root === undefined;
  }

  get height(): number {
    return this.root ? this.root.height + 1 : 0;
  }

  private rebalance(node: AvlNode<T>): AvlNode<T> {
    let rotationType = '';
    const nodes: AvlNode<T>[] = [node];
    [0, 1].forEach((index) => {
      const targetNode = nodes[index];
      if (this.isRightSubtreeLarger(targetNode)) {
        nodes.push(targetNode.right!);
        rotationType = `${rotationType}R`;
      } else {
        nodes.push(targetNode.left!);
        rotationType = `${rotationType}L`;
      }
    });
    return this.rotate(nodes, rotationType)!;
  }

  private rotate(
    nodes: AvlNode<T>[],
    rotationType: string
  ): AvlNode<T> | undefined {
    const [node1, node2, node3] = nodes;
    if (rotationType == 'LL') {
      return this.leftRotate([node1, node2]);
    } else if (rotationType == 'RR') {
      return this.rightRotate([node1, node2]);
    } else if (rotationType == 'LR') {
      this.rightRotate([node2, node3]);
      return this.leftRotate([node1, node3]);
    } else if (rotationType == 'RL') {
      this.leftRotate([node2, node3]);
      return this.rightRotate([node1, node3]);
    }
    return undefined;
  }

  private leftRotate(nodes: [AvlNode<T>, AvlNode<T>]): AvlNode<T> {
    return this.singleRotate(nodes, 'left');
  }

  private rightRotate(nodes: [AvlNode<T>, AvlNode<T>]): AvlNode<T> {
    return this.singleRotate(nodes, 'right');
  }

  private singleRotate(
    nodes: [AvlNode<T>, AvlNode<T>],
    direction: 'left' | 'right'
  ) {
    const oppositeDirection: 'left' | 'right' =
      direction === 'left' ? 'right' : 'left';
    const [node1, node2] = nodes;
    if (!node1.parent) {
      this.root = node2;
      node2.parent = undefined;
    } else {
      const relation = node1.item > node1.parent.item ? 'right' : 'left';
      node1.parent![relation] = node2;
      node2.parent = node1.parent;
    }
    node1[direction] = node2[oppositeDirection];
    node2[oppositeDirection] = node1;
    node1.parent = node2;
    this.calculateHeight(node1, node2);
    return node2;
  }

  private getNode(
    item: T,
    node: AvlNode<T> | undefined
  ): AvlNode<T> | undefined {
    if (!node) return undefined;
    else if (item === node.item) return node;

    const nextNode = item < node.item ? node.left : node.right;
    return this.getNode(item, nextNode);
  }

  private successor(node: AvlNode<T>): AvlNode<T> | undefined {
    if (!node.right) return;
    return this.findMin(node.right);
  }

  private findMin(node: AvlNode<T>): AvlNode<T> {
    if (!node.left) return node;
    return this.findMin(node.left);
  }

  private balanceFactor(node: AvlNode<T>): number {
    const heightLeft = node.left ? node.left.height + 1 : 0;
    const heightRight = node.right ? node.right.height + 1 : 0;
    return heightLeft - heightRight;
  }

  private isImbalanced(node: AvlNode<T>): boolean {
    const balanceFactor = this.balanceFactor(node);
    return balanceFactor >= 2 || balanceFactor <= -2;
  }

  private isLeftSubtreeLarger(node: AvlNode<T>): boolean {
    return this.balanceFactor(node) > 0;
  }

  private isRightSubtreeLarger(node: AvlNode<T>): boolean {
    return this.balanceFactor(node) < 0;
  }

  private calculateHeight(...nodes: AvlNode<T>[]): void {
    nodes.forEach(
      (node) =>
        (node.height = node.isLeaf
          ? 0
          : Math.max(node?.left?.height || 0, node?.right?.height || 0) + 1)
    );
  }
}
