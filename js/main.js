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

const TITLE = [
  'Домик в мирном Хоббитоне',
  'Комната с видом на Асгард',
  'Палата №6',
  'Дворец Саурона',
  'Покои в Хогвартсе'
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTION = [
  'Просторно и уютно',
  'Евроремонт',
  'Из мебели - картина на стене',
  'Только мартрац, только хардкор',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getCounter = () => {
  let count = 1;
  return function () {
    if(count < 10) {
      return `0${  count++}`;
    } else {
      return count++;
    }
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

const createPromo = () => {
  const avatar = `img/avatars/user${  counter()  }.png`;
  const lat = getRandomFloat(35.65000, 35.70000, 5);
  const lng = getRandomFloat(139.70000, 139.80000, 5);
  return {
    autor: {
      avatar,
    },
    offer: {
      title: getRandomArrElement(TITLE),
      adress: `${lat  }, ${  lng}`,
      price: getRandomInt(1000, 100000),
      type: getRandomArrElement(TYPE),
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 5),
      checkin: getRandomArrElement(CHECKIN),
      checkout: getRandomArrElement(CHECKOUT),
      features: getArrRandom(FEATURES),
      description: getRandomArrElement(DESCRIPTION),
      photos: getArrRandom(PHOTOS),
    },
    location: {
      lat,
      lng,
    }
  };
};

const promo = Array.from({length: 10}, createPromo);

promo();

