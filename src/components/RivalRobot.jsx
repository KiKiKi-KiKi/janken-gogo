import React from 'react';
import { HANDS } from '../congig';
import { IconPaperLine, IconScissorsLine, IconStoneLine } from './Icons';

function Hand(key) {
  if (key === HANDS[1]) {
    return <IconScissorsLine />;
  }
  if (key === HANDS[2]) {
    return <IconPaperLine />;
  }

  return <IconStoneLine />;
}

export default function RivalRobot({ name, result }) {
  const hand = Hand(result);
  return (
    <div className="rival">
      <div className="rival-result">{hand}</div>
      <p className="rival-name">{name}</p>
    </div>
  );
}
