import React from 'react';
import { HANDS } from '../congig';
import { IconPaperLine, IconScissorsLine, IconStoneLine } from './Icons';

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

export default function RivalRobot({ name, isPlay, result }) {
  const hand = isPlay ? <SpinHands /> : <Hand result={result} />;
  return (
    <div className="rival">
      <div className="rival-result">{hand}</div>
      <p className="rival-name">{name}</p>
    </div>
  );
}
