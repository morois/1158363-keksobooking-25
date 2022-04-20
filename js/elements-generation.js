const popupTemplateCard = document.querySelector('#card').content.querySelector('.popup');
const popupImage = popupTemplateCard.querySelector('.popup__photo');
const popupFeatures = popupTemplateCard.querySelector('.popup__features');

const popupOfferType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дровец',
  hotel: 'Отель',
};

const SINGLE_GUEST = 1;
const SINGLE_ROOM = 1;
const ROOMS_COUNT = 5;

const getPopupCapacity = (room, guest) => {
  if (room === SINGLE_ROOM && guest === SINGLE_GUEST) {
    return `${room} комната для ${guest} гостя`;
  } else if (room === SINGLE_ROOM) {
    return `${room} комната для ${guest} гостей`;
  } else if (guest === SINGLE_GUEST) {
    return `${room} комнаты для ${guest} гостя`;
  } else if (room === ROOMS_COUNT) {
    return `${room} комнат для ${guest} гостей`;
  } return `${room} комнаты для ${guest} гостей`;
};

const getPopupFeatures = (features) => {
  if (features) {
    popupFeatures.innerHTML = '';
    features.forEach((feature) => {
      const listElement = document.createElement('li');
      listElement.classList.add('popup__feature' , `popup__feature--${feature}` );
      popupFeatures.append(listElement);
    });
  } else {
    popupFeatures.classList.add('.visually-hidden');
  }
};

const getPopupPhotos = (parent, point) => {
  if (point.offer.photos){
    parent.innerHTML = '';
    point.offer.photos.forEach((item) => {
      const photoElement = popupImage.cloneNode(true);
      photoElement.src = item;
      parent.append(photoElement);
    });
  } else {
    parent.classList.add('hidden');
  }
};

const createPromoPopup = (point) => {
  const promoElement = popupTemplateCard.cloneNode(true);
  const {author, offer} = point;
  const price = `${ offer.price  }₽/ночь.`;
  const popupTime = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  promoElement.querySelector('.popup__avatar').src = author.avatar;
  promoElement.querySelector('.popup__title').textContent = offer.title;
  promoElement.querySelector('.popup__text--address').textContent = offer.address;
  promoElement.querySelector('.popup__text--price').textContent = price;
  promoElement.querySelector('.popup__type').textContent = popupOfferType[offer.type];
  promoElement.querySelector('.popup__text--capacity').textContent = getPopupCapacity(offer.rooms, offer.guests);
  promoElement.querySelector('.popup__text--time').textContent = popupTime;
  promoElement.querySelector('.popup__description').textContent = offer.description;
  getPopupPhotos(promoElement.querySelector('.popup__photos'), point);
  getPopupFeatures(point.offer.features);
  return promoElement;
};

export {createPromoPopup};
