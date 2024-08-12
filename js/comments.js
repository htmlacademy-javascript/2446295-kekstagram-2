import { getRandomNumber, getRandomArrayElement, generateUniqueId } from './util.js';
import { NAMES, MESSAGES } from './data.js';

// Генерация случайного комментария
function generateComment() {
  return {
    id: generateUniqueId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
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

export { generateComments };
