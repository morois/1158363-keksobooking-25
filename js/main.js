getRandom = (min, max) => {
  if (min < 0 || max <= min) {
    return false;
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

getCoordinate = (min, max, afterPoint) => {
  if (min < 0 || max <= min) {
    return false;
  }
  const result = Math.random() * (max - min + 1) + min;
  return result.toFixed(afterPoint);
};
