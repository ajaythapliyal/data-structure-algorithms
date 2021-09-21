export interface Queue<T> {
  enqueue(t: T): void;
  dequeue(): T;
  front(): T;
  size(): number;
  isEmpty(): boolean;
}
