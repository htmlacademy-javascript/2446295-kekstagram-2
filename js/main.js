import { getData } from './api.js';
import { createThumbnails, renderPhotos } from './thumbnails.js';
import './form.js';
import './validateForm.js';
import './imageEdit.js';
import { showError } from './error.js';
import { showFilters, onFilterChange } from './filters.js';

// Получение и отображение фотографий с сервера
getData()
  .then((photos) => {
    createThumbnails(photos); // Отрисовываем миниатюры по умолчанию
    showFilters(); // Показываем фильтры после загрузки данных

    // Добавляем обработчики для фильтров
    const filtersForm = document.querySelector('.img-filters__form');
    filtersForm.addEventListener('click', (evt) => onFilterChange(evt, photos));
  })
  .catch((error) => {
    showError('Ошибка при загрузке данных: ' + error.message);
  });
