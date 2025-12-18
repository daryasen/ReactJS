"use strict";

import { useState, useEffect } from 'react';
import { api } from '../services/api';

// Хук для работы с товарами с сервера (пагинация и загрузка)
export const useServerGoods = () => {
  // Состояния: список товаров, загрузка, ошибка, есть ли ещё товары, текущая страница
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Функция загрузки товаров с сервера
  function loadGoods(page, append) {
    setLoading(true);
    setError(null);
    
    // Запрашиваем товары (10 штук на страницу)
    api.getGoods(page, 10)
      .then((response) => {
        // Если append=true, добавляем к существующим товарам, иначе заменяем
        if (append) {
          setGoods((old) => old.concat(response.data));
        } else {
          setGoods(response.data);
        }
        // Проверяем, есть ли ещё товары (если пришло 10, значит может быть ещё)
        setHasMore(response.data.length === 10);
        setCurrentPage(page);
        setLoading(false);
      })
      .catch((err) => {
        setError('Ошибка соединения');
        setLoading(false);
        // При ошибке авторизации очищаем токен и перенаправляем на вход
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      });
  }

  // При первом рендере загружаем первую страницу товаров
  useEffect(() => {
    loadGoods(1, false);
  }, []);

  // Функция для загрузки следующей страницы товаров
  function loadMore() {
    if (!loading && hasMore) {
      loadGoods(currentPage + 1, true);
    }
  }

  return { goods, loading, error, hasMore, loadMore };
};
