// Получаем ссылки на необходимые элементы
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

// Устанавливаем начальные значения
let currentScale = 100; // по умолчанию 100%

// Функция для обновления масштаба изображения
const updateScale = () => {
  imgPreview.style.transform = `scale(${currentScale / 100})`;
  scaleValue.value = `${currentScale}%`;
};

// Обработчики событий для кнопок масштабирования
scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
});

// Настройка noUiSlider
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

// Инициализация noUiSlider
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

// Функция для применения эффекта
const applyEffect = (effect) => {
  imgPreview.style.filter = '';
  effectLevelSlider.noUiSlider.set(1); // сбросить слайдер
  effectLevelValue.value = 1; // Сбрасываем значение эффекта в скрытое поле

  switch (effect) {
    case 'chrome':
      imgPreview.style.filter = 'grayscale(0)';
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
      });
      break;
    case 'sepia':
      imgPreview.style.filter = 'sepia(0)';
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
      });
      break;
    case 'marvin':
      imgPreview.style.filter = 'invert(0)';
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
      });
      break;
    case 'phobos':
      imgPreview.style.filter = 'blur(0px)';
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
      });
      break;
    case 'heat':
      imgPreview.style.filter = 'brightness(1)';
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
      });
      break;
    case 'original':
      imgUploadEffectLevel.classList.add('hidden');
      return; // Выход из функции, если эффект оригинал
  }
  imgUploadEffectLevel.classList.remove('hidden');
};

// Обработчик изменения уровня эффекта
effectLevelSlider.noUiSlider.on('update', (values) => {
  const value = parseFloat(values[0]);

  switch (document.querySelector('input[name="effect"]:checked').value) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${value})`;
      break;
    default:
      imgPreview.style.filter = '';
  }
});

// Обработчик переключения эффектов
document.querySelectorAll('input[name="effect"]').forEach((input) => {
  input.addEventListener('change', (evt) => {
    applyEffect(evt.target.value);
  });
});

// Инициализация по умолчанию
applyEffect('original');
