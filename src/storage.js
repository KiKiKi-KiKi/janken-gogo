import { DEFAULT_SAVE_SCORE } from './congig';
const STRAGE_KEY = 'janken_hi';

export function getHighScore() {
  const item = localStorage.getItem(STRAGE_KEY);
  if (!item) {
    return { ...DEFAULT_SAVE_SCORE };
  }
  return JSON.parse(item);
}

export function saveHigtScore(data) {
  return localStorage.setItem(STRAGE_KEY, JSON.stringify(data));
}
