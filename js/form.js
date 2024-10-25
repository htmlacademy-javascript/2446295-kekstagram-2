import { sendData } from './api.js';
import { showPopup } from './popup.js';
import { resetEffects } from './imageEdit.js';
import { resetScale } from './scale.js';
import { removeEscapeControl, setEscapeControl } from './escape-control.js';
import {reset as resetValidation, isValid} from './validateForm.js';
import { SubmitCaption, Popups } from './constants.js';

const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const canCloseForm = () => !((hashtagsInput === document.activeElement) || (commentInput === document.activeElement));

function openForm() {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  setEscapeControl(closeForm, canCloseForm);
}

function closeForm() {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  resetEffects();
  resetScale();
  resetValidation();
}

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
  submitButton.textContent = isBlocked ? SubmitCaption.SENDING : SubmitCaption.IDLE;
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    const formData = new FormData(form);
    blockSubmitButton();
    sendData(formData)
      .then(() => {
        closeForm();
        removeEscapeControl();
        showPopup(Popups.SUCCESS);
      })
      .catch(() => {
        showPopup(Popups.ERROR);
      })
      .finally(() => {
        blockSubmitButton(false);
      });
  }
});

fileInput.addEventListener('change', openForm);
closeButton.addEventListener('click', () => {
  closeForm();
  removeEscapeControl();
});
