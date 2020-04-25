import { HANDS } from './config';

const DEFAULT_RATE = {
  [HANDS[0]]: 33,
  [HANDS[1]]: 33,
  [HANDS[2]]: 33,
};

const RATE_CHANGE_VALUE = 2;
const RESET_LIMIT = 16;

const getTotal = (rate) => {
  return Object.keys(rate).reduce((total, key) => {
    return (total += rate[key]);
  }, 0);
};

const pickKeyByValue = (rate) => {
  const keys = Object.keys(rate);
  return (val, callback, index = 0, prevVal = 0) => {
    if (!keys[index]) {
      return;
    }
    const key = keys[index];
    const limit = rate[key] + prevVal;
    // console.log(key, rate[key], limit, val);
    if (val < limit) {
      return key;
    }
    return callback(val, callback, (index += 1), limit);
  };
};

const getPickKey = (rate) => (val) => {
  const picKeyFunc = pickKeyByValue(rate);
  return picKeyFunc(val, picKeyFunc);
};

const updateRate = (rate) => (pickKey) => {
  const keys = Object.keys(rate).filter((key) => {
    return key !== pickKey;
  });

  const upKey = keys[Math.floor(Math.random() * keys.length)];
  const downRate = rate[pickKey] - RATE_CHANGE_VALUE;
  const upRate = rate[upKey] + RATE_CHANGE_VALUE;

  if (downRate < RESET_LIMIT) {
    console.warn(`Reset rate ${pickKey}!`);
    return { ...rate, [upKey]: upRate, [pickKey]: DEFAULT_RATE[pickKey] };
  }

  return { ...rate, [upKey]: upRate, [pickKey]: downRate };
};

// Rai
export default function Rival(_name) {
  const name = _name;
  const rateRef = { current: DEFAULT_RATE };

  const getRate = () => rateRef.current;
  const setRate = (rate) => (rateRef.current = rate);

  const getRoll = () => {
    const rate = getRate();
    console.log(name, rate);
    const total = getTotal(rate);
    const pick = Math.floor(Math.random() * total);
    const pickKey = getPickKey(rate)(pick);
    console.log(name, total, pick, pickKey);

    // Change rate
    setRate(updateRate(rate)(pickKey));

    return pickKey;
  };

  return {
    name,
    getRoll,
  };
}
