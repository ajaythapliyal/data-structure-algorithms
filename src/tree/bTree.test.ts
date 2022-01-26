import { BTree } from './bTree';

describe('BTree', () => {
  let tree: BTree<number>;

  beforeEach(() => {
    tree = new BTree<number>(5);
  });

  describe('insert', () => {
    it('should insert all elements into the tree', () => {
      const items = [
        33, 22, 43, 1, 5, 18, 32, 45, 82, 31, 17, 7, 0, 34, 35, 36, 37, 38
      ];
      const expectedItems = items.slice().sort((a, b) => a - b);
      items.forEach((item) => tree.insert(item));
      let index = 0;
      for (const item of tree.traverse()) {
        expect(item).toBe(expectedItems[index]);
        index++;
      }
    });
  });
});
