const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/; // Паттерн: # + 1-19 букв или цифр
const DRSCRIPTION_MAX_LENGTH = 140;

// Получаем ссылки на элементы формы и её полей
const form = document.querySelector('#upload-select-image');
const uploadFileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

// Функция открытия формы
const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Функция закрытия формы
const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset(); // Сброс формы при закрытии
};

// Открытие формы при выборе файла
uploadFileInput.addEventListener('change', openForm);

// Закрытие формы по нажатию кнопки "Закрыть"
cancelButton.addEventListener('click', closeForm);

// Функция закрытия формы по клавише Esc
const onEscapePress = (evt) => {
  // Проверяем, что нажатие клавиши Esc и фокус не находится на input или textarea
  if ((evt.key === 'Escape' || evt.key === 'Esc') && !document.activeElement.matches('input, textarea')) {
    closeForm();
  }
};

// Обработчик закрытия формы по клавише Esc
document.addEventListener('keydown', onEscapePress);

// Отключение обработки Esc при фокусе на полях
form.querySelectorAll('input, textarea').forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.stopPropagation();
    }
  });
});

// Инициализация Pristine для валидации формы
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Класс обёртки поля
  errorClass: 'has-danger',// Класс при ошибке
  successClass: 'has-success',// Класс при успешной валидации
  errorTextParent: 'img-upload__field-wrapper', // Класс для добавления сообщения об ошибке
  errorTextTag: 'div',// Тег для сообщения об ошибке
  errorTextClass: 'form-error',// Класс самого сообщения
});

// Функция для валидации хэштегов
const validateHashtags = (value) => {
  if (!value) {
    return true;
  } // Хэштеги необязательны

  const hashtags = value.trim().toLowerCase().split(/\s+/); // Приводим к нижнему регистру и разделяем по пробелам

  if (hashtags.length > 5) {
    return false;
  } // Не более 5 хэштегов

  const uniqueHashtags = new Set(hashtags); // Проверка на уникальность

  // Проверяем каждый хэштег на соответствие паттерну и уникальность
  return hashtags.every(tag => HASHTAG_PATTERN.test(tag)) && uniqueHashtags.size === hashtags.length;
};

// Функция для валидации комментария
const validateComment = (value) => value.length <= DRSCRIPTION_MAX_LENGTH; // Ограничение на длину комментария


// Добавляем кастомные валидации для хэштегов и комментариев
pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Хэштеги должны начинаться с #, содержать только буквы и цифры, не превышать 20 символов и не дублироваться. Максимум 5 хэштегов.'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Комментарий не может содержать более 140 символов.'
);

// Обработчик отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Предотвращаем стандартную отправку формы

  const isValid = pristine.validate(); // Проверяем форму на валидность

  if (isValid) {
    console.log('Форма отправлена');
    // Здесь можно добавить логику отправки формы через AJAX
    // Например, используя fetch или XMLHttpRequest
  } else {
    console.log('Форма содержит ошибки');
  }
});
