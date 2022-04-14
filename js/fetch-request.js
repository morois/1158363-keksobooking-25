const GET_DATA_SERVER = 'https://25.javascript.pages.academy/keksobooking/data';

const onGetRequestError = () => {};

const loadData = (onSuccess) => {
  fetch(GET_DATA_SERVER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onGetRequestError('Ошибка в получении данных. Попробуйте ещё раз.');
      }
    })
    .then((data) => onSuccess(data))
    .catch(() => onGetRequestError('Ошибка в получении данных. Попробуйте ещё раз.'));
};

export {loadData};
