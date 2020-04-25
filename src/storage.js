const STRAGE_KEY = 'janken_hi';

export function getHightScore() {
  const item = localStorage.getItem(STRAGE_KEY);
  return JSON.parse(item);
}

export function saveHigtScore(data) {
  return localStorage.setItem(STRAGE_KEY, JSON.stringify(data));
}
