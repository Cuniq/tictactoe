import type { MouseEventHandler } from 'react';
import { SquareValue } from './shared/types';

interface CounterProps {
  value: SquareValue | null;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function Square({ value, onClick }: CounterProps) {
  return (
    <div className="square center" onClick={onClick}>
      <p>{value}</p>
    </div>
  );
}
