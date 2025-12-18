"use strict";

// Базовый URL для API запросов
const API_BASE_URL = '/api';

// Объект с методами для работы с API
export const api = {
  // Авторизация пользователя
  login(credentials) {
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then((res) => res.json());
  },

  // Получение списка товаров с пагинацией
  getGoods(page, limit) {
    // Берём токен из localStorage для авторизации
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/goods?page=${page}&limit=${limit}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((res) => {
      // Проверяем статус ответа и выбрасываем ошибки при необходимости
      if (res.status === 401) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Ошибка соединения');
      return res.json();
    });
  },

  // Получение товара по ID
  getGoodById(id) {
    // Берём токен из localStorage для авторизации
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/goods/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((res) => {
      // Проверяем статус ответа и выбрасываем ошибки при необходимости
      if (res.status === 401) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Ошибка соединения');
      return res.json();
    });
  },
};
