import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { apiRequest } from '../utils/NetworkContoller';

function UserProfile(props) {
 const navigate = useNavigate();
 const [showComponent, setShowComponent] = useState(false);
 const [business, setBusiness] = useState(null);
 const [user, setUser] = useState(null);

 useEffect(() => {
   const url = '/business';

   // Define the data you want to send to the server
   const data = {
     // Your data here
   };

   console.log('Data being sent:', data);

   apiRequest(url, 'POST', data, {
    'Content-Type': 'application/json',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Data received:', response.data);
      //TODO I don't believe we pass any data to these methods?
      setUser(response.data.user);
      setBusiness(response.data.business);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

   setShowComponent(true);
   const transitionDelay = setTimeout(() => {
     setShowComponent(false);
   }, 100);
   return () => clearTimeout(transitionDelay);
 }, []);

 const handleSignOut = () => {
   localStorage.removeItem('user');
   localStorage.removeItem('businessData');
   navigate('/home');
   window.location.reload();
 };

 return (
   <div className={`userprofile ${showComponent ? 'visible' : 'transition-effect'}`}>
     <h2>User Profile</h2>
     {user && (
       <>
         <p>First Name: {user.first_name}</p>
         <p>Last Name: {user.last_name}</p>
       </>
     )}
     {business && (
       <>
         <p>Business Name: {business.business_name}</p>
         <p>Address: {`${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.postalCode}, ${business.address.country}`}</p>
         <p>Deals: {business.deal}</p>
         <p>Description: {business.description}</p>
       </>
     )}
     <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
   </div>
 );
}

export default UserProfile;
