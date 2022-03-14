const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0) {
    min = 0;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  if (max === min) {
    return min;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, afterPoint = 0) => {
  if(min < 0) {
    min = 0;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  if (max === min) {
    return min;
  }
  return +(Math.random() * (max - min) + min).toFixed(afterPoint);
};

const getCounter = () => {
  let count = 1;
  return function () {
    return count < 10 ? `0${  count++}` : count++;
  };
};

const counter = getCounter();

const getRandomArrElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getArrRandom = (list) => {
  let result = [];
  const count = getRandomInt(0, list.length - 1);
  const copyList = [...list];
  for (let i = 1; i < count; i++) {
    const index = getRandomInt(0, list.length - 1);
    const item = copyList.splice(index, 1);
    result = result.concat(item);
  }
  return result;
};

export {getRandomInt, getRandomFloat, counter, getRandomArrElement, getArrRandom};

