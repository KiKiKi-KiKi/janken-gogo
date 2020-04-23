import { HANDS } from './congig';

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

export default function Raival(_name) {
  const name = _name;
  const rateRef = {
    current: {
      [HANDS[0]]: 33,
      [HANDS[1]]: 33,
      [HANDS[2]]: 33,
    },
  };

  const getRate = () => rateRef.current;

  const getRoll = () => {
    const rate = getRate();
    const total = getTotal(rate);
    const pick = Math.floor(Math.random() * total);
    const pickKey = getPickKey(rate)(pick);
    console.log(name, total, pick, pickKey);

    // TODO: change rate


    return pickKey;
  };

  return {
    name,
    getRoll,
  };
}
