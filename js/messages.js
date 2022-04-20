const body = document.querySelector('body');
const successMessage = body.querySelector('#success').content.querySelector('.success');
const errorMessage = body.querySelector('#error').content.querySelector('.error');
const map = body.querySelector('.map');
const submitButton = document.querySelector('.ad-form__submit');

const getMessageSuccess = () => {
  const messageNode = successMessage.cloneNode(true);
  submitButton.setAttribute('disabled', 'true');
  window.addEventListener('click', () => {
    messageNode.remove();
    submitButton.removeAttribute('disabled');
  });
  window.addEventListener('keydown', (e) => {
    if(e.code === 'Escape') {
      messageNode.remove();
      submitButton.removeAttribute('disabled');
    }
  });
  body.appendChild(messageNode);
};

const getMessageError = () => {
  const messageNode = errorMessage.cloneNode(true);
  submitButton.setAttribute('disabled', 'true');
  const button = messageNode.querySelector('.error__button');
  button.addEventListener('click', () => {
    messageNode.remove();
    submitButton.removeAttribute('disabled');
  });
  body.appendChild(messageNode);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  map.append(alertContainer);
};

export { getMessageSuccess, getMessageError, showAlert };
