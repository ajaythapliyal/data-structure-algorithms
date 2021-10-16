export class FixedLengthArray<T> {
  private items = new Array<T>();
  readonly maxLength: number;

  constructor(maxLength: number) {
    this.maxLength = maxLength;
  }

  public push(item: T): void {
    if (this.items.length > this.maxLength) throw new Error('array full');
    this.items.push(item);
  }

  public insert(item: T, index: number): void {
    if (index >= this.maxLength || index < 0) throw new Error('Invalid index');
    this.items[index] = item;
  }

  public get(index: number): T {
    if (index >= this.maxLength || index < 0) throw new Error('Invalid index');
    return this.items[index];
  }
}
