import { HANDS, HANDS_ID } from './congig';

const isAllSameValue = (arr) => {
  return arr.length === 1;
}

const isArrayLengthMax = (arr) => (values) => {
  return arr.length === values.length;
}

// All same value || Has All Values => DRAW
export const isDraw = (data) => {
  const values = data.reduce((arr, player) => {
    if (!arr[HANDS_ID[player.value]]) {
      arr[HANDS_ID[player.value]] = 0;
    }
    arr[HANDS_ID[player.value]] += 1
    return [...arr];
  }, []).filter(Boolean);

  console.log(values);

  if (isAllSameValue(values)) {
    console.log('Draw! All same value.');
    return true;
  }

  const hasAllHands = isArrayLengthMax(HANDS);

  if (hasAllHands(values)) {
    console.log('Draw! Has All Hands.');
    return true;
  }

  return false;
};

//  1: win
//  0: draw
// -1: lose
export const gameMatch = (data) => {
  if (isDraw(data)) {
    return 0;
  }
}
