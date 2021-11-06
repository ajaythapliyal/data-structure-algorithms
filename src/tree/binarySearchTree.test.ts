import { BinarySearchTree } from './binarySearchTree';

describe('BinarySearchTree', () => {
  let tree: BinarySearchTree<number>;

  beforeEach(() => {
    tree = new BinarySearchTree<number>();
  });

  it('should return nothing on traversal', () => {
    const mockFn = jest.fn(() => 42);
    for (const item of tree.values()) {
      mockFn();
    }
    expect(mockFn).toBeCalledTimes(0);
  });

  it('should insert item in the tree', () => {
    const items = [50, 30, 75, 10, 40, 60, 90, 39, 41];
    const sortedItems = [...items].sort();
    let index = 0;
    items.forEach((item) => tree.insert(item));
    for (const item of tree.values()) {
      expect(item).toBe(sortedItems[index]);
      index++;
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
    it('should return with no side effect when tree is empty', () => {
      expect(tree.isEmpty).toBeTruthy();
      tree.delete(100);
      expect(tree.isEmpty).toBeTruthy();
    });

    it('should become empty when root is deleted provided tree has single item', () => {
      const mockFn = jest.fn(() => 42);
      expect(tree.isEmpty).toBeTruthy();
      tree.insert(100);
      expect(tree.isEmpty).toBeFalsy();
      tree.delete(100);
      expect(tree.isEmpty).toBeTruthy();
      for (const item of tree.values()) {
        mockFn();
      }
      expect(mockFn).toBeCalledTimes(0);
    });

    describe('delete operation on tree with more than 1  node', () => {
      function assert(deleteItem: number) {
        const items = [50, 30, 75, 10, 40, 60, 90, 39, 41];
        const expectedItems = items
          .filter((item) => item !== deleteItem)
          .sort();
        let index = 0;
        items.forEach((item) => tree.insert(item));
        tree.delete(deleteItem);
        for (const item of tree.values()) {
          expect(item).toBe(expectedItems[index]);
          index++;
        }
      }

      it('should delete the leaf node successfully', () => {
        assert(39);
      });

      it('should delete node with one child successfully', () => {
        assert(40);
      });

      it('should delete node with two child successfully', () => {
        assert(30);
      });

      it('should delete the root node successfully', () => {
        assert(50);
      });
    });
  });
});
