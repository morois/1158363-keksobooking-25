import {getRandomInt, getRandomFloat, counter, getRandomArrElement, getArrRandom} from './util.js';

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

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const FLOAT = 5;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const MIN_PRICE = 1000;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 10;

const MIN_GUESTS = 1;
const MAX_GUESTS = 5;

const PROMO_COUNT = 10;

const createPromo = () => {
  const avatar = `img/avatars/user${  counter()  }.png`;
  const lat = getRandomFloat(MIN_LAT, MAX_LAT, FLOAT);
  const lng = getRandomFloat(MIN_LNG, MAX_LNG, FLOAT);
  return {
    autor: {
      avatar,
    },
    offer: {
      title: getRandomArrElement(TITLE),
      adress: `${lat  }, ${  lng}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomArrElement(TYPE),
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
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

const getPromo = () => Array.from({length: PROMO_COUNT}, createPromo);

export {getPromo};
