// Найдем элементы для работы с полноразмерным изображением и комментариями
const bigPictureElement = document.querySelector('.big-picture');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureOverlay = bigPictureElement.querySelector('.big-picture__preview'); // область модального окна

// Константы для показа по 5 комментариев
const COMMENTS_STEP = 5;
let visibleCommentsCount = 0;
let comments = [];

// Функция для создания элемента комментария
const createCommentElement = ({ avatar, message, name }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35"
      height="35">
    <p class="social__text">${message}</p>
  `;

  return commentElement;
};

// Функция для отрисовки комментариев (по шагу COMMENTS_STEP)
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const commentsToShow = comments.slice(visibleCommentsCount, visibleCommentsCount + COMMENTS_STEP);

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.append(commentElement);
  });

  commentsList.append(fragment);
  visibleCommentsCount += commentsToShow.length;

  // Обновляем счетчик комментариев
  commentCountElement.textContent = `${visibleCommentsCount} из ${comments.length} комментариев`;

  // Скрываем кнопку загрузки комментариев, если все комментарии отображены
  if (visibleCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// Функция для открытия полноразмерного изображения
const openBigPicture = ({ url, likes, comments: newComments, description }) => {
  // Сбрасываем переменные
  visibleCommentsCount = 0;
  comments = newComments;

  // Показываем окно с изображением
  bigPictureElement.classList.remove('hidden');

  // Удаляем старые комментарии
  commentsList.innerHTML = '';

  // Показываем блоки комментариев и кнопки загрузки
  commentCountElement.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Устанавливаем основную информацию для изображения
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  // Рендерим первые комментарии
  renderComments();

  // Добавляем тегу <body> класс, чтобы отключить прокрутку
  document.body.classList.add('modal-open');

  // Добавляем обработчики событий
  closeButton.addEventListener('click', closeBigPicture); // Закрытие по кнопке
  commentsLoader.addEventListener('click', renderComments); // Загрузка комментариев
  document.addEventListener('keydown', onEscPress); // Закрытие по Esc
  bigPictureElement.addEventListener('click', onOutsideClick); // Закрытие по клику вне модалки
};

// Функция для закрытия полноразмерного изображения
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Убираем обработчики
  closeButton.removeEventListener('click', closeBigPicture);
  commentsLoader.removeEventListener('click', renderComments);
  document.removeEventListener('keydown', onEscPress);
  bigPictureElement.removeEventListener('click', onOutsideClick);
};

// Обработчик для нажатия клавиши Esc
const onEscPress = (evt) => {
  if ((evt.keyCode === 27)) {
    closeBigPicture();
  }
};

// Обработчик для клика вне модального окна
const onOutsideClick = (evt) => {
  // Если кликнули не по модальной части, закрываем окно
  if (!bigPictureOverlay.contains(evt.target)) {
    closeBigPicture();
  }
};

export { openBigPicture };
