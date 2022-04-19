const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png' ];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('#avatar-preview');
const imageChooser = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

const addAvatar = () => {
  avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

const avatarReset = () => {
  avatarPreview.src = DEFAULT_AVATAR;
};

const createImage = (file) => {
  const img = document.createElement('img');
  img.width = 70;
  img.height = 70;
  img.alt = 'Фотография жилья';
  img.src = URL.createObjectURL(file);

  imagePreview.append(img);

  return imagePreview;
};

const addImage = () => {
  imageChooser.addEventListener('change', () => {
    const file = imageChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      createImage(file);
    }
  });
};

const resetImage = () => {
  imagePreview.removeChild(imagePreview.children[0]);
};

export {addAvatar, avatarReset, addImage, resetImage};
