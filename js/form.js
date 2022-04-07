const adForm = document.querySelector('.ad-form');

const checkCapacity = (capacity, rooms) => {
  if (rooms === 100) {
    return capacity === 0;
  } else {
    return (capacity <= rooms && capacity > 0);
  }
};

const getCapacityErrorMessage = (capacity, rooms) => {
  if (rooms === 100 && capacity !== 0) {
    return 'Слишком много комнат для гостей';
  } else {
    return 'Количество гостей больше количества комнат';
  }
};

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

const validatePriceMin = (min) => {
  if (min < 0) {
    return min === 0;
  }
  return min;
};

const validatePriceMax = (max) => {
  if (max > 100000) {
    return max === 100000;
  }
  return max;
};

const validateForm = (form) => {
  const capacityField = form.querySelector('#capacity');
  const roomsField = form.querySelector('#room_number');
  const titleField = form.querySelector('#title');
  const priceField = form.querySelector('#price');

  const pristine = new window.Pristine(form, {
    classTo: 'ad-form__element',
    errorTextClass: 'ad-form__error-message',
    errorTextParent: 'ad-form__element',
  });

  pristine.addValidator(
    titleField,
    validateTitle,
    'От 30 до 100 символов'
  );

  pristine.addValidator(
    priceField,
    validatePriceMin,
    'Минимальная цена 0 руб.'
  );

  pristine.addValidator(
    priceField,
    validatePriceMax,
    'Максимальная цена 100000 руб.'
  );

  pristine.addValidator(
    capacityField,
    () => checkCapacity(+capacityField.value, +roomsField.value),
    () => getCapacityErrorMessage(+capacityField.value, +roomsField.value),
  );

  roomsField.addEventListener('change', () => {
    pristine.validate(capacityField);
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
};

validateForm(adForm);


