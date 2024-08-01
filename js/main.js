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

// Массив описаний для фотографий
const descriptions = [
  'Утренний пейзаж',
  'Вечерний закат',
  'Городская жизнь',
  'Природная красота',
  'Веселые моменты',
];

// Массив имен для комментаторов
const names = ['МегаОратор397', 'Пупырка', 'Иван35см', 'АлкоБогиня', 'СерГей', 'Зураб', 'Александр Накидонский', 'Наталья Ивановна'];

// Массив сообщений для комментариев
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Генерация случайного комментария
function generateComment() {
  return {
    id: generateUniqueId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  };
}

// Генерация массива случайных комментариев
function generateComments() {
  const commentsCount = getRandomNumber(0, 30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }
  return comments;
}

// Генерация данных для одной фотографии
function generatePhotoData(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomNumber(15, 200),
    comments: generateComments()
  };
}

// Генерация массива данных для фотографий
function generatePhotosData(count) {
  const photos = [];
  for (let i = 1; i <= count; i++) {
    photos.push(generatePhotoData(i));
  }
  return photos;
}

// Генерация массива данных для 25 фотографий
const photosData = generatePhotosData(25);
console.log(photosData);
