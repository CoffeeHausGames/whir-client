import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile(props) {
 const navigate = useNavigate();
 const [showComponent, setShowComponent] = useState(false);
 const [business, setBusiness] = useState(null);
 const [user, setUser] = useState(null);

 useEffect(() => {
   const url = 'http://localhost:4444/business';

   // Define the data you want to send to the server
   const data = {
     // Your data here
   };

   console.log('Data being sent:', data);

   fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   })
     .then((response) => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.text();
     })
     .then((text) => {
       const data = JSON.parse(text);
       console.log('Data received:', data);
       setUser(data.user);
       setBusiness(data.business);
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
   localStorage.removeItem('businessAuthToken');
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
