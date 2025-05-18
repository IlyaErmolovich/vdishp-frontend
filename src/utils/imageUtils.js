const API_URL = process.env.REACT_APP_API_URL || 'https://vdishp-backend.onrender.com';

/**
 * Формирует полный URL для изображения
 * @param {string|boolean|object} imageData - данные изображения или ID аватара
 * @param {string} fallback - запасное изображение, если данные не переданы
 * @param {number} id - ID пользователя или игры
 * @param {string} type - тип изображения ('user' или 'game')
 * @returns {string} полный URL к изображению
 */
export const getImageUrl = (imageData, fallback = '/placeholder-game.jpg', id = null, type = 'user') => {
  // Для обложек игр - всегда берем с сервера по ID
  if (type === 'game' && id) {
    return `${API_URL}/api/games/cover/${id}?t=${new Date().getTime()}`;
  }

  // Для аватаров пользователей
  if (type === 'user') {
    // Если есть ID, берем аватар с сервера
    if (id) {
      return `${API_URL}/api/users/avatar/${id}?t=${new Date().getTime()}`;
    }
    
    // Поддержка разных форматов данных пользователя
    if (imageData && typeof imageData === 'object') {
      const userId = imageData.id || imageData.avatar_id || imageData.user_id;
      if (userId) {
        return `${API_URL}/api/users/avatar/${userId}?t=${new Date().getTime()}`;
      }
    }
  }
  
  // Обработка строковых путей
  if (imageData && typeof imageData === 'string') {
    if (imageData.startsWith('http')) {
      return imageData;
    }
    if (imageData !== 'placeholder' && imageData !== '{}' && imageData !== 'null') {
      return `${API_URL}${imageData}`;
    }
  }
  
  // Заглушка по умолчанию
  return fallback;
};

export default {
  getImageUrl
}; 