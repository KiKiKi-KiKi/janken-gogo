import React from 'react';
import { getResultLabel } from '../game';
import PlayBtn from './PlayBtn';
import GameMeta from './GameMeta';
import { ReactComponent as IconCoins } from '../img/icon-coins.svg';

function highScore(isHighScore) {
  if (!isHighScore) {
    return null;
  }
  return <span className="result-hight-score">\ Hight Score /</span>;
}

export default function GameOverCover({ onPlay, score, match, win, lose, draw, result, addScore, isHighScore }) {
  const resLabel = getResultLabel(result);
  return (
    <div className="board-cover game-over">
      <div className="board-cover__label">
        <b className="board-cover__title">GAME OVER!</b>
        <div className="final-match-result">
          Final match:
          <span className={`result__title ${resLabel}`}>{resLabel}</span>
          <span className="result__score">(+{addScore})</span>
        </div>
        {highScore(isHighScore)}
        <p className="final-score">
          <small>Total:</small> <IconCoins /> {score}
        </p>
      </div>
      <div className="game-result">
        <div className="game-meta__item">
          <span className="game-meta--label">Total Game:</span>
          <label className="game-meta--value match">{match}</label>
        </div>
        <GameMeta win={win} lose={lose} draw={draw} />
      </div>
      <nav className="bord-cover__bottom">
        <PlayBtn className="restart-btn" onPlay={onPlay}>
          Restart
        </PlayBtn>
      </nav>
    </div>
  );
}
