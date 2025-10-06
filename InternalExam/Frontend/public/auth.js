const API_BASE = (window.REACT_APP_API_BASE || '/api').replace(/\/$/, '');

function setError(msg) {
  document.getElementById('error').textContent = msg || '';
}

function getToken() {
  return localStorage.getItem('token');
}

function setLoggedInUI() {
  const hasToken = !!getToken();
  document.getElementById('logoutBtn').style.display = hasToken ? 'inline-block' : 'none';
}

async function register() {
  setError('');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!name || !email || !password) return setError('All fields are required');
  try {
    const res = await fetch(API_BASE + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard.html';
  } catch (err) {
    setError(err.message);
  }
}

async function login() {
  setError('');
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!email || !password) return setError('Email and password are required');
  try {
    const res = await fetch(API_BASE + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard.html';
  } catch (err) {
    setError(err.message);
  }
}

function logout() {
  localStorage.removeItem('token');
  setLoggedInUI();
}

document.getElementById('registerBtn').addEventListener('click', register);
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('logoutBtn').addEventListener('click', logout);

setLoggedInUI();


