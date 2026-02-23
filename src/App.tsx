import { useState } from 'react';
import Board from './Board';
import {
  assertPositive,
  SquareValue,
  type AppState,
  type Positive,
} from './shared/types';

function getNextPlayer(round: Positive): SquareValue {
  if (round % 2 == 0) {
    return SquareValue.X;
  }
  return SquareValue.Y;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    round: 0 as Positive,
  });

  const [dimension, setDimension] = useState<Positive>(3 as Positive);

  function handleOnPlay(index: Positive) {
    if (state[index]) return;

    setState({
      ...state,
      [index]: getNextPlayer(state.round),
      round: assertPositive(state.round + 1),
    });
  }

  return (
    <>
      <div>
        <label>
          Dimension:
          <input
            type="number"
            min={1}
            value={dimension}
            onChange={(event) => {
              const intVal = event.target.value.replace(/\D/, '');
              if (!intVal) return;
              setDimension(assertPositive(parseInt(intVal)));
            }}
          />
        </label>
      </div>
      <Board dimension={dimension} state={state} onPlay={handleOnPlay} />
    </>
  );
}
