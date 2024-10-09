const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const commentsCountShown = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsCountTotal = bigPictureElement.querySelector('.social__comment-total-count');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

const body = document.querySelector('body');

// Функция для создания одного комментария
const createCommentElement = ({ avatar, message, name }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = avatar;
  commentImage.alt = name;
  commentImage.width = 35;
  commentImage.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;

  commentElement.appendChild(commentImage);
  commentElement.appendChild(commentText);

  return commentElement;
};

// Функция для отрисовки всех комментариев
const renderComments = (comments) => {
  commentsContainer.innerHTML = ''; // Очищаем контейнер комментариев
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(fragment);
};

// Функция для показа полноразмерного изображения
const openBigPicture = ({ url, likes, comments, description }) => {
  bigPictureElement.classList.remove('hidden'); // Удаляем класс hidden
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCountShown.textContent = comments.length;
  commentsCountTotal.textContent = comments.length;
  captionElement.textContent = description;

  renderComments(comments); // Отрисовываем комментарии

  body.classList.add('modal-open'); // Отключаем скролл фона
};

// Функция для закрытия окна
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

// Слушатели для закрытия окна
closeButton.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

export { openBigPicture };
