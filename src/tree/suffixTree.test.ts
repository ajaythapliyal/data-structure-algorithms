import { SuffixTree } from './suffixTree';

describe('SuffixTree', () => {
  let tree: SuffixTree;

  describe('search', () => {
    function assert(
      document: string,
      searchText: string,
      expectedIndex: number[]
    ) {
      const docArray = Array.from(document);
      tree = new SuffixTree(docArray);
      const searchTextArray = Array.from(searchText);
      const matchLoc = tree.search(searchTextArray);
      matchLoc.forEach((loc) => {
        expect(document.substr(loc, searchText.length)).toBe(searchText);
        expect(expectedIndex.includes(loc)).toBeTruthy();
      });
      expect(matchLoc.length).toBe(expectedIndex.length);
    }

    it('should build and search the text corectly', () => {
      assert('mississippi', 'iss', [1, 4]);
      assert('mississippi', 'mississippi', [0]);
      assert('mississippi', 'miss', [0]);
      assert('mississippi', 'abc', []);
      assert('mississippi', 'p', [8, 9]);

      assert('ABBACABAA', 'BAC', [2]);
      assert('ABBACABAA', 'A', [0, 3, 5, 7, 8]);

      assert('ABAABA', 'BA', [1, 4]);
      assert('ABAABA', 'AAB', [2]);

      assert(
        `LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED`,
        ' ',
        [5, 11, 17, 21, 27, 39, 50, 56]
      );

      assert(
        `LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED`,
        'CONSECTETUR',
        [28]
      );

      assert(
        `It was not an auspicious beginning for the career I would have as student, academic administrator and faculty member at an Ivy League university. But the jarring journey became, at some point, less of a handicap and more of a peculiar vantage point from which to reflect on the intellectual and social world I had entered. My development was nourished by an education in what some people call ‘the great books’. That same education has made me sensitive to a culturally influential critique of ‘the canon’ that insists that Homer, Sophocles, Plato, Montaigne, Cervantes, Goethe, Hegel, Dostoyevsky, Woolf, et al, are not for people like me, that they are for white people, or rich people, or people born with class privileges that I lacked.`,
        'that',
        [506, 519, 641, 726]
      );
    });
  });
});
