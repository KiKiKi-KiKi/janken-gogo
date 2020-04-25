import React from 'react';
import { getResultLabel } from '../game';
import { ReactComponent as IconCoins } from '../img/icon-coins.svg';

export default function Result({ result, score, addScore }) {
  const resLabel = getResultLabel(result);

  return (
    <div className="result">
      <h3 className={`result__title ${resLabel}`}>{resLabel}</h3>
      <p className="result__score">
        <IconCoins /> {score} <small>(+{addScore})</small>
      </p>
    </div>
  );
}
