import { mergeSort } from './mergeSort';

describe('mergeSort', () => {
  it('should sort the array with distinct elements in ascending order', () => {
    const items = [4, 2, 8, 9];
    const sortedItems = items.slice().sort((a, b) => a - b);
    const mergeSorted = mergeSort(items);
    expect(mergeSorted.length).toBe(sortedItems.length);
    expect(mergeSorted).toStrictEqual(sortedItems);
  });

  it('should sort array with duplicates', () => {
    const items = [3, 4, 92, 21, 33, 1, 7, 4, 9, 61, 3, 92];
    const sortedItems = items.slice().sort((a, b) => a - b);
    const mergeSorted = mergeSort(items);
    expect(mergeSorted.length).toBe(sortedItems.length);
    expect(mergeSorted).toStrictEqual(sortedItems);
  });

  it('should return single element as is', () => {
    const items = [1];
    const mergeSorted = mergeSort(items);
    expect(mergeSorted.length).toBe(items.length);
    expect(mergeSorted).toStrictEqual(items);
  });

  it('should return empty element as is', () => {
    const items: number[] = [];
    const mergeSorted = mergeSort(items);
    expect(mergeSorted.length).toBe(items.length);
    expect(mergeSorted).toStrictEqual(items);
  });
});
