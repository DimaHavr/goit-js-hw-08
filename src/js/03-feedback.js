import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const savedSettings = localStorage.getItem(STORAGE_KEY);
const parsedSettings = JSON.parse(savedSettings);

const formData = { ...parsedSettings };
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputValue, 500));
populateForm();

function onFormSubmit(e) {
  e.preventDefault();

  console.log(parsedSettings);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInputValue(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  if (parsedSettings.message) {
    form.elements.message.value = parsedSettings.message;
  }
  if (parsedSettings.email) {
    form.elements.email.value = parsedSettings.email;
  }
}
