import React from 'react';
import classNames from '@kikiki_kiki/class-names';
import { IconPaper, IconScissors, IconStone } from './Icons';

function Button({ id, current, onClick, disabled, children }) {
  const cs = classNames(`controll-btn controll-btn--${id}`, {
    current: id === current,
    disabled: disabled,
  });
  return (
    <button className={cs} onClick={onClick}>
      {children}
    </button>
  );
}

export default function Controller({ isPlay, current, onStone, onScissors, onPaper }) {
  const props = { disabled: !isPlay };
  return (
    <nav className="controller">
      <div className="controll-item">
        <Button id="stone" current={current} onClick={onStone} {...props}>
          <IconStone />
        </Button>
      </div>
      <div className="controll-item">
        <Button id="scissors" current={current} onClick={onScissors} {...props}>
          <IconScissors />
        </Button>
      </div>
      <div className="controll-item">
        <Button id="paper" current={current} onClick={onPaper} {...props}>
          <IconPaper />
        </Button>
      </div>
    </nav>
  );
}
