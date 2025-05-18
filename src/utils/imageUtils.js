const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Формирует полный URL для изображения
 * @param {string} imagePath - путь к изображению
 * @param {string} fallback - запасное изображение, если путь не передан
 * @returns {string} полный URL к изображению
 */
export const getImageUrl = (imagePath, fallback = '/placeholder-game.jpg') => {
  if (!imagePath) return fallback;
  
  // Если путь уже полный URL, возвращаем его
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Иначе добавляем базовый URL
  return `${API_URL}${imagePath}`;
};

export default {
  getImageUrl
}; 