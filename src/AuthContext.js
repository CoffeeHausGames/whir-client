import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    try {
      const user = userData ? JSON.parse(userData) : JSON.parse('{}');
      return user && user.authenticated ? user : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
   });
   
   const [businessUser, setBusinessUser] = useState(() => {
    const businessUserData = localStorage.getItem('business');
    try {
      const businessUser = businessUserData ? JSON.parse(businessUserData) : JSON.parse('{}');
      return businessUser && businessUser.authenticated ? businessUser : null;
    } catch (error) {
      console.error('Error parsing business user data from localStorage:', error);
      return null;
    }
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

  // Use an effect to update the user and business user states when local storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      const businessUserData = localStorage.getItem('business');

      try {
        const user = userData ? JSON.parse(userData) : null;
        if (user && user.authenticated) {
          setUser(user);
        } else {
          setUser(null);
        }

        const businessUser = businessUserData ? JSON.parse(businessUserData) : null;
        if (businessUser && businessUser.authenticated) {
          setBusinessUser(businessUser);
        } else {
          setBusinessUser(null);
        }
      } catch (error) {
        console.error('Error handling storage change:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, businessUser, setBusinessUser, signIn, signOut, businessSignIn, businessSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
