import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  username: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const defaultUser: User = {
  username: '',
  isAuthenticated: false
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  login: async () => false,
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const navigate = useNavigate();

  // Simple mock authentication logic for demo purposes
  const login = async (username: string, password: string): Promise<boolean> => {
    // For this demo, we'll accept "李爷爷" with password "123456"
    if (username === '李爷爷' && password === '123456') {
      setUser({
        username,
        isAuthenticated: true
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(defaultUser);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};