const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png' ];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('#avatar-preview');
const imageChooser = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');
const image = document.createElement('img');

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

const resetAvatar = () => {
  avatarPreview.src = DEFAULT_AVATAR;
};

const addImage = () => {
  imageChooser.addEventListener('change', () => {
    const file = imageChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches && !(imagePreview.children.length)) {
      image.width = '70';
      image.height= '70';
      image.alt = 'Фотография жилья';
      image.src = URL.createObjectURL(file);
      imagePreview.append(image);
    } else {
      imagePreview.firstElementChild.src = URL.createObjectURL(file);
    }
  });
};

const resetImage = () => {
  image.remove();
};

export {addAvatar, resetAvatar, addImage, resetImage};
