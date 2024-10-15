import { getData } from './api.js';
import { createThumbnails } from './thumbnails.js';
import './form.js';
import './validateForm.js';
import './imageEdit.js';
import { showError } from './error.js'; // Импорт функции показа ошибки

// Получение и отображение фотографий с сервера
getData()
  .then((photos) => {
    createThumbnails(photos);
  })
  .catch((error) => {
    showError('Ошибка при загрузке данных: ' + error.message);
  });
