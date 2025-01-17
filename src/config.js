export const FIRST_VALUE = 100;
export const GAME_COST = 10;
export const MAX_MATCH = 30;
export const MAX_RIVAL = 4;
export const REWARD_MULTIPLYING_BASE = 2;

export const HANDS = Object.freeze(['STONE', 'SCISSORS', 'PAPER']);

export const HANDS_ID = Object.freeze({
  [HANDS[0]]: 0,
  [HANDS[1]]: 1,
  [HANDS[2]]: 2,
});

export const DEFAULT_GAME = Object.freeze({
  score: FIRST_VALUE,
  match: 0,
  win: 0,
  lose: 0,
  draw: 0,
});

export const DEFAULT_SAVE_SCORE = Object.freeze({
  ...DEFAULT_GAME,
  score: null,
  isHighScore: false,
});
