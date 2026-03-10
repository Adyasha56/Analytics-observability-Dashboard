import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Initialize on mount
  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
      // Verify token by fetching user
      fetchCurrentUser(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch current user
  const fetchCurrentUser = async (tokenToUse) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
        {
          headers: { Authorization: `Bearer ${tokenToUse}` },
        }
      );
      setUser(response.data.user);
    } catch (err) {
      // Silently handle 401 errors (token might be invalid/expired)
      if (err.response?.status !== 401) {
        console.error('Failed to fetch user:', err);
      }
      Cookies.remove('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (username, password, age, gender) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        { username, password, age, gender }
      );
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      Cookies.set('token', token, { expires: 7 });
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Login
  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { username, password }
      );
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      Cookies.set('token', token, { expires: 7 });
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};