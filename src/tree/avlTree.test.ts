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
    //testInsert([...Array(100).keys()]);

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
});
