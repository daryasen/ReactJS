"use strict";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import './Login.css';

// Компонент страницы входа в систему
export default function Login() {
  // Состояния для формы входа
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Хуки для авторизации и навигации
  const auth = useAuth();
  const navigate = useNavigate();

  // Обработчик отправки формы входа
  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Отправляем запрос на сервер для авторизации
    api.login({ username, password })
      .then((response) => {
        // Сохраняем токен и пользователя, перенаправляем на каталог
        auth.login(response.token, response.user);
        navigate('/goods');
      })
      .catch(() => {
        // Показываем ошибку при неудачной авторизации
        setError('Ошибка авторизации');
      })
      .finally(() => {
        // Снимаем состояние загрузки в любом случае
        setLoading(false);
      });
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Вход в систему</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
