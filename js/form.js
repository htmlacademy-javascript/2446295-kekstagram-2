// Ссылки на элементы формы
const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

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

// Обработчики событий открытия и закрытия формы
fileInput.addEventListener('change', openForm);
closeButton.addEventListener('click', closeForm);
