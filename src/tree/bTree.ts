export class BTree {
  constructor(private pageSize: number) {}

  get maxKeys(): number {
    return this.pageSize;
  }

  get minKeys(): number {
    return Math.ceil(this.pageSize / 2);
  }
}
