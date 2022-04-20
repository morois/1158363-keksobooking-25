import { debounce } from './debounce.js';

const mapFiltersElements = document.querySelector('.map__filters');

const typeFilterElement = mapFiltersElements.querySelector('#housing-type');
const priceFilterElement = mapFiltersElements.querySelector('#housing-price');
const roomsFilterElement = mapFiltersElements.querySelector('#housing-rooms');
const guestsFilterElement = mapFiltersElements.querySelector('#housing-guests');
const wifiFilterElement = mapFiltersElements.querySelector('#filter-wifi');
const dishwasherFilterElement = mapFiltersElements.querySelector('#filter-dishwasher');
const parkingFilterElement = mapFiltersElements.querySelector('#filter-parking');
const washerFilterElement = mapFiltersElements.querySelector('#filter-washer');
const elevatorFilterElement = mapFiltersElements.querySelector('#filter-elevator');
const conditionerFilterElement = mapFiltersElements.querySelector('#filter-conditioner');

const selectFilterElements = [typeFilterElement, roomsFilterElement, guestsFilterElement];
const featureFilterElements = [
  wifiFilterElement,
  dishwasherFilterElement,
  parkingFilterElement,
  washerFilterElement,
  elevatorFilterElement,
  conditionerFilterElement,
];

const isInPriceRange = (point) => {
  const { value } = priceFilterElement;
  const { price } = point.offer;
  return (
    value === 'any' ||
    (value === 'low' && price < 10000) ||
    (value === 'middle' &&
      point.offer.price > 10000 &&
      point.offer.price < 50000) ||
    (value === 'high' && price > 50000)
  );

};

const filterPoints = (data) => data.filter((point) => {
  for (const filter of selectFilterElements) {
    const { name, value } = filter;
    const parameter = name.split('-')[1];
    if (value !== 'any' && String(point.offer[parameter]) !== value) {
      return false;
    }
  }
  if (!isInPriceRange(point)) {
    return false;
  }
  for (const filter of featureFilterElements) {
    const { value, checked } = filter;
    const features = point.offer.features || [];
    if (checked && !features.includes(value)) {
      return false;
    }
  }
  return true;
});

const initFilters = (onChange) => {
  [...selectFilterElements, ...featureFilterElements, priceFilterElement].forEach((filter) => {
    filter.addEventListener('change', debounce(onChange));
  });
};

export { initFilters, filterPoints };
