"use strict";

import { createContext, useContext, useState, useEffect } from 'react';

// Создание контекста для авторизации
const AuthContext = createContext(null);

// Провайдер контекста авторизации - управляет состоянием входа пользователя
export const AuthProvider = ({ children }) => {
  // Состояния: авторизован ли пользователь и данные пользователя
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // При загрузке проверяем, есть ли сохранённый токен в localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      // Если токен есть, восстанавливаем сессию
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Функция входа - сохраняет токен и данные пользователя
  function login(token, userData) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  }

  // Функция выхода - очищает токен и данные пользователя
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
