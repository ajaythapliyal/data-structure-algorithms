import { AvlTree } from './avlTree';

describe('AvlTree', () => {
  let tree: AvlTree<number>;

  beforeEach(() => {
    tree = new AvlTree<number>();
  });

  describe('insert', () => {
    testInsert([20, 4, 15]);
    testInsert([50, 60, 70]);
    testInsert([70, 60, 50]);
    testInsert([20, 25, 15]);
    testInsert([20, 4, 26, 3, 9, 15]);
    testInsert([
      34, 87, 70, 100, 73, 60, 97, 81, 20, 3, 33, 61, 35, 72, 80, 46, 84, 44,
      64, 74
    ]);
    testInsert([92, 3, 100, 1, 44, 34]);
    testInsert([20, 4, 26, 3, 9, 21, 30, 2, 7, 11, 15]);
    testInsert([20, 4, 26, 3, 9, 8]);
    testInsert([20, 4, 26, 3, 9, 21, 30, 2, 7, 11, 8]);

    beforeEach(() => {
      tree = new AvlTree<number>();
    });

    function testInsert(input: number[]) {
      it('should insert element', () => {
        const output = Array.from(input).sort((a, b) => a - b);
        let index = 0;
        input.forEach((item) => {
          tree.insert(item);
        });
        for (const item of tree.values()) {
          expect(item).toBe(output[index]);
          index++;
        }

        expect(tree.height).toBeGreaterThanOrEqual(
          Math.ceil(Math.log2(input.length + 1))
        );
        expect(tree.height).toBeLessThanOrEqual(
          Math.floor(1.44 * Math.log2(input.length + 2) - 0.328)
        );
      });
    }
  });

  describe('search', () => {
    it('should return true if item is found', () => {
      const items = [50, 30, 75, 10, 40, 60, 90, 39, 41];
      items.forEach((item) => tree.insert(item));
      expect(tree.search(75)).toBeTruthy();
    });

    it('should return false if tree is empty', () => {
      expect(tree.search(42)).toBeFalsy();
    });

    it('should return false when item is not present', () => {
      const items = [50, 30, 75, 10, 40, 60, 90, 39, 41];
      items.forEach((item) => tree.insert(item));
      expect(tree.search(100)).toBeFalsy();
    });
  });

  describe('delete', () => {
    testDelete([100, 40, 140, 10], 140);
    testDelete([92, 3, 100, 1, 44], 100);
    testDelete([92], 92);
    testDelete([50, 30, 75, 10, 40, 60, 90, 39, 41], 39);
    testDelete([50, 30, 75, 10, 40, 60, 90, 39, 41], 40);
    testDelete([50, 30, 75, 10, 40, 60, 90, 39, 41], 30);
    testDelete([50, 30, 75, 10, 40, 60, 90, 39, 41], 50);

    function testDelete(input: number[], itemDel: number) {
      it('should delete element', () => {
        const output = Array.from(input)
          .filter((item) => item != itemDel)
          .sort((a, b) => a - b);
        let index = 0;
        input.forEach((item) => {
          tree.insert(item);
        });
        tree.delete(itemDel);
        for (const item of tree.values()) {
          expect(item).toBe(output[index]);
          index++;
        }

        expect(tree.height).toBeGreaterThanOrEqual(
          Math.ceil(Math.log2(output.length + 1))
        );
        expect(tree.height).toBeLessThanOrEqual(
          Math.floor(1.44 * Math.log2(output.length + 2) - 0.328)
        );
      });
    }
  });
});
