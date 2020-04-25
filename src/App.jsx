import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { HANDS, DEFAULT_GAME, GAME_COST, MAX_RIVAL } from './config';
import { gameMatch, getResultLabel, getAddScore, vaildGameOver, checkHiScore } from './game';
import { getHighScore, saveHigtScore } from './storage';
import Rival from './Rival';
import RivalRobot from './components/RivalRobot';
import Controller from './components/Controller';
import Header from './components/Header';
import GameMeta from './components/GameMeta';
import GameIntroCover from './components/GameIntroCover';
import GameOverCover from './components/GameOverCover';
import Result from './components/Result';
import ResultController from './components/ResultController';

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
const CPU_PREFIX = 'CPU_';

export default function App() {
  const [highScore, setHigtScore] = useState();
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
    setHigtScore((highScore) => {
      return { ...highScore, isHighScore: false };
    });
    onPlay();
  }, [onPlay, resetRivals]);

  const updateHighScore = useCallback(
    (game) => {
      if (checkHiScore(highScore)(game)) {
        setHigtScore(() => {
          const { addScore, result, ...newHighScore } = game; // eslint-disable-line
          // console.log('Hi Score!', newHighScore);
          saveHigtScore(newHighScore);
          return { ...newHighScore, isHighScore: true };
        });
      }
    },
    [highScore]
  );

  const checkGameOver = useCallback(
    (game) => {
      setIsGameOver(() => {
        const isGameOver = vaildGameOver(game);
        if (isGameOver) {
          setBetCost(0);
          setIsPlay(false);
          updateHighScore(game);
        }
        return isGameOver;
      });
    },
    [updateHighScore]
  );

  const updateResult = useCallback(
    (res, bet, rivalsNum) => {
      const resLabel = getResultLabel(res);
      const addScore = getAddScore(res)(bet)(rivalsNum);

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
      // console.log(resultData);

      const result = gameMatch(resultData, player);
      // console.log('Result >', result);

      setMyRoll(myResult);
      setRivals(updateRivalsData(rivals, rivalsResult));
      updateResult(result, betCost, rivals.length);

      onPuseGame();
    },
    [rivals, isPlay, betCost, onPuseGame, updateResult, updateRivalsData]
  );

  const onStone = useCallback(onMatch(HANDS[0]), [onMatch]);
  const onScissors = useCallback(onMatch(HANDS[1]), [onMatch]);
  const onPaper = useCallback(onMatch(HANDS[2]), [onMatch]);

  const onAddRival = useCallback(() => {
    if (!isPlay) return;
    setRivals((_rivals) => {
      const rivals = [..._rivals];
      const newRival = new Rival(`${CPU_PREFIX}${rivals.length + 1}`);
      rivals.push(newRival);
      return rivals;
    });
  }, [isPlay]);

  const addRivalBtn = useMemo(() => {
    if (rivals.length < MAX_RIVAL) {
      return (
        <button className="btn btn-sm" onClick={() => onAddRival()}>
          ADD Rival
        </button>
      );
    }
    return null;
  }, [rivals, onAddRival]);

  const onRemoveRival = useCallback(
    (key) => () => {
      if (!isPlay || rivals.length === 1) {
        return;
      }
      const newRivals = [...rivals]
        .filter((data) => key !== data.name)
        .map((data, i) => ({ ...data, name: `${CPU_PREFIX}${i + 1}` }));
      setRivals(newRivals);
    },
    [rivals, isPlay]
  );

  const rivalRobots = rivals.map((data) => {
    return (
      <RivalRobot
        key={data.name}
        name={data.name}
        result={data.result}
        isPlay={isPlay}
        isLastOne={!!(rivals.length === 1)}
        onRemove={onRemoveRival(data.name)}
      />
    );
  });

  const startCover = useMemo(() => {
    return !gameStart ? <GameIntroCover onPlay={onGameReset} /> : null;
  }, [gameStart, onGameReset]);

  const gameOver = useMemo(() => {
    return isGameOver ? <GameOverCover onPlay={onGameReset} {...game} isHighScore={highScore.isHighScore} /> : null;
  }, [isGameOver, onGameReset, game, highScore]);

  const isResult = !isPlay && !isGameOver && gameStart;

  const rateLevel = rivals.length * 2;

  useEffect(() => {
    setHigtScore(getHighScore());
  }, []);

  return (
    <>
      <Header bet={betCost} {...game} highScore={highScore} />
      <main className="main">
        <div className="main-board">
          <div className="rivals-container">
            <div className="rivals">{rivalRobots}</div>
            <div className="rivals-meta">
              {addRivalBtn}
              <div className="rate-level">
                win rate:
                <span className="rate-level-label">
                  {rateLevel}
                  <small>x</small>
                </span>
              </div>
            </div>
          </div>
          {isResult && <Result {...game} />}
          {isResult && <ResultController onPlay={onPlay} {...game} />}
          <div className="main-actions">
            <Controller
              isPlay={gameStart}
              current={myRoll.toLowerCase()}
              onStone={onStone}
              onScissors={onScissors}
              onPaper={onPaper}
            />
          </div>
        </div>
        {startCover}
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
