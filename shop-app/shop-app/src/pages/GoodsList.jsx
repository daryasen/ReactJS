"use strict";

import { Link } from 'react-router-dom';
import { useServerGoods } from '../hooks/useServerGoods';
import './GoodsList.css';

// Компонент страницы каталога товаров
export default function GoodsList() {
  // Используем хук для получения товаров с сервера
  const { goods, loading, error, hasMore, loadMore } = useServerGoods();

  // Показываем загрузку, если товары ещё не загружены
  if (loading && !goods.length) {
    return (
      <div className="goods-list-page">
        <div className="loading">Загрузка…</div>
      </div>
    );
  }

  // Показываем ошибку, если загрузка не удалась
  if (error && !goods.length) {
    return (
      <div className="goods-list-page">
        <div className="error">Ошибка соединения</div>
      </div>
    );
  }

  return (
    <div className="goods-list-page">
      <header className="goods-header">
        <h1>Каталог товаров</h1>
        <Link to="/" className="home-link">На главную</Link>
      </header>
      <div className="goods-grid">
        {goods.map((good) => (
          <Link key={good.id} to={`/goods/${good.id}`} className="good-card">
            <div className="good-image">
              <div className="placeholder-image">📦</div>
            </div>
            <div className="good-info">
              <h3>{good.name}</h3>
              <p className="good-price">{good.price} ₽</p>
            </div>
          </Link>
        ))}
      </div>
      {loading && goods.length > 0 && <div className="loading-more">Загрузка…</div>}
      {error && goods.length > 0 && <div className="error-message">Ошибка соединения</div>}
      {hasMore && !loading && (
        <div className="load-more-container">
          <button onClick={loadMore} className="load-more-btn">Загрузить больше</button>
        </div>
      )}
    </div>
  );
}
