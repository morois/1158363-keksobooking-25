const adForm = document.querySelector('.ad-form');
const adFormELements = adForm.querySelectorAll('.ad-form__element, .ad-form-header__input');
const mapFilters = document.querySelectorAll('.map__filter, .map__features');

const addDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  for(let i = 0; i < adFormELements.length; i++) {
    adFormELements[i].disabled = true;
  }
  for(let j = 0; j < mapFilters.length; j++) {
    mapFilters[j].disabled = true;
  }
};

export {addDisabled};

