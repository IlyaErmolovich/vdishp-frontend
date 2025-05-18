import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getImageUrl } from '../utils/imageUtils';

const Card = styled.div`
  background-color: rgba(29, 29, 31, 0.7);
  border-radius: ${props => props.theme.radius.medium};
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: all ${props => props.theme.transitions.medium};
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(123, 104, 238, 0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(32, 178, 170, 0.15);
    border-color: rgba(32, 178, 170, 0.2);
  }
`;

const CardImage = styled.div`
  height: 280px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    z-index: 1;
    opacity: 0.6;
    transition: opacity ${props => props.theme.transitions.medium};
  }
  
  ${Card}:hover &:before {
    opacity: 0.4;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${props => props.theme.transitions.medium};
  }
  
  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(to right, rgba(32, 178, 170, 0), rgba(32, 178, 170, 0.3), rgba(32, 178, 170, 0));
  }
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.medium};
  margin-bottom: 12px;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  line-height: 1.3;
`;

const CardText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.small};
  margin-bottom: 10px;
  line-height: 1.4;
  flex-grow: 1;
`;

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const Pill = styled.span`
  background: rgba(32, 178, 170, 0.1);
  color: ${props => props.theme.colors.text};
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(32, 178, 170, 0.2);
  
  &:hover {
    background: rgba(32, 178, 170, 0.2);
  }
`;

const ReleaseDate = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.xsmall};
  padding: 6px 10px;
  border-radius: 4px;
  z-index: 2;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GameCard = ({ game }) => {
  // Проверяем, что объект игры существует
  if (!game) {
    console.error('GameCard: объект игры не передан');
    return null;
  }

  // Форматируем дату
  const formatDate = (dateString) => {
    if (!dateString) return 'Дата не указана';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Ограничиваем количество отображаемых жанров/платформ
  const limitItems = (items, limit = 3) => {
    if (!items || !Array.isArray(items)) return [];
    return items.slice(0, limit);
  };

  // Получаем URL изображения, явно передавая ID игры
  const imageUrl = getImageUrl(game.cover_image, '/placeholder-game.jpg', game.id, 'game');
  console.log('GameCard: получили URL изображения для игры ID', game.id, ':', imageUrl);

  return (
    <Card>
      <CardImage>
        <img 
          src={imageUrl} 
          alt={game.title}
          onError={(e) => {
            console.error('Ошибка загрузки изображения для игры', game.id);
            e.target.src = '/placeholder-game.jpg';
          }}
        />
        {game.release_date && <ReleaseDate>{formatDate(game.release_date)}</ReleaseDate>}
      </CardImage>
      <CardContent>
        <CardTitle>{game.title}</CardTitle>
        <CardText>
          {game.developer && <div><strong>Разработчик:</strong> {game.developer}</div>}
          {game.publisher && <div><strong>Издатель:</strong> {game.publisher}</div>}
          
          {game.genres && game.genres.length > 0 && (
            <PillContainer>
              {limitItems(game.genres).map((genre, index) => (
                <Pill key={index}>{genre}</Pill>
              ))}
              {game.genres.length > 3 && <Pill>+{game.genres.length - 3}</Pill>}
            </PillContainer>
          )}
        </CardText>
        <Link 
          to={`/game/${game.id}`} 
          className="button button-primary"
          style={{ 
            width: '100%', 
            textAlign: 'center', 
            marginTop: '10px',
            backgroundColor: 'rgba(32, 178, 170, 0.8)',
            padding: '10px',
            borderRadius: '4px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
            display: 'block'
          }}
        >
          Подробнее
        </Link>
      </CardContent>
    </Card>
  );
};

export default GameCard; 