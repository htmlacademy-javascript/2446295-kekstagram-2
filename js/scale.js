import {MIN_SCALE, MAX_SCALE, STEP_SCALE, DEFAULT_SCALE, SCALE_FACTOR} from './constants.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const updateScale = () => {
  imgPreview.style.transform = `scale(${currentScale * SCALE_FACTOR})`;
  scaleValue.value = `${currentScale}%`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= STEP_SCALE;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    currentScale += STEP_SCALE;
    updateScale();
  }
});

export const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  updateScale();
};
