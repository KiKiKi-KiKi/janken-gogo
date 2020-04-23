import React, { useState, useCallback } from 'react';
import { HANDS, FIRST_VALUE, GAME_COST } from './congig';
import { gameMatch, getResultLabel, getAddScore } from './game';
import Rival from './Rival';
import RivalRobot from './components/RivalRobot';
import Controller from './components/Controller';
import Header from './components/Header';
import GameMeta from './components/GameMeta';
import GameIntroCover from './components/GameIntroCover';

function getRivalsValues(rivals) {
  return rivals.map((raival) => ({
    name: raival.name,
    value: raival.getRoll(),
  }));
}

const getResultByName = (res) => (name) => {
  return res.find((data) => data.name === name);
};

const PLAYER_ID = 'PLAYER_1';

export default function App() {
  const [gameStart, setGameStart] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [game, setGame] = useState({
    score: FIRST_VALUE,
    match: 0,
    win: 0,
    lose: 0,
    draw: 0,
  });
  const [betCost, setBetCost] = useState(0);
  const [myRoll, setMyRoll] = useState('');
  const [result, setResult] = useState();
  const [rivals, setRivals] = useState([new Rival(`CPU_${1}`)]);

  const onPlay = useCallback(() => {
    setGameStart(true);
    setBetCost(() => {
      return GAME_COST;
    });
    setIsPlay((_val) => !_val);
  }, []);

  const updateResult = useCallback((res, bet) => {
    const resLabel = getResultLabel(res);
    const addScore = getAddScore(res)(bet);

    setGame(({ score, match, ...data }) => {
      const count = data[resLabel] + 1;
      return { ...data, score: score + addScore, [resLabel]: count, match: match + 1 };
    });

    setResult(resLabel.toUpperCase());
  }, []);

  const updateRivalsData = useCallback((rivals, res) => {
    return rivals.map((data) => {
      return { ...data, result: getResultByName(res)(data.name).value };
    });
  }, []);

  const onMatch = useCallback(
    (myResult) => (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isPlay) {
        return false;
      }

      const player = {
        name: PLAYER_ID,
        value: myResult,
      };

      const rivalsResult = getRivalsValues(rivals);
      const resultData = [player, ...rivalsResult];
      console.log(resultData);

      const result = gameMatch(resultData, player);
      console.log('Result >', result);

      setMyRoll(myResult);
      setRivals(updateRivalsData(rivals, rivalsResult));
      updateResult(result, betCost);
    },
    [rivals, isPlay]
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
    return <RivalRobot key={data.name} name={data.name} result={data.result} />;
  });

  const StartCover = () => (!gameStart ? <GameIntroCover onPlay={onPlay} /> : null);

  return (
    <>
      <Header bet={betCost} {...game} />
      <main className="main">
        <div className="rivals">{rivalRobots}</div>
        <label>Result: {result}</label>
        <div className="main-actions">
          <Controller
            isPlay={isPlay}
            current={myRoll.toLowerCase()}
            onStone={onStone}
            onScissors={onScissors}
            onPaper={onPaper}
          />
        </div>
        <button onClick={() => onAddRival()}>ADD Rival</button>
        <StartCover />
      </main>
      <footer className="footer">
        <GameMeta {...game} />
      </footer>
    </>
  );
}
