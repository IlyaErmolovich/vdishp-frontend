import axios from 'axios';

// Определяем базовый URL в зависимости от окружения
const baseURL = process.env.REACT_APP_API_URL || 'https://vdishp-backend.onrender.com';

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  // Увеличиваем тайм-аут до 60 секунд для работы с Render
  timeout: 60000,
  // Добавляем настройки для передачи куки в CORS-запросах
  withCredentials: true
});

// Добавляем интерцептор для дебага ошибок
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// Примечание: мы убрали interceptor для авторизации, 
// так как решили не использовать токены для упрощения

export default api; 