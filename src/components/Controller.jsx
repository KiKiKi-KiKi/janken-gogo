import React from 'react';
import { IconPaper, IconScissors, IconStone } from './Icons';

export default function Controller({ onStone, onScissors, onPaper }) {
  return (
    <nav className="controller">
      <div className="controll-item">
        <button className="controll-btn controll-btn--stone" onClick={onStone}>
          <IconStone />
        </button>
      </div>
      <div className="controll-item">
        <button className="controll-btn controll-btn--scissors" onClick={onScissors}>
          <IconScissors />
        </button>
      </div>
      <div className="controll-item">
        <button className="controll-btn controll-btn--paper" onClick={onPaper}>
          <IconPaper />
        </button>
      </div>
    </nav>
  );
}
