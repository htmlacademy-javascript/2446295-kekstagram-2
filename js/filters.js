import { renderPhotos } from './thumbnails.js'; // Импорт функции отрисовки миниатюр

const imgFilters = document.querySelector('.img-filters');
let currentFilter = 'filter-default';
const DEFAULT_PHOTOS_COUNT = 25;
const RANDOM_PHOTOS_COUNT = 10;

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const debounce = (callback, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
};

const sortByComments = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const getRandomPhotos = (photos) => {
  const shuffledPhotos = photos.slice().sort(() => 0.5 - Math.random());
  return shuffledPhotos.slice(0, RANDOM_PHOTOS_COUNT);
};

const filterPhotos = (filterName, photos) => {
  switch (filterName) {
    case 'filter-default':
      return photos.slice(0, DEFAULT_PHOTOS_COUNT);
    case 'filter-random':
      return getRandomPhotos(photos);
    case 'filter-discussed':
      return sortByComments(photos);
    default:
      return photos.slice(0, DEFAULT_PHOTOS_COUNT);
  }
};

const onFilterChange = debounce((evt, photos) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const selectedFilter = evt.target.id;
    if (selectedFilter !== currentFilter) {
      currentFilter = selectedFilter;
      document.querySelectorAll('.picture').forEach((picture) => picture.remove());
      const filteredPhotos = filterPhotos(selectedFilter, photos);
      renderPhotos(filteredPhotos);
    }
  }
}, 500);

export { showFilters, onFilterChange };
