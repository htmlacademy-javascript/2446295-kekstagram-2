import {getPhotos} from './data.js';
import {createThumbnails} from './thumbnails.js';

const photos = getPhotos();

createThumbnails(photos);
