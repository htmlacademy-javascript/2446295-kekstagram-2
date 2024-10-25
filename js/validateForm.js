import { HASHTAG_PATTERN, DESCRIPTION_MAX_LENGTH, MAX_TAGS } from './constants.js';

const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form-error',
});

const getHashTags = (value) => value.trim().toLowerCase().split(/\s+/);

const validateHashtagsNumber = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = getHashTags(value);
  return hashtags.length <= MAX_TAGS;
};

const validateHashtagsUnique = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = getHashTags(value);
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = getHashTags(value);
  return hashtags.every((tag) => HASHTAG_PATTERN.test(tag));
};

const validateComment = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(
  hashtagsInput,
  validateHashtagsNumber,
  `Максимум ${MAX_TAGS} хэштегов.`,
  3,
  false
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsUnique,
  'Хэштеги  не должны дублироваться.',
  2,
  false
);

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Хэштег должен начинаться с решетки, не превышать 20 символов, содержать только буквы и цифры.',
  1,
  false
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не может содержать более ${DESCRIPTION_MAX_LENGTH} символов.`
);

export const isValid = () => pristine.validate();

export const reset = () => pristine.reset();

