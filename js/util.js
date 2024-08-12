// Генерация случайного числа в диапазоне от min до max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Выбор случайного элемента из массива
function getRandomArrayElement(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

// Генерация уникального идентификатора
const generateUniqueId = (() => {
  let id = 0;
  return () => ++id;
})();

export { getRandomNumber, getRandomArrayElement, generateUniqueId };
