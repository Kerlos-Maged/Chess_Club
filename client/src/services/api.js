import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Events
export const eventService = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

// Members
export const memberService = {
  submitApplication: (data) => api.post('/members/join', data),
  getApplications: () => api.get('/members/applications'),
  updateStatus: (id, status) =>
    api.put(`/members/applications/${id}`, { status }),
};

// Auth
export const authService = {
  login: (email, password) =>
    api.post('/admin/login', { email, password }),
};

// Contact
export const contactService = {
  send: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact'),
  markAsRead: (id) => api.put(`/contact/${id}/read`),
};

// Profiles
export const profileService = {
  getProfile: (userId) => api.get(`/profiles/${userId}`),
  getAllProfiles: () => api.get('/profiles'),
  createProfile: (data) => api.post('/profiles', data),
  updateProfile: (userId, data) => api.patch(`/profiles/${userId}`, data),
  addMatch: (userId, data) => api.post(`/profiles/${userId}/match`, data),
  updateStats: (userId, data) => api.patch(`/profiles/${userId}/stats`, data),
  addAchievement: (userId, data) => api.post(`/profiles/${userId}/achievement`, data),
  getLeaderboard: (params) => api.get('/profiles/leaderboard', { params }),
};

export default api;
