import React, { useState, useEffect } from 'react';
import './UserProfile.css';

function BusinessProfile(props) {
  const [showComponent, setShowComponent] = useState(false);

  // Retrieve user data from localStorage
  const storedBusinessData = localStorage.getItem('business');
  const business = JSON.parse(storedBusinessData);

  const handleSignOut = () => {
    // Perform sign out logic here, such as clearing user data or session
    // For example, you can clear the user data in localStorage
    localStorage.removeItem('business');

    // Reload the sign-in page
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
    <div className={`businessprofile ${showComponent ? 'visible' : 'transition-effect'}`}>
      <h2>User Profile</h2>
      <p>Business Name: {business.business_name}</p>
      <p>Address: {business.address}</p>
      <p>Zip Code: {business.zip_code}</p>
      <p>Deals: {business.deal}</p>
      <p>Description: {business.description}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default BusinessProfile;