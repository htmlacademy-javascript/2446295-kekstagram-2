const errorBlock = document.querySelector('#data-error').content.querySelector('.data-error');

export const showAlert = (message = 'Что-то пошло не так. Приходите завтра', time = 5000) => {
  const alertContainer = errorBlock.cloneNode(true);
  alertContainer.querySelector('.data-error__title').textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, time);
};

export const debounce = (callback, delay = 500) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
};

