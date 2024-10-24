const errorBlock = document.querySelector('#data-error').content.querySelector('.data-error');

export const showAlert = (message = 'Что-то пошло не так. Приходите завтра', time = 5000, color = 'red') => {
  const alertContainer = errorBlock.cloneNode(true);
  alertContainer.querySelector('.data-error__title').textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, time);
};

