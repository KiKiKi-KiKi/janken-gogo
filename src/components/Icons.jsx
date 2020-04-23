import React from 'react';
import { ReactComponent as HandLock } from '../img/icon-hand-lock.svg';
import { ReactComponent as HandPeace } from '../img/icon-hand-peace.svg';
import { ReactComponent as HandPaper } from '../img/icon-hand-paper.svg';

export function IconPaper() {
  return <HandPaper />;
}

export function IconScissors() {
  return <HandPeace />;
}

export function IconStone() {
  return <HandLock />;
}
