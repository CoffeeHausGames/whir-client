import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../utils/NetworkContoller';

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
   const businessUserData = localStorage.getItem('businessData');
   try {
     const businessUser = businessUserData ? JSON.parse(businessUserData) : JSON.parse('{}');
     return businessUser && businessUser.authenticated ? businessUser : null;
   } catch (error) {
     console.error('Error parsing business user data from localStorage:', error);
     return null; 
   }
 });

 const [isBusinessUserAuthenticated, setIsBusinessUserAuthenticated] = useState(false);

 const signIn = () => {
  if (!user || !user.authenticated) {
    setUser({ ...user, authenticated: true });
  } else {
    console.error('A user is already authenticated');
  }
 };

 const signOut = () => {
  // Request to the server to clear the HttpOnly cookie
  apiRequest('/users/logout', 'POST', null, {}, true)
    .then(response => {
      console.log('Response:', response); // Print the response
      if (!response.ok) {
        throw new Error('Failed to clear HttpOnly cookie');
      }

      // Clear local user data
      setUser(null);
      localStorage.removeItem('user');
    })
    .catch(error => {
      console.error('Error during sign out:', error);
    });
};

 const businessSignIn = () => {
  if (!businessUser || !businessUser.authenticated) {
    setBusinessUser({ ...businessUser, authenticated: true });
    setIsBusinessUserAuthenticated(true);
  } else {
    console.error('A business user is already authenticated');
  }
 };

 const businessSignOut = () => {
  setBusinessUser(null);
  localStorage.removeItem('businessData');
  setIsBusinessUserAuthenticated(false);
};

 useEffect(() => {
   const handleStorageChange = () => {
     const userData = localStorage.getItem('user');
     const businessUserData = localStorage.getItem('businessData');

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
   <AuthContext.Provider value={{ user, setUser, businessUser, setBusinessUser, isBusinessUserAuthenticated, setIsBusinessUserAuthenticated, signIn, signOut, businessSignIn, businessSignOut }}>
     {children}
   </AuthContext.Provider>
 );
};
