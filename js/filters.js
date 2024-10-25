import { renderPhotos } from './thumbnails.js';
import { debounce } from './util.js';
import { FILTERS, DEFAULT_PHOTOS_COUNT, RANDOM_PHOTOS_COUNT } from './constants.js';

const filtersForm = document.querySelector('.img-filters__form');
const imgFilters = document.querySelector('.img-filters');

let currentFilter = FILTERS.DEFAULT;
let localData;

const sortByComments = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const getRandomPhotos = (photos) => [...photos].sort(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTOS_COUNT);

const filterPhotos = {
  [FILTERS.DEFAULT]: () => localData.slice(0, DEFAULT_PHOTOS_COUNT),
  [FILTERS.RANDOM]: () => getRandomPhotos(localData),
  [FILTERS.DISCUSSED]: () => sortByComments(localData)
};

const setActiveButton = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

filtersForm.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    setActiveButton(evt.target);
  }
});

filtersForm.addEventListener('click', debounce((evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const selectedFilter = evt.target.id;
    if (selectedFilter !== currentFilter) {
      currentFilter = selectedFilter;
      const filteredPhotos = filterPhotos[selectedFilter]();
      renderPhotos(filteredPhotos);
    }
  }
}));

const showFilters = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');
  localData = [...photos];
};

export { showFilters };
