export const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

export const COMMENTS_STEP = 5;

export const Effects = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  DEFAULT: 'none'
};

export const EffectsSettings = {
  [Effects.CHROME]: { MIN: 0, MAX: 1, STEP: 0.1, UNITS: '', STYLE: 'grayscale' },
  [Effects.SEPIA]: { MIN: 0, MAX: 1, STEP: 0.1, UNITS: '', STYLE: 'sepia' },
  [Effects.MARVIN]: { MIN: 0, MAX: 100, STEP: 1, UNITS: '%', STYLE: 'invert' },
  [Effects.PHOBOS]: { MIN: 0, MAX: 3, STEP: 0.1, UNITS: 'px', STYLE: 'blur' },
  [Effects.HEAT]: { MIN: 1, MAX: 3, STEP: 0.1, UNITS: '', STYLE: 'brightness' },
};

export const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/;
export const DESCRIPTION_MAX_LENGTH = 140;
export const MAX_TAGS = 5;

export const SubmitCaption = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

export const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

export const DEFAULT_PHOTOS_COUNT = 25;
export const RANDOM_PHOTOS_COUNT = 10;

export const Popups = {
  SUCCESS: 'success',
  ERROR: 'error'
};

export const MIN_SCALE = 25;
export const MAX_SCALE = 100;
export const STEP_SCALE = 25;
export const DEFAULT_SCALE = MAX_SCALE;
export const SCALE_FACTOR = 0.01;
