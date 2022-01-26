import { BTreeNode } from './bTreeNode';

describe('BTreeNode', () => {
  let node: BTreeNode<number>;

  beforeEach(() => {
    node = new BTreeNode<number>(5);
  });

  describe('insert', () => {
    it('should insert the item on empty node', () => {
      const expectList = [55];
      let index = 0;
      expect(node.size).toBe(0);
      node.insert(55);
      expect(node.size).toBe(1);
      for (const item of node.values()) {
        expect(item).toBe(expectList[index]);
        index++;
      }
    });

    it('should insert the item in sorted order', () => {
      const insertList = [88, 0, 32, 75];
      const expectList = insertList.slice().sort((a, b) => a - b);
      insertList.forEach((item) => node.insert(item));
      let index = 0;
      expect(node.size).toBe(4);
      for (const item of node.values()) {
        expect(item).toBe(expectList[index]);
        index++;
      }
    });
  });
});
