import React from 'react';
import { IconPaper, IconScissors, IconStone } from './Icons';

export default function Controller() {
  return (
    <nav className="controller">
      <div className="controll-item">
        <button className="controll-btn controll-btn--stone">
          <IconStone />
        </button>
      </div>
      <div className="controll-item">
        <button className="controll-btn controll-btn--scissors">
          <IconScissors />
        </button>
      </div>
      <div className="controll-item">
        <button className="controll-btn controll-btn--paper">
          <IconPaper />
        </button>
      </div>
    </nav>
  );
}
