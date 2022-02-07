export class Heap<T> {
  private elements: T[] = [];

  constructor(elements: T[]) {
    this.elements = elements;
    this.build();
  }

  get height(): number {
    return Math.floor(Math.log2(this.elements.length));
  }

  get min(): T {
    return this.elements[0];
  }

  private build(): void {
    let index = this.largestNonLeafIndex;
    while (index > -1) {
      this.heapify(index);
      index--;
    }
  }

  private heapify(index: number): void {
    const element = this.elements[index];
    const leftIndex = this.left(index);
    const rightIndex = this.right(index);
    if (leftIndex > this.elements.length || rightIndex > this.elements.length) {
      return;
    }
    const smallestChild =
      this.elements[leftIndex] < this.elements[rightIndex]
        ? leftIndex
        : rightIndex;
    if (element > this.elements[smallestChild]) {
      this.swap(index, smallestChild);
      this.heapify(smallestChild);
    }
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

  private swap(firstIndex: number, secondIndex: number): void {
    const temp = this.elements[firstIndex];
    this.elements[firstIndex] = this.elements[secondIndex];
    this.elements[secondIndex] = temp;
  }
}
