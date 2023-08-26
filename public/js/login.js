const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (!username && password) {
    alert("Must provide username and password.");
    return;
  }

  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to log in');
  }

};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
