import {getId, getRandomInteger, getRandomArrayElement} from './util.js';

const PHOTO_COUNT = 25;

const Like = {
  MIN: 15,
  MAX: 200
};

const Avatar = {
  MIN: 1,
  MAX: 6
};

const Comment = {
  MIN: 0,
  MAX: 30
};

const DESCRIPTIONS = [
  'Утренний пейзаж',
  'Вечерний закат',
  'Городская жизнь',
  'Природная красота',
  'Веселые моменты',
];

const NAMES = ['МегаОратор397', 'Пупырка', 'Иван35см', 'АлкоБогиня', 'СерГей', 'Зураб', 'Александр Накидонский', 'Наталья Ивановна'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getPhotoId = getId();
const generateCommentId = getId();

const getMessage = (items) => {
  const firstMessage = getRandomArrayElement(items);
  const secondMessage = getRandomArrayElement(items);
  if (firstMessage === secondMessage) {
    return `${firstMessage}`;
  } else {
    return `${firstMessage} ${secondMessage}`;
  }
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(Avatar.MIN, Avatar.MAX)}.svg`,
  message: getMessage(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => {
  const photoId = getPhotoId();
  return ({
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(Like.MIN, Like.MAX),
    comments: Array.from({length: getRandomInteger(Comment.MIN, Comment.MAX)}, createComment),
  });
};

const getPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

export {getPhotos};
