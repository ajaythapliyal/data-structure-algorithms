interface Stack<T> {
  push(element: T): void;
  pop(): T;
  top(): T;
  size(): number;
  isEmpty(): boolean;
}

export class StackImpl<T> implements Stack<T> {
  private stack: T[] = [];
  private index = -1;

  push(element: T): void {
    this.stack[++this.index] = element;
  }
  pop(): T {
    if (this.isEmpty())
      throw new Error('Stack is empty......add element before removing');
    return this.stack[this.index--];
  }
  top(): T {
    if (this.isEmpty())
      throw new Error('Stack is empty......add element before removing');
    return this.stack[this.index];
  }
  size(): number {
    return this.index + 1;
  }
  isEmpty(): boolean {
    return this.index < 0;
  }
}
