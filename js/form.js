import { sendData } from './api.js';
import { showPopup } from './popup.js';
import { resetEffects } from './imageEdit.js';
import { resetScale } from './scale.js';
import { removeEscapeControl, setEscapeControl } from './escape-control.js';


// Ссылки на элементы формы
const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

// Функция открытия формы
function openForm() {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // document.addEventListener('keydown', onEscapePress);
  setEscapeControl(closeForm);
}

// Функция закрытия формы
function closeForm() {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // document.removeEventListener('keydown', onEscapePress);
  form.reset(); // Сброс формы при закрытии
  resetEffects();
  resetScale();
}

const SubmitCaption = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

// Функция для блокировки кнопки отправки на время выполнения запроса
const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
  submitButton.textContent = isBlocked ? SubmitCaption.SENDING : SubmitCaption.IDLE;
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Отменяем стандартное действие формы
  const formData = new FormData(form); // Собираем данные формы

  blockSubmitButton(); // Блокируем кнопку отправки

  sendData(formData) // Отправляем данные на сервер
    .then(() => {
      closeForm();
      removeEscapeControl();
      showPopup('success');
    })
    .catch((error) => {
      showPopup('error');
    })
    .finally(() => {
      blockSubmitButton(false);
    });
});

// Обработчики событий открытия и закрытия формы
fileInput.addEventListener('change', openForm);
closeButton.addEventListener('click', () => {
  closeForm();
  removeEscapeControl();
});
