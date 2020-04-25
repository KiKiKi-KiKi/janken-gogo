import React, { useState, useCallback, useMemo } from 'react';
import { HANDS, DEFAULT_GAME, GAME_COST } from './congig';
import { gameMatch, getResultLabel, getAddScore, vaildGameOver } from './game';
import Rival from './Rival';
import RivalRobot from './components/RivalRobot';
import Controller from './components/Controller';
import Header from './components/Header';
import GameMeta from './components/GameMeta';
import GameIntroCover from './components/GameIntroCover';
import GameOverCover from './components/GameOverCover';
import GameNextCover from './components/GameNextCover';

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
  const [isGameOver, setIsGameOver] = useState(false);
  const [game, setGame] = useState({ ...DEFAULT_GAME });
  const [betCost, setBetCost] = useState(0);
  const [myRoll, setMyRoll] = useState('');
  const [rivals, setRivals] = useState([new Rival(`CPU_${1}`)]);

  const resetRivals = useCallback(() => {
    return setRivals([new Rival(`CPU_${1}`)]);
  }, []);

  const onPlay = useCallback((betVal = GAME_COST) => {
    setMyRoll('');
    setBetCost(() => {
      return betVal;
    });
    setGame(({ score, ...gameData }) => {
      return { ...gameData, score: score - betVal };
    });
    setIsPlay(true);
  }, []);

  const onPuseGame = useCallback(() => {
    setIsPlay(false);
    setBetCost(0);
  }, []);

  const onGameReset = useCallback(() => {
    resetRivals();
    setGameStart(true);
    setIsGameOver(false);
    setGame({ ...DEFAULT_GAME });
    onPlay();
  }, [onPlay, resetRivals]);

  const checkGameOver = useCallback(
    (game) => {
      setIsGameOver(() => {
        const isGameOver = vaildGameOver(game);
        if (isGameOver) {
          setBetCost(0);
          onPlay(false);
        }
        return isGameOver;
      });
    },
    [onPlay]
  );

  const updateResult = useCallback(
    (res, bet) => {
      const resLabel = getResultLabel(res);
      const addScore = getAddScore(res)(bet);

      setGame(({ score, match, ...data }) => {
        const count = data[resLabel] + 1;
        const newGameData = {
          ...data,
          score: score + addScore,
          [resLabel]: count,
          match: match + 1,
          addScore: addScore,
          result: res,
        };
        checkGameOver(newGameData);
        return newGameData;
      });
    },
    [checkGameOver]
  );

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

      onPuseGame();
    },
    [rivals, isPlay, betCost, onPuseGame, updateResult, updateRivalsData]
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

  const startCover = useMemo(() => {
    return !gameStart ? <GameIntroCover onPlay={onGameReset} /> : null;
  }, [gameStart, onGameReset]);

  const gameOver = useMemo(() => {
    return isGameOver ? <GameOverCover onPlay={onGameReset} {...game} /> : null;
  }, [isGameOver, onGameReset, game]);

  const nextCover = useMemo(() => {
    if (!isPlay && !isGameOver && gameStart) {
      return <GameNextCover onPlay={onPlay} {...game} />;
    } else {
      return null;
    }
  }, [isPlay, isGameOver, gameStart, game, onPlay]);

  return (
    <>
      <Header bet={betCost} {...game} />
      <main className="main">
        <div className="rivals">{rivalRobots}</div>
        <div className="main-actions">
          <Controller
            isPlay={gameStart}
            current={myRoll.toLowerCase()}
            onStone={onStone}
            onScissors={onScissors}
            onPaper={onPaper}
          />
        </div>
        {/* TODO: rate up, when add Rival */}
        <button className="btn" onClick={() => onAddRival()}>
          ADD Rival
        </button>
        {startCover}
        {nextCover}
      </main>
      <footer className="footer">
        <div className="game-meta">
          <GameMeta {...game} />
        </div>
      </footer>
      {gameOver}
    </>
  );
}
