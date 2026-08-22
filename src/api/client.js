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

  analyzeJd: (resumeId, jdText) =>
    request(`/resumes/${resumeId}/analyze-jd`, { method: 'POST', body: JSON.stringify({ jdText }) }),

  tailorResume: (resumeId, jdText, missingKeywords) =>
  request(`/resumes/${resumeId}/tailor`, { method: 'POST', body: JSON.stringify({ jdText, missingKeywords }) }),

  parseUpload: (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('token');
  return fetch('http://localhost:8080/api/resumes/parse-upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  }).then(res => {
    if (!res.ok) throw new Error('Parse failed');
    return res.json();
  });
},

saveVersion: (resumeId, data) =>
  request(`/resumes/${resumeId}/versions`, { method: 'POST', body: JSON.stringify(data) }),

getVersions: (resumeId) =>
  request(`/resumes/${resumeId}/versions`, { method: 'GET' }),

getResume: (id) =>
  request(`/resumes/${id}`, { method: 'GET' }),

updateResume: (id, data) =>
  request(`/resumes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

salaryLookup: (role, city) =>
  request(`/salary/lookup?role=${encodeURIComponent(role)}${city ? `&city=${encodeURIComponent(city)}` : ''}`, { method: 'GET' }),

salarySubmit: (data) =>
  request('/salary/submit', { method: 'POST', body: JSON.stringify(data) }),

salarySkip: () =>
  request('/salary/skip', { method: 'POST' }),

shouldShowSalaryPrompt: () =>
  request('/salary/should-prompt', { method: 'GET' }),
};