import {renderPoints} from './map.js';
import { debounce } from './debounce.js';

const DATA_COUNT = 10;

const mapFilters = document.querySelector('.map__filters');

const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const wifiFilter = mapFilters.querySelector('#filter-wifi');
const dishwasherFilter = mapFilters.querySelector('#filter-dishwasher');
const parkingFilter = mapFilters.querySelector('#filter-parking');
const washerFilter = mapFilters.querySelector('#filter-washer');
const elevatorFilter = mapFilters.querySelector('#filter-elevator');
const conditionerFilter = mapFilters.querySelector('#filter-conditioner');

const filters = [typeFilter, priceFilter, roomsFilter, guestsFilter];
const featureFilters = [
  wifiFilter,
  dishwasherFilter,
  parkingFilter,
  washerFilter,
  elevatorFilter,
  conditionerFilter
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
