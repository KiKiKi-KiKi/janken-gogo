import React from 'react';
import { ReactComponent as IconCoins } from '../img/icon-coins.svg';

export default function Header({ match, score, bet }) {
  return (
    <header className="game-score">
      <div className="game-meta__item">
        <span className="game-meta--label">Game:</span>
        <label className="game-meta--value match">{match}</label>
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
