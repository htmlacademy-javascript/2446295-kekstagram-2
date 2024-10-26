import { removeEscapeControl, setEscapeControl } from './escape-control.js';
import { COMMENTS_STEP, AVATAR_WIDTH, AVATAR_HEIGHT } from './constants.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureOverlay = bigPictureElement.querySelector('.big-picture__preview');

let visibleCommentsCount = 0;
let comments = [];

const createCommentElement = ({ avatar, message, name }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = AVATAR_WIDTH;
  avatarElement.height = AVATAR_HEIGHT;

  const messageElement = document.createElement('p');
  messageElement.classList.add('social__text');
  messageElement.textContent = message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(messageElement);

  return commentElement;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const commentsToShow = comments.slice(visibleCommentsCount, visibleCommentsCount + COMMENTS_STEP);

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.append(commentElement);
  });

  commentsList.append(fragment);
  visibleCommentsCount += commentsToShow.length;

  commentCountElement.textContent = visibleCommentsCount;
  totalCommentCountElement.textContent = comments.length;

  if (visibleCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const openBigPicture = ({ url, likes, comments: newComments, description }) => {
  visibleCommentsCount = 0;
  comments = newComments;

  bigPictureElement.classList.remove('hidden');

  commentsList.innerHTML = '';

  commentCountElement.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  renderComments();

  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  commentsLoader.addEventListener('click', renderComments);
  bigPictureElement.addEventListener('click', onOutsideClick);

  setEscapeControl(closeBigPicture);
};

function onCloseButtonClick(){
  closeBigPicture();
  removeEscapeControl();
}

function closeBigPicture(){
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);
  commentsLoader.removeEventListener('click', renderComments);
  bigPictureElement.removeEventListener('click', onOutsideClick);
}

function onOutsideClick(evt) {
  if (!bigPictureOverlay.contains(evt.target)) {
    closeBigPicture();
    removeEscapeControl();
  }
}

export { openBigPicture };
