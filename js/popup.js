import { removeEscapeControl, setEscapeControl } from './escape-control.js';

const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const templates = {
  success: templateSuccess,
  error: templateError
};

const showPopup = (type) => {
  const popup = templates[type].cloneNode(true);

  document.body.appendChild(popup);

  const removePopup = ({ target }) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      popup.remove();
      removeEscapeControl();
    }
  };
  setEscapeControl(() => {
    popup.remove();
  });

  popup.addEventListener('click', (evt) => {
    removePopup(evt);
  });
};

export { showPopup };
