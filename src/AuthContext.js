// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBusinessAuthenticated, setIsBusinessAuthenticated] = useState(false);

  const signIn = () => {
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
  };

  const businessSignIn = () => {
    setIsBusinessAuthenticated(true);
  };

  const businessSignOut = () => {
    setIsBusinessAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, isBusinessAuthenticated, businessSignIn, businessSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
