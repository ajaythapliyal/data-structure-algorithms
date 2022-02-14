export function mergeSort(
  numbers: number[],
  left = 0,
  right = numbers.length - 1
): number[] {
  if (!numbers.length) return [];
  if (left >= right) return [numbers[left]];
  const midpoint = Math.floor((left + right) / 2);
  const sortedFirst = mergeSort(numbers, left, midpoint);
  const sortedSecond = mergeSort(numbers, midpoint + 1, right);
  return merge(sortedFirst, sortedSecond);
}

function merge(sortedFirst: number[], sortedSecond: number[]): number[] {
  let firstIndex = 0;
  let secondIndex = 0;
  const sortedCombined: number[] = [];

  while (firstIndex < sortedFirst.length && secondIndex < sortedSecond.length) {
    if (sortedFirst[firstIndex] < sortedSecond[secondIndex]) {
      sortedCombined.push(sortedFirst[firstIndex++]);
    } else {
      sortedCombined.push(sortedSecond[secondIndex++]);
    }
  }
  if (firstIndex < sortedFirst.length) {
    while (firstIndex < sortedFirst.length) {
      sortedCombined.push(sortedFirst[firstIndex]);
      firstIndex++;
    }
  } else if (secondIndex < sortedSecond.length) {
    while (secondIndex < sortedSecond.length) {
      sortedCombined.push(sortedSecond[secondIndex]);
      secondIndex++;
    }
  }
  return sortedCombined;
}
