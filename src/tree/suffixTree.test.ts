import { SuffixTree } from './suffixTree';

describe('SuffixTree', () => {
  let tree: SuffixTree;

  // beforeEach(() => {
  //   tree = new SuffixTree(['b', 'a', 'n', 'a', 'n', 'a']);
  // });
  it('should build the suffix tree appropriately', () => {
    // tree = new SuffixTree(['b', 'a', 'n', 'a', 'n', 'a']);
    // const text = 'banana';
    // const text = 'mississippi';
    // const text = 'AAAAAAA';
    // const text = 'ABAABA';
    const text = 'ABBACABAA';
    // const text = 'AAABBB';
    // const text = 'ABRAKADABRA';
    // const text = 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED';
    const textArray: string[] = [];
    for (let index = 0; index < text.length; index++) {
      textArray.push(text[index]);
    }
    tree = new SuffixTree(textArray);
  });
});
