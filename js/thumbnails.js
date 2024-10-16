import { openBigPicture } from './big-picture.js';

const thumbnailListElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createThumbnails = (photos) => {
  photos.forEach((photo) => {
    const { url, description, likes, comments } = photo;
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const thumbnailImage = thumbnailElement.querySelector('.picture__img');
    thumbnailImage.src = url;
    thumbnailImage.alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

    // Добавляем обработчик клика на миниатюру
    thumbnailElement.addEventListener('click', () => {
      openBigPicture({ url, likes, comments, description });
    });

    fragment.append(thumbnailElement);
  });
  thumbnailListElement.append(fragment);
};

// Функция для отрисовки миниатюр, используемая при фильтрации
const renderPhotos = (photos) => {
  thumbnailListElement.innerHTML = ''; // Очищаем контейнер перед отрисовкой
  createThumbnails(photos); // Используем ту же логику
};

// Экспортируем обе функции
export { createThumbnails, renderPhotos };
