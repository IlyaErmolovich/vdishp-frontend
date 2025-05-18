import axios from 'axios';

// Определяем базовый URL в зависимости от окружения
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Добавляем интерцептор для добавления токена авторизации
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 