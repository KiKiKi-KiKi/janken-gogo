import React, { useCallback } from 'react';
import PlayBtn from './PlayBtn';
import { getResultLabel } from '../game';
import { ReactComponent as IconCoins } from '../img/icon-coins.svg';

function NextButtton({ onNext }) {
  return (
    <PlayBtn className="next-btn" onPlay={onNext}>
      next (bet <IconCoins /> 10)
    </PlayBtn>
  );
}

function WinBuutons({ onNext, onBetAll, betCoin }) {
  return (
    <>
      <p className="over-action-label">
        BET <IconCoins /> {betCoin}?
      </p>
      <div className="cover-actions">
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

export default function GameNextCover({ result, addScore, onPlay }) {
  const resLabel = getResultLabel(result);
  const addCoin = addScore > 0 ? `+ ${addScore}` : addScore;

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
    <div className="board-cover game-next-cover">
      <div className="board-cover__label">
        <b className={`board-cover__title ${resLabel}`}>{resLabel}</b>
        <p className="final-score">
          <IconCoins /> {addCoin}
        </p>
      </div>
      <nav className="bord-cover__bottom">
        <NextActions />
      </nav>
    </div>
  );
}
