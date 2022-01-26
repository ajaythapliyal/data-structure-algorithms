export class BTreeNode<T> {
  private keys = new Array<T>();
  private children: { [key: string]: BTreeNode<T> } = {};

  constructor(private degree = 2, public isLeaf = false) {
    if (degree < 2) this.degree = 2;
  }

  public key(index: number): T {
    return this.keys[index];
  }

  public insert(
    item: T,
    formerHalf?: BTreeNode<T>,
    latterHalf?: BTreeNode<T>
  ): [T, BTreeNode<T>, BTreeNode<T>] | undefined {
    let insertIndex = 0;
    while (insertIndex < this.keys.length) {
      if (this.keys[insertIndex] > item) {
        break;
      }
      insertIndex++;
    }
    let shiftIndex =
      insertIndex == this.keys.length ? -1 : this.keys.length - 1;
    while (shiftIndex >= insertIndex) {
      this.keys[shiftIndex + 1] = this.keys[shiftIndex];
      shiftIndex--;
    }
    this.keys[insertIndex] = item;
    if (formerHalf && latterHalf) {
      this.setChild(item, formerHalf);
      this.setChild(this.keys[insertIndex + 1], latterHalf);
    }
    return this.hasOverflown ? this.split() : undefined;
  }

  public getChild(item: T): BTreeNode<T> {
    let index = 0;
    while (index < this.keys.length) {
      if (this.keys[index] > item) {
        break;
      }
      index++;
    }
    const closestKey = String(this.key(index));
    return this.children[closestKey];
  }

  public *traverse(): Generator<T, void, unknown> {
    let index = 0;
    while (index <= this.keys.length) {
      const key = this.keys[index];
      if (!this.isLeaf) yield* this.children[String(key)].traverse();
      if (key != undefined) yield key;
      index++;
    }
  }

  private setChild(key: T | undefined, node: BTreeNode<T>): void {
    this.children[JSON.stringify(key)] = node;
  }

  private split(): [T, BTreeNode<T>, BTreeNode<T>] {
    const medianIndex =
      this.size % 2 ? Math.floor(this.size / 2) : this.size / 2 - 1;
    const promotedKey = this.keys[medianIndex];
    const formerHalf = new BTreeNode<T>(this.degree, this.isLeaf);
    const latterHalf = new BTreeNode<T>(this.degree, this.isLeaf);
    let index = 0;
    while (index < this.keys.length) {
      const key = this.keys[index];
      const child = this.children[String(key)];
      if (index < medianIndex) {
        formerHalf.insert(key);
        child && formerHalf.setChild(key, child);
      } else if (index > medianIndex) {
        latterHalf.insert(key);
        child && latterHalf.setChild(key, child);
      } else if (index === medianIndex) {
        child && formerHalf.setChild(undefined, child);
      }
      index++;
    }
    this.children['undefined'] &&
      latterHalf.setChild(undefined, this.children['undefined']);
    return [promotedKey, formerHalf, latterHalf];
  }

  public values(): IterableIterator<T> {
    return this.keys.values();
  }

  get hasOverflown(): boolean {
    return this.size > this.maxKeys;
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

  get size(): number {
    return this.keys.length;
  }
}
