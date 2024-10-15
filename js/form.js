import { sendData } from './api.js';
import { showError } from './error.js';
import { showSuccess } from './success.js';

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
  document.addEventListener('keydown', onEscapePress);
}

// Функция закрытия формы
function closeForm() {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePress);
  form.reset(); // Сброс формы при закрытии
}

// Обработчик закрытия формы по кнопке Esc
function onEscapePress(evt) {
  if (evt.key === 'Escape' && !document.activeElement.matches('input, textarea')) {
    closeForm();
  }
}

// Отключение обработки Esc при фокусе на полях
form.querySelectorAll('input, textarea').forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
});

// Функция для блокировки кнопки отправки на время выполнения запроса
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

// Функция для разблокировки кнопки после выполнения запроса
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Обработчик отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Отменяем стандартное действие формы
  const formData = new FormData(form); // Собираем данные формы

  blockSubmitButton(); // Блокируем кнопку отправки

  sendData(formData) // Отправляем данные на сервер
    .then(() => {
      showSuccess(); // Показываем сообщение об успешной отправке
      closeForm(); // Закрываем и сбрасываем форму
      unblockSubmitButton(); // Разблокируем кнопку
    })
    .catch((error) => {
      showError('Ошибка при отправке данных: ' + error.message); // Показываем сообщение об ошибке
      unblockSubmitButton(); // Разблокируем кнопку в случае ошибки
    });
});

// Обработчики событий открытия и закрытия формы
fileInput.addEventListener('change', openForm);
closeButton.addEventListener('click', closeForm);
