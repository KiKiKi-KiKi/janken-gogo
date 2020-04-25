import React from 'react';
import classNames from '@kikiki_kiki/class-names';

export default function AddRivalBtn({ onClick, isPlay, hasMaxRivals }) {
  if (hasMaxRivals) {
    return null;
  }

  const cx = classNames('btn btn-sm', {
    disabled: isPlay,
  });

  return (
    <button className={cx} onClick={onClick}>
      ADD Rival
    </button>
  );
}
