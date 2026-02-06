import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'admin' or 'member'
  const [token, setToken] = useState(null);
  const [permissions, setPermissions] = useState([]); // New state for user permissions
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserType = localStorage.getItem('userType');
    const savedUser = localStorage.getItem('user');
    const savedPermissions = localStorage.getItem('permissions');

    if (savedToken && savedUserType) {
      setToken(savedToken);
      setUserType(savedUserType);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    if (savedPermissions) {
      setPermissions(JSON.parse(savedPermissions));
    }
    setLoading(false);
  }, []);

  // Updated login function to include userId in the redirect
  const login = (token, userData, type = 'admin') => {
    setToken(token);
    setUser(userData);
    setUserType(type);
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    localStorage.setItem('user', JSON.stringify(userData));

    // Redirect to profile page with userId after login
    if (type === 'member') {
      window.location.href = `/profile/${userData._id}`;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserType(null);
    setPermissions([]);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
  };

  return (
    <AuthContext.Provider value={{ user, userType, token, permissions, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
