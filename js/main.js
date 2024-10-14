import {getPhotos} from './data.js';
import { createThumbnails } from './thumbnails.js';
import './form.js';
import './validateForm.js';
import './imageEdit.js';

const photos = getPhotos();
createThumbnails(photos);
