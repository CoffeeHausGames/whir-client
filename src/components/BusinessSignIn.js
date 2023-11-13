import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './SignIn.css';

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
     const response = await fetch('http://localhost:4444/business/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });
     if (response.ok) {
       const responseData = await response.json();
       const business = { ...responseData.data, authenticated: true };
       localStorage.setItem('businessAuthToken', JSON.stringify(business));
       console.log('Business authenticated successfully');
       businessSignIn();
       navigate('/searchscreen');
       window.location.reload();
     } else {
       console.error('Business authentication failed');
     }
   } catch (error) {
     console.error('Error:', error);
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
