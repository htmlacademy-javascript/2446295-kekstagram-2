import { generatePhotosData } from './photosRender.js';

document.addEventListener('DOMContentLoaded', () => {
  const photosData = generatePhotosData(25);
  console.log(photosData);
})
