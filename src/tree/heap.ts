export class Heap<T> {
  private elements: T[] = [];

  constructor(elements: T[]) {
    this.elements = elements;
    this.build();
  }

  get height(): number {
    return Math.floor(Math.log2(this.elements.length));
  }

  private build(): void {
    let index = this.largestNonLeafIndex;
    while (index > -1) {
      this.heapify(index);
      index--;
    }
  }

  private heapify(index: number): void {
    //please heapify
    const element = this.elements[index];
    const left = this.elements[this.left(index)];
  }

  private left(index: number): number {
    return 2 * (index + 1) - 1;
  }

  private right(index: number): number {
    return 2 * (index + 1);
  }

  private get largestNonLeafIndex(): number {
    return Math.pow(2, this.height) - 2;
  }
}
