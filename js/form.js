import { postData } from './fetch-request.js';
import { resetMap } from './map.js';
import { resetAvatar, resetImage} from './photos.js';

const MAX_ROOMS = 100;
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const COORDINATES = '35.68612, 139.75352';

const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const priceSlider = adForm.querySelector('.ad-form__slider');
const mapFilters = document.querySelector('.map__filters');
const coordinatesField = document.querySelector('#address');

const TYPES_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const checkCapacity = (capacity, rooms) => {
  if (rooms === MAX_ROOMS) {
    return capacity === 0;
  } else {
    return capacity <= rooms && capacity > 0;
  }
};

const getCapacityErrorMessage = (capacity, rooms) => {
  if (rooms === MAX_ROOMS && capacity !== 0) {
    return 'Слишком много комнат для гостей';
  } else {
    return 'Количество гостей больше количества комнат';
  }
};

const validatePriceMax = (max) => {
  if (max > MAX_PRICE) {
    return max === MAX_PRICE;
  }
  return max;
};

const validateForm = (form, callback) => {
  const capacityField = form.querySelector('#capacity');
  const roomsField = form.querySelector('#room_number');
  const titleField = form.querySelector('#title');
  const priceField = form.querySelector('#price');
  const typeOfHousing = form.querySelector('#type');
  const timeInField = form.querySelector('#timein');
  const timeOutField = form.querySelector('#timeout');


  const pristine = new window.Pristine(form, {
    classTo: 'ad-form__element',
    errorTextClass: 'ad-form__error-message',
    errorTextParent: 'ad-form__element',
  });

  pristine.addValidator(
    priceField,
    (value) => value >= TYPES_MIN_PRICE[typeOfHousing.value],
    () =>
      `Минимальная цена выбранного типа жилья: ${
        TYPES_MIN_PRICE[typeOfHousing.value]
      } руб.`
  );

  pristine.addValidator(
    titleField,
    (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE,
    'От 30 до 100 символов'
  );

  pristine.addValidator(
    priceField,
    validatePriceMax,
    'Максимальная цена 100000 руб.'
  );

  pristine.addValidator(
    capacityField,
    () => checkCapacity(+capacityField.value, +roomsField.value),
    () => getCapacityErrorMessage(+capacityField.value, +roomsField.value)
  );

  roomsField.addEventListener('change', () => {
    pristine.validate(capacityField);
  });

  timeInField.addEventListener('change', (evt) => {
    timeOutField.value = evt.target.value;
  });

  timeOutField.addEventListener('change', (evt) => {
    timeInField.value = evt.target.value;
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(evt.target);
      postData(formData, callback);
    }
  });

  noUiSlider.create(priceSlider, {
    start: 1000,
    step: 1,
    connect: 'lower',
    range: {
      min: MIN_PRICE,
      max: MAX_PRICE
    },
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value)
    }
  });

  priceSlider.noUiSlider.on('update', () => {
    priceField.value = priceSlider.noUiSlider.get();
  });

  priceSlider.noUiSlider.on('change', () => {
    pristine.validate(priceField);
  });

  typeOfHousing.addEventListener('change', () => {
    if (+TYPES_MIN_PRICE[typeOfHousing.value]) {
      priceSlider.noUiSlider.set(TYPES_MIN_PRICE[typeOfHousing.value]);
    }
    if (priceField.value > 0) {
      pristine.validate(priceField);
    }
  });
};

const resetForm = (callback) => () => {
  adForm.reset();
  mapFilters.reset();
  priceSlider.noUiSlider.reset();
  resetMap();
  coordinatesField.setAttribute('value', COORDINATES);
  resetAvatar();
  resetImage();
  callback();
};

const initForm = (callback) => {
  resetButton.addEventListener('click', resetForm(callback));
  validateForm(adForm, resetForm(callback));
};

export {initForm};
