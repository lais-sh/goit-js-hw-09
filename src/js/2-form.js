const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

loadFormData();

function loadFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      formData = JSON.parse(saved);
      form.elements.email.value = formData.email || '';
      form.elements.message.value = formData.message || '';
    } catch (err) {
      console.error('Помилка:', err);
    }
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Заповніть всі поля');
    return;
  }

  console.log('Form submitted:', formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
});