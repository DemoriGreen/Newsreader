import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('newsreader-user')) || null;
    } catch {
      return null;
    }
  });

  const login = (username, password, role = 'regular') => {
    if (!username.trim() || !password.trim()) {
      throw new Error('Username and password are required');
    }

    const loggedInUser = {
      username: username.trim(),
      role: role === 'admin' ? 'admin' : 'regular'
    };

    localStorage.setItem('newsreader-user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem('newsreader-user');
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}