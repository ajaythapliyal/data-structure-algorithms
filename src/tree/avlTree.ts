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
        node.height =
          Math.max(node?.left?.height || 0, node?.right?.height || 0) + 1;
        if (this.isImbalanced(node)) return this.rebalance(node);
      }
      return node;
    };
    innerInsert(item, this.root);
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
      if (this.isLeftSubtreeLarger(targetNode)) {
        nodes.push(targetNode.left!);
        rotationType = `${rotationType}L`;
      } else if (this.isRightSubtreeLarger(targetNode)) {
        nodes.push(targetNode.right!);
        rotationType = `${rotationType}R`;
      } else {
        throw Error('Rotation type detection failed');
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
