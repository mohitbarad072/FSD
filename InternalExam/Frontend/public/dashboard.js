const API_BASE = (window.REACT_APP_API_BASE || '/api').replace(/\/$/, '');

function setError(msg) {
  document.getElementById('error').textContent = msg || '';
}

function getToken() {
  return localStorage.getItem('token');
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/auth.html';
}

async function fetchProfile() {
  setError('');
  const token = getToken();
  if (!token) {
    window.location.href = '/auth.html';
    return;
  }
  try {
    const res = await fetch(API_BASE + '/auth/me', {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
    const user = data.user;
    document.getElementById('content').innerHTML = `
      <div><strong>Name</strong><br>${user.name}</div>
      <div><strong>Email</strong><br>${user.email}</div>
    `;
  } catch (err) {
    setError(err.message);
  }
}

document.getElementById('logoutBtn').addEventListener('click', logout);
fetchProfile();


