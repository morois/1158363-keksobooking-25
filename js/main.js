const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max <= min) {
    return false;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getCoordinates = (min, max, afterPoint) => {
  if (min < 0 || max <= min) {
    return false;
  }
  if(!afterPoint)  {
    return false;
  }
  const result = Math.random() * (max - min) + min;
  return result.toFixed(afterPoint);
};
