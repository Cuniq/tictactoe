import { useState } from 'react';
import Board from './Board';
import {
  assertPositive,
  SquareValue,
  type AppState,
  type Positive,
} from './shared/types';
import { indexesToCheck } from './shared/utils';

function getNextPlayer(round: Positive): SquareValue {
  if (round % 2 == 0) {
    return SquareValue.X;
  }
  return SquareValue.Y;
}

function checkIfPayerWins(newIndexes: Positive[][], state: AppState) {
  console.log(newIndexes);
  for (const arr of newIndexes) {
    let allSame = true;
    for (let i = 1; i < arr.length; i++) {
      if (!state[arr[0]] || state[arr[i]] !== state[arr[0]]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      return true;
    }
  }

  return false;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    round: 0 as Positive,
  });
  const [win, setWin] = useState(false);

  const [dimension, setDimension] = useState<Positive>(3 as Positive);

  function handleOnPlay(index: Positive) {
    if (state[index]) return;

    const newState = {
      ...state,
      [index]: getNextPlayer(state.round),
      round: assertPositive(state.round + 1),
    };

    setState(newState);

    const newIndexes = indexesToCheck(index, dimension);
    if (checkIfPayerWins(newIndexes, newState)) {
      setWin(true);
    }

    return newIndexes;
  }

  return win ? (
    <p>EZ WIN</p>
  ) : (
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
