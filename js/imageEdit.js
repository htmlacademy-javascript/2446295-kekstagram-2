import { EffectsSettings, Effects } from './constants.js';

const imgPreview = document.querySelector('.img-upload__preview img');
const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const effectsPreviews = document.querySelectorAll('.effects__preview'); // Все превью для эффектов
const effects = document.querySelector('.effects');
const sliderContainer = document.querySelector('.effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentEffect = Effects.DEFAULT;
const updateEffectsPreviews = (imageSrc) => {
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageSrc})`;
    preview.style.backgroundSize = 'cover';
  });
};

uploadFileInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const imageSrc = URL.createObjectURL(file);
    imgPreview.src = imageSrc;
    updateEffectsPreviews(imageSrc);
    imgUploadOverlay.classList.remove('hidden');
  }
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseFloat(value);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

effectLevelSlider.noUiSlider.on('update', () => {
  if (currentEffect !== Effects.DEFAULT) {
    const { STYLE, UNITS } = EffectsSettings[currentEffect];
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgPreview.style.filter = `${STYLE}(${effectLevelValue.value}${UNITS})`;
  }
});

const updateSlider = () => {
  const { MIN, MAX, STEP } = EffectsSettings[currentEffect];
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: MIN,
      max: MAX,
    },
    step: STEP,
    start: MAX
  });
};

const showSlider = (isVisible = true) => {
  if (isVisible) {
    sliderContainer.classList.remove('hidden');
  } else {
    sliderContainer.classList.add('hidden');
  }
};

export const resetEffects = () => {
  showSlider(false);
  imgPreview.style.filter = '';
};

effects.addEventListener('change', ({ target }) => {
  currentEffect = target.value;
  if (currentEffect === Effects.DEFAULT) {
    resetEffects();
  } else {
    updateSlider();
    showSlider();
  }
});

resetEffects();

