import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'admin' or 'member'
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserType = localStorage.getItem('userType');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUserType) {
      setToken(savedToken);
      setUserType(savedUserType);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData, type = 'admin') => {
    setToken(token);
    setUser(userData);
    setUserType(type);
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserType(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, userType, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
