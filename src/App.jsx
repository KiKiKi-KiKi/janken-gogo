import React, { useState, useCallback } from 'react';
import { HANDS } from './congig';
import Rival from './Rival';
import Controller from './components/Controller';

function getRivalsValues(rivals) {
  return rivals.map((raival) => raival.getRoll());
}

export default function App() {
  const [rivals, setRivals] = useState([new Rival(0)]);

  const onMatch = useCallback(
    (myRoll) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      const values = [myRoll, ...getRivalsValues(rivals)];
      console.log(values);
    },
    [rivals]
  );

  const onStone = useCallback(onMatch(HANDS[0]), [onMatch]);
  const onScissors = useCallback(onMatch(HANDS[1]), [onMatch]);
  const onPaper = useCallback(onMatch(HANDS[2]), [onMatch]);

  return (
    <>
      <Controller onStone={onStone} onScissors={onScissors} onPaper={onPaper} />
    </>
  );
}
