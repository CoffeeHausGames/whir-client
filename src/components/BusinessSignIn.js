import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './SignIn.css';
import { apiRequest } from '../utils/NetworkContoller';

function BusinessSignIn() {
 const navigate = useNavigate();
 const { businessUser, businessSignIn } = useAuth();
 const [showComponent, setShowComponent] = useState(false);
 const [formData, setFormData] = useState({
   Email: '',
   Password: '',
 });

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Sending business sign-in request:', formData);
  if (businessUser && businessUser.authenticated) {
    console.error('A business user is already authenticated');
    return;
  }
  try {
    const response = await apiRequest('/business/login', 'POST', formData, {
      'Content-Type': 'application/json',
    });

    const business = { 
      ...response.data, 
      authenticated: true, 
      token: response.data.auth_token, 
      refreshToken: response.data.refresh_token 
    };
    localStorage.setItem('businessData', JSON.stringify(business));
    console.log('Business authenticated successfully');
    businessSignIn();
    navigate('/searchscreen');
    window.location.reload();
  } catch (error) {
    console.error('Business authentication failed:', error.message);
  }
};

 useEffect(() => {
   setShowComponent(true);
   const transitionDelay = setTimeout(() => {
     setShowComponent(false);
   }, 100);
   return () => clearTimeout(transitionDelay);
 }, []);

 return (
   <div className={`businesssignin ${showComponent ? 'visible' : 'transition-effect'}`}>
     <div className="sign-in-container" >
       <h2 className="title">Welcome back!</h2>
       <h3 className="subtitle">Please sign in to continue</h3>
       <form onSubmit={handleSubmit}>
         <input
           type="email"
           placeholder=" Email"
           value={formData.Email}
           onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
           required
           className="custom-input"
         />
         <input
           type="password"
           placeholder=" Password"
           value={formData.Password}
           onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
           required
           className="custom-input"
         />
         <button 
           type="submit" 
           className="custom-button"
           >
           Sign In
         </button>
       </form>
     </div>
   </div>
 );
}

export default BusinessSignIn;
