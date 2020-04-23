import React from 'react';
import { ReactComponent as HandLock } from '../img/icon-hand-lock.svg';
import { ReactComponent as HandPeace } from '../img/icon-hand-peace.svg';
import { ReactComponent as HandPaper } from '../img/icon-hand-paper.svg';
import { ReactComponent as HandLockLine } from '../img/icon-hand-lock-line.svg';
import { ReactComponent as HandPeaceLine } from '../img/icon-hand-peace-line.svg';
import { ReactComponent as HandPaperLine } from '../img/icon-hand-paper-line.svg';

export function IconPaper() {
  return <HandPaper />;
}

export function IconScissors() {
  return <HandPeace />;
}

export function IconStone() {
  return <HandLock />;
}

export function IconPaperLine() {
  return <HandPaperLine />;
}

export function IconScissorsLine() {
  return <HandPeaceLine />;
}

export function IconStoneLine() {
  return <HandLockLine />;
}
