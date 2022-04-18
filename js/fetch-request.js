import { messageSuccess, messageError, showAlert } from './messages.js';
import { resetForm } from './form.js';

const GET_DATA_SERVER = 'https://25.javascript.pages.academy/keksobooking/data';
const POST_DATA_SERVER = 'https://25.javascript.pages.academy/keksobooking';
const DATA_COUNT = 10;

const loadData = (onSuccess) => {
  fetch(GET_DATA_SERVER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Ошибка в получении данных. Попробуйте ещё раз');
    })
    .then((data) => onSuccess(data.slice(0, DATA_COUNT)))
    .catch( () =>
      showAlert('Ошибка в получении данных. Попробуйте ещё раз')
    );
};

const postData = (data) => {
  fetch(POST_DATA_SERVER, {
    method: 'POST',
    body: data,
  }).then(() => {
    messageSuccess();
    resetForm();})
    .catch(messageError);
};

export { loadData, postData };
