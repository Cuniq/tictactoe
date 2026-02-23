import { type JSX } from 'react';
import type { AppState, Positive } from './shared/types';
import Square from './Square';

interface Props {
  dimension: Positive;
  state: AppState;
  onPlay: (index: Positive) => void;
}

function generateSquares(
  dimension: Props['dimension'],
  state: Props['state'],
  onPlay: Props['onPlay']
) {
  const squaresComp: JSX.Element[] = [];

  for (let index = 0 as Positive; index < dimension ** 2; index++) {
    squaresComp.push(
      <Square
        key={index}
        value={state[index]}
        onClick={() => {
          onPlay(index);
        }}
      />
    );
  }
  return squaresComp;
}

export default function Board({ dimension, state, onPlay }: Props) {
  const squares = generateSquares(dimension, state, onPlay);

  console.log(state);
  return (
    <div
      style={{ '--board-size': dimension } as React.CSSProperties}
      className="grid grid-dynamic-columns"
    >
      {squares}
    </div>
  );
}
