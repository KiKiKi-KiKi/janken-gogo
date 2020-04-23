import React from 'react';

export default function GameMeta({ win, lose, draw }) {
  return (
    <>
      <div className="game-meta__item">
        <span className="game-meta--label">Win:</span>
        <label className="game-meta--value win">{win}</label>
      </div>
      <div className="game-meta__item">
        <span className="game-meta--label">Lose:</span>
        <label className="game-meta--value lose">{lose}</label>
      </div>
      <div className="game-meta__item">
        <span className="game-meta--label">Draw:</span>
        <label className="game-meta--value draw">{draw}</label>
      </div>
    </>
  );
}
