import type { MouseEventHandler } from 'react';
import { SquareValue } from './shared/types';

interface CounterProps {
  value: SquareValue | null;
  highlight: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function Square({ value, onClick, highlight }: CounterProps) {
  let highlightClassName = '';
  if (highlight) highlightClassName = 'highlight';
  return (
    <div className={'square center ' + highlightClassName} onClick={onClick}>
      <p>{value}</p>
    </div>
  );
}
