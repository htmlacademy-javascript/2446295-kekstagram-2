import {getPhotos} from './data.js';
import { createThumbnails } from './thumbnails.js';
import './form.js';
import './validateForm.js';

const photos = getPhotos();
createThumbnails(photos);
