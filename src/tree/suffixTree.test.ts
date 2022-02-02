import { SuffixTree } from './suffixTree';

describe('SuffixTree', () => {
  let tree: SuffixTree;

  // beforeEach(() => {
  //   tree = new SuffixTree(['b', 'a', 'n', 'a', 'n', 'a']);
  // });
  it('should build the suffix tree appropriately', () => {
    tree = new SuffixTree(['b', 'a', 'n', 'a', 'n', 'a']);
  });
});
