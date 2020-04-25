import React, { useCallback } from 'react';
import { GAME_COST } from '../congig';
import PlayBtn from './PlayBtn';
import { ReactComponent as IconCoins } from '../img/icon-coins.svg';

function NextButtton({ onNext }) {
  return (
    <PlayBtn className="next-btn" onPlay={onNext}>
      next (bet <IconCoins /> {GAME_COST})
    </PlayBtn>
  );
}

function WinBuutons({ onNext, onBetAll, betCoin }) {
  return (
    <>
      <p className="result__action-label">
        BET <IconCoins /> {betCoin}?
      </p>
      <div className="result__actions">
        <div className="half">
          <PlayBtn className="get-reward-btn" onPlay={onNext}>
            Get rewards.
          </PlayBtn>
        </div>
        <div className="half">
          <PlayBtn className="bet-all-btn" onPlay={onBetAll}>
            Bet all rewards
          </PlayBtn>
        </div>
      </div>
    </>
  );
}

export default function ResultController({ result, addScore, onPlay }) {
  const onNext = useCallback(() => {
    return onPlay();
  }, [onPlay]);

  const onBetAll = useCallback(() => {
    console.log('onBetAll');
    return onPlay(addScore);
  }, [onPlay, addScore]);

  const NextActions = () =>
    result > 0 ? (
      <WinBuutons onNext={onNext} onBetAll={onBetAll} betCoin={addScore} />
    ) : (
        <NextButtton onNext={onNext} />
      );

  return (
    <nav className="result__footer">
      <NextActions />
    </nav>
  );
}
