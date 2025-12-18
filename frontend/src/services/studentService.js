import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Student login
export const loginStudent = async (rollNumber, password) => {
  const response = await api.post('/student/login', { rollNumber, password });
  return response.data;
};

// Get student profile
export const getProfile = async () => {
  const response = await api.get('/student/profile');
  return response.data;
};

// Update student profile
export const updateProfile = async (profileData) => {
  const response = await api.put('/student/profile', profileData);
  return response.data;
};

export default api;
