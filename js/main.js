import './form.js';
import './elements-generation.js';
import { loadData } from './fetch-request.js';
import { initFilters, filterPoints } from './filters.js';
import { addAvatar, addImage } from './photos.js';
import { renderPoints } from './map.js';
import { initForm } from './form.js';

const DATA_COUNT = 10;

addAvatar();
addImage();

const main = (data) => () => {
  const filteredPoints = filterPoints(data);
  renderPoints(filteredPoints.slice(0, DATA_COUNT));
};

loadData((data) => {
  const callback = main(data);
  initFilters(callback);
  initForm(callback);
  callback();
});


