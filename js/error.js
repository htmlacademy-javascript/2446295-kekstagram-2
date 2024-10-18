// Функция для показа сообщения об ошибке
const showError = (message) => {
  const template = document.querySelector('#error').content.cloneNode(true); // Исправляем ID шаблона на 'error'
  const errorElement = template.querySelector('.error');
  const errorButton = template.querySelector('.error__button');
  const errorTitle = template.querySelector('.error__title');
  errorTitle.textContent = message;

  document.body.appendChild(errorElement);

  const removeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscPress);
  };

  // Закрытие по нажатию на кнопку
  errorButton.addEventListener('click', removeErrorMessage);

  // Закрытие по клику на область вне сообщения
  errorElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {  // Проверка на клик вне блока с сообщением
      removeErrorMessage();
    }
  });

  // Закрытие по нажатию клавиши Esc
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      removeErrorMessage();
    }
  };
  document.addEventListener('keydown', onEscPress);

  // Автоматическое удаление через 4 секунды
  setTimeout(removeErrorMessage, 4000);
};

export { showError };
