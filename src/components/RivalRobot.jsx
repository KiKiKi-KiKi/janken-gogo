import React from 'react';
import { HANDS } from '../config';
import { IconPaperLine, IconScissorsLine, IconStoneLine } from './Icons';
import { ReactComponent as IconRemove } from '../img/icon-itmes.svg';

function Hand({ result }) {
  if (result === HANDS[1]) {
    return (
      <span className="rival-hand">
        <IconScissorsLine />
      </span>
    );
  }
  if (result === HANDS[2]) {
    return (
      <span className="rival-hand">
        <IconPaperLine />
      </span>
    );
  }

  return (
    <span className="rival-hand">
      <IconStoneLine />
    </span>
  );
}

function SpinHands() {
  return (
    <div className="spin">
      <span className="spin-hand rival-hand">
        <IconScissorsLine />
      </span>
      <span className="spin-hand rival-hand">
        <IconPaperLine />
      </span>
      <span className="spin-hand rival-hand">
        <IconStoneLine />
      </span>
    </div>
  );
}

function RemoveBtn({ onClick }) {
  return (
    <button className="btn rival-remove-btn" onClick={onClick}>
      <IconRemove />
    </button>
  );
}

export default function RivalRobot({ result, isPlay, isLastOne, onRemove }) {
  const hand = isPlay ? <SpinHands /> : <Hand result={result} />;
  const removeBtn = !isLastOne ? <RemoveBtn onClick={onRemove} /> : null;
  return (
    <div className="rival">
      {removeBtn}
      <div className="rival-result">{hand}</div>
    </div>
  );
}
