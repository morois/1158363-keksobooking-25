const adForm = document.querySelector('.ad-form');
const adFormELements = adForm.querySelectorAll('.ad-form__element, .ad-form-header__input');
const mapFilters = document.querySelectorAll('.map__filter, .map__features');

const addDisabled = () => {
  adForm.classList.add('ad-form--disabled');

  adFormELements.forEach((elem) => {
    elem.disabled =true;
  });

  mapFilters.forEach((filter) => {
    filter.disabled = true;
  });
};

const removeDisabled = () => {
  adForm.classList.remove('ad-form--disabled');

  adFormELements.forEach((elem) => {
    elem.disabled = false;
  });

  mapFilters.forEach((filter) => {
    filter.disabled = false;
  });
};

export {addDisabled, removeDisabled};

