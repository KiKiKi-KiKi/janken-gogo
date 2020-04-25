import React from 'react';
import { GAME_COST, MAX_MATCH } from '../congig';
import PlayBtn from './PlayBtn';

export default function GameIntroCover({ onPlay }) {
  return (
    <div className="intro-container">
      <div className="intro-heading">
        <h1 className="app-title">JAN=KEN GOGO!</h1>
      </div>
      <div className="intro-description">
        <ul className="intro-description__list">
          <li>1 game {GAME_COST} coin.</li>
          <li>Game end when {MAX_MATCH} matches or coin become 0.</li>
          <li>can more bet next game, if you win.</li>
          <li>Win: get beted coins 2x!</li>
          <li>Lose: lost bet coins.</li>
          <li>Draw: lost half of beted coins.</li>
        </ul>
      </div>
      <PlayBtn className="intro-start-btn" onPlay={onPlay}>
        Play
      </PlayBtn>
    </div>
  );
}
