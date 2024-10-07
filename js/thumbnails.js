const thumbnailListElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const createThumbnails = (photos) => {
  photos.forEach(({url, description, likes, comments}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const thumbnailImage = thumbnailElement.querySelector('.picture__img');
    thumbnailImage.src = url;
    thumbnailImage.alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(thumbnailElement);
  });
  return thumbnailListElement.append(fragment);
};

export {createThumbnails};

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.

/*<a href="#" class="picture">
  <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
  <p class="picture__info">
    <span class="picture__comments"></span>
    <span class="picture__likes"></span>
  </p>
</a>*/
