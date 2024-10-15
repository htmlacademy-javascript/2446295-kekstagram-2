// Функция для показа сообщения об успешной отправке
const showSuccess = () => {
  const template = document.querySelector('#success-template').content.cloneNode(true);
  const successElement = template.querySelector('.success');
  const successButton = template.querySelector('.success__button');

  document.body.appendChild(successElement);

  const removeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEscPress);
  };

  // Закрытие по нажатию на кнопку
  successButton.addEventListener('click', removeSuccessMessage);

  // Закрытие по клику на область вне сообщения
  successElement.addEventListener('click', (evt) => {
    if (evt.target === successElement) {
      removeSuccessMessage();
    }
  });

  // Закрытие по нажатию клавиши Esc
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      removeSuccessMessage();
    }
  };
  document.addEventListener('keydown', onEscPress);
};

export { showSuccess };
