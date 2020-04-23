import { HANDS, HANDS_ID } from './congig';

const isAllSameValue = (arr) => (playerNum) => {
  console.log(Math.max(...arr), playerNum);
  return Math.max(...arr) === playerNum;
}

// All same value || Has All Values => DRAW
export const isDraw = (data) => {
  const playerNum = data.length;
  const values = data.reduce((arr, player) => {
    if (!arr[HANDS_ID[player.value]]) {
      arr[HANDS_ID[player.value]] = 0;
    }
    arr[HANDS_ID[player.value]] += 1
    return [...arr];
  }, Array(HANDS.length).fill(0));
  console.log(values);

  if (isAllSameValue(values)(playerNum)) {
    console.log('Draw! All same value.');
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
