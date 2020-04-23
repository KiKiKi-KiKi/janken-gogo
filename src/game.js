import { HANDS, HANDS_ID, GAME_COST } from './congig';

const isAllSameValue = (arr) => {
  return arr.length === 1;
};

const isArrayLengthMax = (max) => (values) => {
  return values.length === max;
};

// All same value || Has All Values => DRAW
export const isDraw = (data) => (max) => {
  if (isAllSameValue(data)) {
    console.log('Draw! All same value.');
    return true;
  }

  const hasAllHands = isArrayLengthMax(max);

  if (hasAllHands(data)) {
    console.log('Draw! Has All Hands.');
    return true;
  }

  return false;
};

const janken = (hand1) => (hand2) => {
  switch (hand1) {
    case HANDS[0]: // STONE
      return hand2 === HANDS[1];
    case HANDS[1]: // SCISSORS
      return hand2 === HANDS[2];
    case HANDS[2]: // PAPER
      return hand2 === HANDS[0];
  }
};

// return Array
const getWinnersList = ([first, second]) => {
  const [hand1, member1] = first;
  const [hand2, member2] = second;
  return janken(hand1)(hand2) ? member1 : member2;
}

export const isWin = (data) => (playerName) => {
  const winner = getWinnersList(data);
  console.log('Winner:', winner);
  return winner.includes(playerName);
};

/*
[
  hands,   // HANDS PATTERN,
  members, // [PLAYER NAME,]
]
*/
const mapPlayersToHandPattern = (ids) => (data) => {
  return data
    .reduce((arr, player) => {
      if (!arr[ids[player.value]]) {
        arr[ids[player.value]] = [
          player.value,
          [],
        ];
      }
      arr[ids[player.value]][1].push(player.name);
      return [...arr];
    }, [])
    .filter(Boolean);
};

//  1: win
//  0: draw
// -1: lose
export const gameMatch = (data, player) => {
  const resData = mapPlayersToHandPattern(HANDS_ID)(data);
  console.log(resData);

  if (isDraw(resData)(HANDS.length)) {
    return 0;
  }

  return isWin(resData)(player.name) ? 1 : -1;
};

const RESULT_LABELS = Object.freeze({
  '-1': 'lose',
  '0': 'draw',
  '1': 'win',
});

export const getResultLabel = (result) => {
  return RESULT_LABELS[result.toString()];
};

export const getAddScore = (res) => (bet) => {
  if (res < 0) {
    return -bet;
  }

  if (res === 0) {
    return -(bet / 2);
  }

  return bet * 2 - bet;
};
