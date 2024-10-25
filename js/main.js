import { getData } from './api.js';
import { createThumbnails } from './thumbnails.js';
import './form.js';
import { showFilters } from './filters.js';
import { showAlert } from './util.js';

getData()
  .then((photos) => {
    createThumbnails(photos);
    showFilters(photos);
  })
  .catch(() => {
    showAlert();
  });
