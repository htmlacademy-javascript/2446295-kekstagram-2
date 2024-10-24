import { EffectsSettings, Effects } from './constants.js';

// Получаем ссылки на необходимые элементы

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
    preview.style.backgroundImage = `url(${imageSrc})`; // Устанавливаем фон для превью эффектов
    preview.style.backgroundSize = 'cover'; // Настраиваем размер фона
  });
};

// Обработчик загрузки файла
uploadFileInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];

  // Проверяем, выбран ли файл и является ли он изображением
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    // Когда файл загружен, отображаем его в предварительном просмотре и в миниатюрах эффектов
    reader.onload = () => {
      const imageSrc = reader.result;
      imgPreview.src = imageSrc; // Устанавливаем загруженное изображение в элемент img
      updateEffectsPreviews(imageSrc); // Обновляем превью для эффектов
      imgUploadOverlay.classList.remove('hidden'); // Показываем форму редактирования
    };

    reader.readAsDataURL(file); // Чтение файла как URL
  }
});

// Настройка noUiSlider


// Инициализация noUiSlider
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

