import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('loan_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  useEffect(() => {
    if (user && user.token) setAuthToken(user.token);
  }, [user]);

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    const data = res.data;
    const u = { token: data.token, userId: data.userId, role: data.role };
    setUser(u);
    localStorage.setItem('loan_user', JSON.stringify(u));
    setAuthToken(u.token);
    return u;
  }

  async function register(payload) {
    const res = await api.post('/auth/register', payload);
    return res.data;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('loan_user');
    setAuthToken(null);
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
