import React from 'react';
import classNames from '@kikiki_kiki/class-names';

export default function PlayBtn({ onPlay, className, children = 'PLAY' }) {
  const cx = classNames('btn play-btn', className);
  return (
    <button className={cx} onClick={onPlay}>
      {children}
    </button>
  );
}
