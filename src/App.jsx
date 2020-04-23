import React, { useState, useCallback } from 'react';
import { HANDS } from './congig';
import { gameMatch, getResultLabel } from './game';
import Rival from './Rival';
import RivalRobot from './components/RivalRobot';
import Controller from './components/Controller';

function getRivalsValues(rivals) {
  return rivals.map((raival) => ({
    name: raival.name,
    value: raival.getRoll(),
  }));
}

const getResultByName = (res) => (name) => {
  return res.find((data) => data.name === name);
}

const PLAYER_ID = 'PLAYER_1';

export default function App() {
  const [result, setResult] = useState();
  const [rivals, setRivals] = useState([new Rival(`CPU_${1}`)]);

  const updateResult = useCallback((res) => {
    setResult(getResultLabel(res));
  }, []);

  const updateRivalsData = useCallback((rivals, res) => {
    return rivals.map((data) => {
      return { ...data, result: getResultByName(res)(data.name).value };
    })
  }, []);

  const onMatch = useCallback(
    (myRoll) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      const player = {
        name: PLAYER_ID,
        value: myRoll,
      };
      const rivalsResult = getRivalsValues(rivals);
      const resultData = [player, ...rivalsResult];
      console.log(resultData);

      const result = gameMatch(resultData, player);
      console.log('Result >', result);

      setRivals(updateRivalsData(rivals, rivalsResult));
      updateResult(result);
    },
    [rivals]
  );

  const onStone = useCallback(onMatch(HANDS[0]), [onMatch]);
  const onScissors = useCallback(onMatch(HANDS[1]), [onMatch]);
  const onPaper = useCallback(onMatch(HANDS[2]), [onMatch]);

  const onAddRival = () => {
    setRivals((_rivals) => {
      const rivals = [..._rivals];
      const newRival = new Rival(`CPU_${rivals.length + 1}`);
      console.log(newRival);
      rivals.push(newRival);
      console.log(rivals);
      return rivals;
    });
  };

  const rivalRobots = rivals.map((data) => {
    return <RivalRobot key={data.name} name={data.name} result={data.result} />
  })

  return (
    <>
      <div className="rivals">
        {rivalRobots}
      </div>
      <label>Result: {result}</label>
      <Controller onStone={onStone} onScissors={onScissors} onPaper={onPaper} />
      <button onClick={() => onAddRival()}>ADD Rival</button>
    </>
  );
}
