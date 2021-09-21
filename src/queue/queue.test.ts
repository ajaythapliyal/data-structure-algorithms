import { Queue } from './queue';
import { LinearArrayQueue } from './LinearArrayQueue';

describe('queue', () => {
  let queue: Queue<string>;
  beforeEach(() => {
    queue = new LinearArrayQueue<string>();
  });

  test('insert element in the queue', () => {
    const names = ['Michael Scott', 'Jan Levinson', 'Gould'];
    names.forEach((name) => {
      queue.enqueue(name);
    });
    expect(queue.front()).toBe(names[0]);
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.size()).toBe(names.length);
  });

  test('remove element from the queue', () => {
    const names = ['Michael Scott', 'Jan Levinson', 'Gould'];
    names.forEach((name) => {
      queue.enqueue(name);
    });
    expect(queue.dequeue()).toBe(names[0]);
    expect(queue.front()).toBe(names[1]);
    expect(queue.size()).toBe(names.length - 1);
    expect(queue.isEmpty()).toBeFalsy();
  });

  test('removing from empty queue', () => {
    expect(queue.dequeue).toThrow(Error);
  });
});
