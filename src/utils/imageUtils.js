const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Формирует полный URL для изображения
 * @param {string|boolean|object} imageData - данные изображения или ID аватара
 * @param {string} fallback - запасное изображение, если данные не переданы
 * @param {number} id - ID пользователя или игры
 * @param {string} type - тип изображения ('user' или 'game')
 * @returns {string} полный URL к изображению
 */
export const getImageUrl = (imageData, fallback = '/placeholder-game.jpg', id = null, type = 'user') => {
  console.log('getImageUrl вызван с данными:', { imageData, id, type });
  
  // Если imageData полностью отсутствует или равен placeholder, используем запасное изображение
  if (!imageData || imageData === 'placeholder' || imageData === '{}' || imageData === 'null') {
    console.log('Используем запасное изображение');
    return fallback;
  }
  
  // Для отображения обложек игр
  if (type === 'game' && id) {
    console.log('Загружаем изображение игры, ID:', id);
    return `${API_URL}/api/games/cover/${id}?t=${new Date().getTime()}`;
  }
  
  // Для аватаров пользователей
  if (type === 'user' && id) {
    console.log('Загружаем аватар пользователя, ID:', id);
    return `${API_URL}/api/users/avatar/${id}?t=${new Date().getTime()}`;
  }
  
  // Если дошли сюда, возвращаем запасное изображение
  console.log('Не смогли определить тип изображения, используем запасное');
  return fallback;
};

export default {
  getImageUrl
}; 