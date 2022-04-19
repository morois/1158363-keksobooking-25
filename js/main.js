import './form.js';
import './elements-generation.js';
import { loadData } from './fetch-request.js';
import { initFilters } from './filters.js';
import { renderPoints } from './map.js';
import {addAvatar, addImage} from './photos.js';

loadData((data) => {
  initFilters(data);
  renderPoints(data);
});

addAvatar();
addImage();
