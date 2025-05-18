import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/config';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_ENDPOINT = `${API_URL}/api`;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Проверка авторизации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.user);
        } catch (err) {
          console.error('Ошибка проверки авторизации:', err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // Регистрация
  const register = async (username, password) => {
    try {
      setError(null);
      const res = await api.post('/auth/register', { username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
      throw err;
    }
  };

  // Вход
  const login = async (username, password) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
      throw err;
    }
  };

  // Выход
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Обновление профиля
  const updateProfile = async (formData) => {
    try {
      setError(null);
      const res = await api.put('/users/profile', formData);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка обновления профиля');
      throw err;
    }
  };

  // Проверка, является ли пользователь администратором
  const isAdmin = () => {
    return user && user.role_id === 1;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAdmin,
        apiUrl: API_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 