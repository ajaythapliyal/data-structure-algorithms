import { BTreeNode } from './bTreeNode';

export class BTree<T> {
  private root: BTreeNode<T> | undefined = undefined;

  constructor(private degree: number = 2) {
    if (degree < 2) this.degree = 2;
  }

  public insert(item: T): void {
    if (this.isEmpty) this.root = new BTreeNode<T>(this.degree, true);

    const innerInsert = (
      node: BTreeNode<T>
    ): undefined | [T, BTreeNode<T>, BTreeNode<T>] => {
      if (node.isLeaf) {
        return node.insert(item);
      }
      const splitNodes = innerInsert(node.getChild(item));
      return splitNodes
        ? node.insert(splitNodes[0], splitNodes[1], splitNodes[2])
        : undefined;
    };

    const splitNodes = innerInsert(this.root!);
    if (splitNodes) {
      this.root = new BTreeNode<T>(this.degree);
      this.root.insert(splitNodes[0], splitNodes[1], splitNodes[2]);
    }
  }

  public hasOverflown(node: BTreeNode<T>): boolean {
    return node.size > this.maxChildren;
  }

  get maxChildren(): number {
    return this.degree;
  }

  get minChildren(): number {
    return Math.ceil(this.degree / 2);
  }

  get maxKeys(): number {
    return this.degree - 1;
  }

  get minKeys(): number {
    return this.minChildren - 1;
  }

  get isEmpty(): boolean {
    return this.root === undefined;
  }
}
