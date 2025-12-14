"use strict";

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

// Компонент главной страницы приложения
export default function Home() {
  // Получаем состояние авторизации и функцию выхода
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="home">
      <header className="home-header">
        <h1>Добро пожаловать в интернет-магазин</h1>
        <nav className="home-nav">
          {isAuthenticated ? (
            <>
              <Link to="/goods" className="nav-link">Каталог товаров</Link>
              <button onClick={logout} className="logout-btn">Выйти</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Войти</Link>
          )}
        </nav>
      </header>
      <main className="home-main">
        <div className="home-content">
          <h2>О нашем магазине</h2>
          <p>Мы предлагаем широкий ассортимент качественных товаров по доступным ценам.</p>
        </div>
      </main>
    </div>
  );
}
