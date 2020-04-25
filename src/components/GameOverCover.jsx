import React from 'react';
import PlayBtn from './PlayBtn';
import GameMeta from './GameMeta';
import { ReactComponent as IconCoins } from '../img/icon-coins.svg';

function highScore(isHighScore) {
  if (!isHighScore) {
    return null;
  }
  return <span className="result-hight-score">Hight Score</span>;
}

export default function GameOverCover({ onPlay, score, match, win, lose, draw, isHighScore }) {
  return (
    <div className="board-cover game-over">
      <div className="board-cover__label">
        <b className="board-cover__title">GAME OVER!</b>
        {highScore(isHighScore)}
        <p className="final-score">
          <IconCoins /> {score}
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
