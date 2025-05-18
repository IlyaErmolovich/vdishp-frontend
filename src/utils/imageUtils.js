const API_URL = process.env.REACT_APP_API_URL || 'https://vdishp-backend.onrender.com';

/**
 * Формирует полный URL для изображения
 * @param {string|boolean|object} imageData - данные изображения или ID аватара
 * @param {string} fallback - запасное изображение, если данные не переданы
 * @param {number} id - ID пользователя или игры
 * @param {string} type - тип изображения ('user' или 'game')
 * @returns {string} полный URL к изображению
 */
export const getImageUrl = (imageData, fallback = '/placeholder-game.jpg', id = null, type = 'game') => {
  // Добавляем случайный параметр к URL для предотвращения кэширования
  const cacheParam = `?t=${new Date().getTime()}`;
  
  console.log('getImageUrl вызван с параметрами:', { imageData, fallback, id, type });
  
  // Для обложек игр - всегда берем с сервера по ID
  if (type === 'game' && id) {
    const url = `${API_URL}/api/games/cover/${id}${cacheParam}`;
    console.log('Возвращаем URL изображения игры:', url);
    return url;
  }

  // Для аватаров пользователей
  if (type === 'user') {
    // Если есть ID, берем аватар с сервера
    if (id) {
      const url = `${API_URL}/api/users/avatar/${id}${cacheParam}`;
      console.log('Возвращаем URL аватара пользователя по ID:', url);
      return url;
    }
    
    // Поддержка разных форматов данных пользователя
    if (imageData && typeof imageData === 'object') {
      const userId = imageData.id || imageData.avatar_id || imageData.user_id;
      if (userId) {
        const url = `${API_URL}/api/users/avatar/${userId}${cacheParam}`;
        console.log('Возвращаем URL аватара пользователя из объекта:', url);
        return url;
      }
    }
  }
  
  // Проверяем, является ли imageData строкой 'placeholder'
  if (imageData === 'placeholder' || imageData === '{}' || imageData === 'null' || !imageData) {
    if (fallback.startsWith('http')) {
      console.log('Возвращаем fallback URL:', fallback);
      return fallback;
    }
    const url = fallback.startsWith('/') ? fallback : `/${fallback}`;
    console.log('Возвращаем локальный fallback URL:', url);
    return url;
  }
  
  // Обработка строковых путей
  if (imageData && typeof imageData === 'string') {
    if (imageData.startsWith('http')) {
      console.log('Возвращаем полный URL из строки:', imageData);
      return imageData;
    }
    const url = `${API_URL}${imageData.startsWith('/') ? '' : '/'}${imageData}`;
    console.log('Возвращаем URL из строки с добавлением API_URL:', url);
    return url;
  }
  
  // Заглушка по умолчанию
  const url = fallback.startsWith('/') ? fallback : `/${fallback}`;
  console.log('Возвращаем fallback URL по умолчанию:', url);
  return url;
};

export default {
  getImageUrl
}; 