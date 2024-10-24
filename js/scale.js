const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
const DEFAULT_SCALE = MAX_SCALE;
const SCALE_FACTOR = 0.01;

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
}