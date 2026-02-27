import { useState, type JSX } from 'react';
import { type AppState, type Positive } from './shared/types';
import Square from './Square';

interface Props {
  dimension: Positive;
  state: AppState;
  onPlay: (index: Positive) => Positive[][] | undefined;
}

export default function Board({ dimension, state, onPlay }: Props) {
  const [highlighted, setHighlighted] = useState(new Set<Positive>());
  const [showHighlighted, setShowHighlighted] = useState(false);

  function handleClick(index: Positive) {
    const checkedIndexes = onPlay(index) ?? [];

    const set = new Set(checkedIndexes.flat());
    if (showHighlighted) {
      setHighlighted(set);
    }
  }

  const squares: JSX.Element[] = [];

  for (let index = 0 as Positive; index < dimension ** 2; index++) {
    squares.push(
      <Square
        //The animation doesn't reset if you don't remove and re-add the css class.
        //TRUST ME. I tried a lot of hacks. This is the best I found. Well, it is not beatiful but damn it works.
        //Tried force re-render, timeout (works but feels hacky), or new state only for forcing re-render.
        //(Also, there might be a supersupersuper small-tiny chance that the same random number get returned for the square)
        key={
          index.toString() +
          (highlighted.has(index) ? Math.random().toString() : '')
        }
        value={state[index]}
        highlight={highlighted.has(index)}
        onClick={() => {
          handleClick(index);
        }}
      />
    );
  }

  return (
    <>
      <div>
        <label>
          Highlight which squares being checked:
          <input
            type="checkbox"
            checked={showHighlighted}
            onChange={(event) => {
              setHighlighted(new Set());
              setShowHighlighted(event.target.checked);
            }}
          />
        </label>
      </div>
      <div
        style={{ '--board-size': dimension } as React.CSSProperties}
        className="grid grid-dynamic-columns"
      >
        {squares}
      </div>
    </>
  );
}
