document.addEventListener('DOMContentLoaded', function () {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const data = JSON.parse(savedData);
    document.querySelector('[name="email"]').value = data.email || '';
    document.querySelector('[name="message"]').value = data.message || '';
  }

  function saveData() {
    const email = document.querySelector('[name="email"]').value;
    const message = document.querySelector('[name="message"]').value;
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify({ email, message })
    );
  }
  const saveDataThrottled = _.throttle(saveData, 500);

  document
    .querySelector('.feedback-form')
    .addEventListener('input', function () {
      saveDataThrottled();
    });

  function handleSubmit() {
    saveDataThrottled();
    localStorage.removeItem('feedback-form-state');
    console.log('Form submitted:', {
      email: document.querySelector('[name="email"]').value,
      message: document.querySelector('[name="message"]').value,
    });
  }

  document
    .querySelector('.feedback-form')
    .addEventListener('submit', handleSubmit);
});
