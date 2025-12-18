"use strict";

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Компонент для защиты маршрутов - проверяет авторизацию
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Если авторизован, показываем защищённый контент
  return children;
}
