import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const savedSettings = localStorage.getItem(STORAGE_KEY);
const parsedSettings = JSON.parse(savedSettings);

const formData = { ...parsedSettings };

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputValue, 500));

populateForm();

function onFormSubmit(e) {
  e.preventDefault();

  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInputValue(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  if (formData.message) {
    form.elements.message.value = formData.message;
  }
  if (formData.email) {
    form.elements.email.value = formData.email;
  }
}
