const BASE_URL = 'http://localhost:8080/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed: ${res.status}`);
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  return null;
}

export const api = {
  signup: (firstName, lastName, email, password, status) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ firstName, lastName, email, password, status }) }),

  googleLogin: (idToken) =>
    request('/auth/google', { method: 'POST', body: JSON.stringify({ idToken }) }),

  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  createResume: (data) =>
    request('/resumes', { method: 'POST', body: JSON.stringify(data) }),

  getResumes: () =>
    request('/resumes', { method: 'GET' }),
};