import {renderPoints} from './map.js';
import { debounce } from './debounce.js';

const DATA_COUNT = 10;

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

const filters = [typeFilterElement, priceFilterElement, roomsFilterElement, guestsFilterElement];
const featureFilters = [
  wifiFilterElement,
  dishwasherFilterElement,
  parkingFilterElement,
  washerFilterElement,
  elevatorFilterElement,
  conditionerFilterElement,
];

const filterPoints = (data) => () => {
  let filteredPoints = [...data];
  filters.forEach((filter) => {
    const { name, value } = filter;
    if (value === 'any') {
      return;
    }
    const parameter = name.split('-')[1];
    filteredPoints = filteredPoints.filter((point) => String(point.offer[parameter]) === value);
  });
  featureFilters.forEach((filter) => {
    const { value, checked } = filter;
    if (!checked) {
      return;
    }
    filteredPoints = filteredPoints.filter((point) => point.offer.features && point.offer.features.includes(value));
  });
  renderPoints(filteredPoints.slice(0, DATA_COUNT));
};

const initFilters = (data) => {
  [...filters, ...featureFilters].forEach((filter) => {
    filter.addEventListener('change', debounce(filterPoints(data)));
  });
  filterPoints(data)();
};

export { initFilters };
