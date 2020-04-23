import React from 'react';
import classNames from '@kikiki_kiki/class-names'
import { IconPaper, IconScissors, IconStone } from './Icons';

function Button({ id, current, onClick, children }) {
  const cs = classNames(`controll-btn controll-btn--${id}`, {
    current: id === current
  });
  return (
    <button className={cs} onClick={onClick}>
      {children}
    </button>
  )
}

export default function Controller({ current, onStone, onScissors, onPaper }) {
  return (
    <nav className="controller">
      <div className="controll-item">
        <Button id="stone" current={current} onClick={onStone}>
          <IconStone />
        </Button>
      </div>
      <div className="controll-item">
        <Button id="scissors" current={current} onClick={onScissors}>
          <IconScissors />
        </Button>
      </div>
      <div className="controll-item">
        <Button id="paper" current={current} onClick={onPaper}>
          <IconPaper />
        </Button>
      </div>
    </nav>
  );
}
