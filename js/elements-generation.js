import {getPromo} from './promo-setup.js';

const mapContainer = document.querySelector('#map-canvas');
const popupTemplateCard = document.querySelector('#card').content.querySelector('.popup');
const similarPromo = getPromo();
const promoFragment = document.createDocumentFragment();

const popupOfferType = {
  flat: 'Кравтира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дровец',
  hotel: 'Отель'
};

const getPopupCapacity = (room, guest) => {
  if (room === 1 && guest === 1) {
    return `${room} комната для ${guest} гостя`;
  } else if (room === 1) {
    return `${room} комната для ${guest} гостей`;
  } else if (guest === 1) {
    return `${room} комнаты для ${guest} гостя`;
  } else if (room === 5) {
    return `${room} комнат для ${guest} гостей`;
  } return `${room} комнаты для ${guest} гостей`;
};

const getPopupFeatures = (features) => {

  const featuresContainer = document.createElement('ul');

  features.forEach((feature) => {
    const featureListItem = document.createElement('li');

    featureListItem.classList.add('popup__feature');
    featureListItem.classList.add(`popup__feature--${feature}`);

    featuresContainer.appendChild(featureListItem);
  });
  return featuresContainer.innerHTML;
};

const getPopupPhotos = (photos) => {

  const photoPopupContainer = document.createElement('div');
  photoPopupContainer.classList.add('popup-photos');

  photos.forEach((photo) => {
    const photoPopupItem = document.createElement('img');
    photoPopupItem.src = photo;
    photoPopupItem.classList.add('popup__photo');
    photoPopupItem.width = 45;
    photoPopupItem.height = 40;
    photoPopupItem.alt='Фотография жилья';
    photoPopupContainer.appendChild(photoPopupItem);
  });

  return photoPopupContainer.innerHTML;
};

similarPromo.forEach(({autor, offer}) => {
  const promoElement = popupTemplateCard.cloneNode(true);

  const price = `${ offer.price  }₽/ночь.`;
  const popupTime = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  promoElement.querySelector('.popup__avatar').src = autor.avatar;
  promoElement.querySelector('.popup__title').textContent = offer.title;
  promoElement.querySelector('.popup__text--address').textContent = offer.address;
  promoElement.querySelector('.popup__text--price').textContent = price;
  promoElement.querySelector('.popup__type').textContent = popupOfferType[offer.type];
  promoElement.querySelector('.popup__text--capacity').textContent = getPopupCapacity(offer.rooms, offer.guests);
  promoElement.querySelector('.popup__text--time').textContent = popupTime;
  promoElement.querySelector('.popup__features').innerHTML = getPopupFeatures(offer.features);
  promoElement.querySelector('.popup__description').textContent = offer.description;
  promoElement.querySelector('.popup__photos').innerHTML = getPopupPhotos(offer.photos);

  mapContainer.append(promoElement);
});

mapContainer.append(promoFragment);

