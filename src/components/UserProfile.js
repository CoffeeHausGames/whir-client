import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile(props) {
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);

  // Retrieve user data from localStorage
  const storedUserData = localStorage.getItem('user');
  const storedBusinessData = localStorage.getItem('business');
  const user = JSON.parse(storedUserData);
  const business = JSON.parse(storedBusinessData);

  const handleSignOut = () => {
    // Perform sign out logic here, such as clearing user data or session
    // For example, you can clear the user data in localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('business');

    // Reload the sign-in page
        navigate('/home');
    window.location.reload();
  };

  useEffect(() => {
    setShowComponent(true); // Show the component immediately

    // Add the transition effect after a short delay
    const transitionDelay = setTimeout(() => {
      setShowComponent(false); // Remove the transition effect class
    }, 100); // You can adjust the duration as needed

    return () => clearTimeout(transitionDelay);
  }, []);

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
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default UserProfile;
