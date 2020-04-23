import React from 'react';

export default function PlayBtn({ onPlay, children = 'PLAY' }) {
  return (
    <button className="btn play-btn" onClick={onPlay}>
      {children}
    </button>
  );
}
