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

// Admin login
export const loginAdmin = async (email, password) => {
  const response = await api.post('/admin/login', { email, password });
  return response.data;
};

// Create first admin
export const createFirstAdmin = async (name, email, password) => {
  const response = await api.post('/admin/create', { name, email, password });
  return response.data;
};

// Add new admin
export const addAdmin = async (name, email, password) => {
  const response = await api.post('/admin/add-admin', { name, email, password });
  return response.data;
};

// Add new student
export const addStudent = async (studentData) => {
  const response = await api.post('/admin/add-student', studentData);
  return response.data;
};

// Get all students
export const getAllStudents = async () => {
  const response = await api.get('/admin/students');
  return response.data;
};

// Get student by ID
export const getStudentById = async (id) => {
  const response = await api.get(`/admin/students/${id}`);
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/admin/students/${id}`, studentData);
  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/admin/students/${id}`);
  return response.data;
};

// Get all admins
export const getAllAdmins = async () => {
  const response = await api.get('/admin/admins');
  return response.data;
};

export default api;
