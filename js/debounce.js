const TIME_OUT_DELAY = 500;

function debounce (callback, timeoutDelay = TIME_OUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {debounce};
