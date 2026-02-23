const SquareValue = {
  X: 'X',
  Y: 'Y',
} as const;

type SquareValue = (typeof SquareValue)[keyof typeof SquareValue];

export { SquareValue };

export type Positive = number & { __brand: 'positive' };

export function assertPositive(value: number): Positive {
  if (value < 0) {
    throw new Error(`${value.toString()} is not positive.`);
  }
  return value as Positive;
}

export interface AppState {
  round: Positive;
  [square: Positive]: SquareValue | null;
}
