import { HANDS, HANDS_ID } from './congig';

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
}
