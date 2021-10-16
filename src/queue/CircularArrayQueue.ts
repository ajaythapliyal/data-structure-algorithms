import { Queue } from './queue';
import { FixedLengthArray } from '../fixedLengthArray';

export class CircularArrayQueue<T> implements Queue<T> {
  private items: FixedLengthArray<T>;
  private frontIndex = 0;
  private rearIndex = 0;

  constructor(private maxLength: number) {
    this.items = new FixedLengthArray<T>(maxLength + 1);
  }

  enqueue(t: T): void {
    if (this.isFull()) throw new Error('Queue full');
    this.items.insert(t, this.rearIndex);
    this.rearIndex = this.rearIndex == this.maxLength ? 0 : this.rearIndex + 1;
  }

  dequeue(): T {
    if (this.isEmpty()) throw new Error('Queue empty');
    const item = this.items.get(this.frontIndex);
    this.frontIndex =
      this.frontIndex == this.maxLength ? 0 : this.frontIndex + 1;
    return item;
  }

  front(): T {
    if (this.isEmpty()) throw new Error('Queue empty');
    return this.items.get(this.frontIndex);
  }

  size(): number {
    const offset = this.rearIndex < this.frontIndex ? this.items.maxLength : 0;
    return this.rearIndex - this.frontIndex + offset;
  }

  isEmpty(): boolean {
    return this.frontIndex == this.rearIndex;
  }

  isFull(): boolean {
    return this.size() == this.maxLength;
  }
}
