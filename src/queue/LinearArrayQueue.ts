import { Queue } from './queue';
export class LinearArrayQueue<T> implements Queue<T> {
  private frontIndex = 0;
  private rearIndex = 0;
  private queueStore: T[] = [];

  enqueue(element: T): void {
    this.queueStore[this.rearIndex++] = element;
  }
  dequeue(): T {
    if (this.isEmpty()) throw new Error('Queue Empty');
    return this.queueStore[this.frontIndex++];
  }
  front(): T {
    if (this.isEmpty()) throw new Error('Queue empty');
    return this.queueStore[this.frontIndex];
  }
  size(): number {
    return this.rearIndex - this.frontIndex;
  }
  isEmpty(): boolean {
    return this.frontIndex == this.rearIndex;
  }
}
