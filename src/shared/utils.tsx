import { type Positive, assertPositive } from './types';

export function indexesToCheck(index: Positive, dimension: Positive) {
  const row = assertPositive((index / dimension) | 0);
  const column = (index % dimension) as Positive;

  const indexes: Positive[][] = [];
  let arrIndex = 0;

  const rowStartingIndex = row * dimension;
  indexes[arrIndex] = [];
  for (let i = 0; i < dimension; i++) {
    indexes[arrIndex].push((rowStartingIndex + i) as Positive);
  }

  indexes[++arrIndex] = [];
  for (let i = 0; i < dimension; i++) {
    indexes[arrIndex].push((column + dimension * i) as Positive);
  }

  if (row === column) {
    // Main Diagonal
    indexes[++arrIndex] = [];
    for (let i = 0; i < dimension; i++) {
      indexes[arrIndex].push((i + i * dimension) as Positive);
    }
  }

  if (row + column === dimension - 1) {
    //Secondary diagonal
    indexes[++arrIndex] = [];
    for (let i = 1; i <= dimension; i++) {
      indexes[arrIndex].push(assertPositive(i * dimension - i));
    }
  }

  return indexes;
}
