import './form.js';
import './elements-generation.js';
import { loadData } from './fetch-request.js';
import {renderPoints} from './map.js';

loadData((data) => renderPoints(data));
