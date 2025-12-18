"use strict";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import GoodsList from './pages/GoodsList';
import GoodDetail from './pages/GoodDetail';
import './App.css';

// Главный компонент приложения - настройка маршрутов
function App() {
  return (
    // Провайдер авторизации оборачивает всё приложение
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Главная страница - доступна всем */}
          <Route path="/" element={<Home />} />
          {/* Страница входа - доступна всем */}
          <Route path="/login" element={<Login />} />
          {/* Каталог товаров - требует авторизации */}
          <Route
            path="/goods"
            element={
              <ProtectedRoute>
                <GoodsList />
              </ProtectedRoute>
            }
          />
          {/* Детали товара - требует авторизации */}
          <Route
            path="/goods/:id"
            element={
              <ProtectedRoute>
                <GoodDetail />
              </ProtectedRoute>
            }
          />
          {/* Все остальные маршруты перенаправляют на главную */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
