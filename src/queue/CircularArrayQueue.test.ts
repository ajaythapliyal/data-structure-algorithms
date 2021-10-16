import { CircularArrayQueue } from './CircularArrayQueue';

describe('CircularArrayQueue', () => {
  let queue: CircularArrayQueue<string>;
  const names = ['Michael', 'Jim', 'Dwight', 'Pam', 'Andy'];

  beforeEach(() => {
    queue = new CircularArrayQueue<string>(5);
  });

  it('should have initial length zero', () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  it('enqueue()', () => {
    names.forEach((name) => queue.enqueue(name));
    expect(() => {
      queue.enqueue('Creed');
    }).toThrow(Error);
    expect(queue.size()).toBe(5);
  });

  it('dequeue()', () => {
    names.forEach((name) => queue.enqueue(name));
    names.forEach((name) => expect(queue.dequeue()).toBe(name));
    expect(() => queue.dequeue()).toThrow(Error);
    expect(queue.size()).toBe(0);
  });

  it('front', () => {
    expect(() => queue.front()).toThrow(Error);
    names.forEach((name) => queue.enqueue(name));
    expect(queue.front()).toBe('Michael');
    expect(queue.size()).toBe(5);
  });

  it('combined', () => {
    names.forEach((name) => queue.enqueue(name));
    expect(() => {
      queue.enqueue('Creed');
    }).toThrow(Error);
    queue.dequeue();
    queue.dequeue();
    queue.enqueue('Creed');
    queue.enqueue('Erin');
    ['Dwight', 'Pam', 'Andy', 'Creed', 'Erin'].forEach((name) =>
      expect(queue.dequeue()).toBe(name)
    );
    expect(() => {
      queue.dequeue();
    }).toThrow(Error);
  });
});
