"use strict";

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './GoodDetail.css';

// Компонент страницы детальной информации о товаре
export default function GoodDetail() {
  // Получаем ID товара из URL параметров
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Состояния: данные товара, загрузка, ошибка
  const [good, setGood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем данные товара при изменении ID
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Запрашиваем данные товара с сервера
    api.getGoodById(id)
      .then((data) => {
        setGood(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Ошибка соединения');
        setLoading(false);
        // При ошибке авторизации перенаправляем на страницу входа
        if (err.message === 'Unauthorized') {
          navigate('/login');
        }
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="good-detail-page">
        <div className="loading">Загрузка…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="good-detail-page">
        <div className="error">Ошибка соединения</div>
      </div>
    );
  }

  return (
    <div className="good-detail-page">
      <header className="detail-header">
        <Link to="/goods" className="back-link">← Назад к списку</Link>
      </header>
      <div className="good-detail">
        <div className="good-detail-image">
          <div className="placeholder-image">📦</div>
        </div>
        <div className="good-detail-info">
          <h1>{good.name}</h1>
          <div className="detail-section">
            <h3>Цена</h3>
            <p className="detail-price">{good.price} ₽</p>
          </div>
          <div className="detail-section">
            <h3>Дата выпуска</h3>
            <p>{new Date(good.releaseDate).toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
