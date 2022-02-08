import { Heap } from './heap';

describe('Heap', () => {
  function assertMin(elements: number[], expectedMin: number) {
    const heap = new Heap(elements);
    expect(heap.min).toBe(expectedMin);
  }
  it('should return minium element', () => {
    assertMin([43, 22, 55, 1, 8, 31, 12, 18, 21], 1);
    assertMin([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 0);
    assertMin(
      [
        31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14,
        13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
      ],
      1
    );
    assertMin([99], 99);
  });

  describe('insert', () => {
    it('should insert to appropriate loc', () => {
      const heap = new Heap([
        31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14,
        13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
      ]);

      heap.insert(0);

      expect(heap.min).toBe(0);
    });

    it('should perform repeated insertions correctly', () => {
      const heap = new Heap();
      [7, 10, 20, 3, 4, 49, 50].forEach((item) => heap.insert(item));
      expect(heap.min).toBe(3);
    });
  });

  describe('deleteMin', () => {
    it('should delete the minimum element', () => {
      const heap = new Heap([
        31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14,
        13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
      ]);
      heap.deleteMin();
      expect(heap.min).toBe(2);
    });

    it('should return undefined when heap empty', () => {
      const heap = new Heap();
      heap.insert(1);
      heap.deleteMin();
      expect(heap.min).toBe(undefined);
    });
  });
});
