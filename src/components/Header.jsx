import React, { useMemo } from 'react';
import { ReactComponent as IconCoins } from '../img/icon-coins.svg';

const HighScoreLabel = (scoreObg) => {
  if (!scoreObg || !scoreObg.score) {
    return null;
  }
  return (
    <>
      {scoreObg.score}
      <small> (win:{scoreObg.win})</small>
    </>
  );
};

export default function Header({ match, score, bet, highScore }) {
  const hiscoreLabel = useMemo(() => HighScoreLabel(highScore), [highScore]);

  return (
    <header className="game-score">
      <div className="game-meta__item">
        <span className="game-meta--label">Game:</span>
        <label className="game-meta--value match">{match}</label>
      </div>
      <div className="game-meta__item">
        <span className="game-meta--label">Hight Score:</span>
        <label className="game-meta--value match">{hiscoreLabel}</label>
      </div>
      <span className="game-meta__item">
        <span className="game-meta--label">
          <IconCoins />
        </span>
        <label className="game-meta--value score">{score}</label>
      </span>
      <span className="game-meta__item">
        <span className="game-meta--label">Bet:</span>
        <label className="game-meta--value bet">{bet}</label>
      </span>
    </header>
  );
}
