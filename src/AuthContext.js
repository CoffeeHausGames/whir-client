import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      // Check local storage for user when component mounts
      const user = JSON.parse(localStorage.getItem('user'));
      return user ? { ...user, authenticated: true } : null;
    });
    const [businessUser, setBusinessUser] = useState(() => {
      // Check local storage for business user when component mounts
      const businessUser = JSON.parse(localStorage.getItem('business'));
      return businessUser ? { ...businessUser, authenticated: true } : null;
    });

  const signIn = () => {
    // Implement your authentication logic here and set the user or businessUser state accordingly
    // For example, when a user signs in:
    setUser({ authenticated: true });
    // For business user:
    setBusinessUser({ authenticated: true });
  };

  const signOut = () => {
    setUser(null);
  };

  const businessSignIn = () => {
    setBusinessUser({ authenticated: true });
  };

  const businessSignOut = () => {
    setBusinessUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, businessUser, setBusinessUser, signIn, signOut, businessSignIn, businessSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
