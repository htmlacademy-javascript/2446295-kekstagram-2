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
