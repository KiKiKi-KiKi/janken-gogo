import React from 'react';
import AddRivalBtn from './AddRivalBtn';

export default function RivalMeta({ rateLevel, isPlay, onAddRival, hasMaxRivals }) {
  return (
    <div className="rivals-meta">
      <AddRivalBtn onClick={onAddRival} isPlay={isPlay} hasMaxRivals={hasMaxRivals} />
      <div className="rate-level">
        win rate:
        <span className="rate-level-label">
          {rateLevel}
          <small>x</small>
        </span>
      </div>
    </div>
  );
}
