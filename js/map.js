import { removeDisabled, addDisabled } from './disabled-form.js';
import {createPromoPopup} from './elements-generation.js';

const CENTER_LAT = 35.68612;
const CENTER_LNG = 139.75352;
const ZOOM = 13;
const addressField = document.querySelector('#address');

addDisabled();

const map = L.map('map-canvas')
  .on('load', () => {
    removeDisabled();
    addressField.value = `${CENTER_LAT}, ${CENTER_LNG}`;
  })
  .setView(
    {
      lat: CENTER_LAT,
      lng: CENTER_LNG,
    },
    ZOOM,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const icon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  {
    draggable: true,
    icon,
  }
);

marker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressField.value =
    `${coordinates.lat.toFixed(5)}, ` +
    `${coordinates.lng.toFixed(5)}`;
});

marker.addTo(map);

const promoIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const renderPoints = (points) => {
  markerGroup.eachLayer((point) => point.remove());
  points.forEach((point) => {
    const promoMarkers = L.marker(
      {
        ...point.location,
      },
      {
        icon: promoIcon,
      }
    );

    promoMarkers
      .addTo(markerGroup)
      .bindPopup(createPromoPopup(point));
  });
};

const resetMap = () => {
  marker.setLatLng({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  });
  map.closePopup();
  map.setView({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  }, ZOOM );
};

export { renderPoints, resetMap };
