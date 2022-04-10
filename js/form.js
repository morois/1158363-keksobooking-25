const adForm = document.querySelector('.ad-form');

const MAX_ROOMS = 100;
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;

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

const validateForm = (form) => {
  const capacityField = form.querySelector('#capacity');
  const roomsField = form.querySelector('#room_number');
  const titleField = form.querySelector('#title');
  const priceField = form.querySelector('#price');
  const typeOfHousing = form.querySelector('#type');
  const timeInField = form.querySelector('#timein');
  const timeOutField = form.querySelector('#timeout');
  const priceSlider= adForm.querySelector('.ad-form__slider');

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      return 'valid form';
    } else {
      return 'invalid form';
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
    priceField.placeholder = TYPES_MIN_PRICE[typeOfHousing.value];
    if (priceField.value > 0) {
      pristine.validate(priceField);
    }
  });
};

validateForm(adForm);
