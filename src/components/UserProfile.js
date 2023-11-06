import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile(props) {
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);

  // Retrieve user data from localStorage
  const storedUserData = localStorage.getItem('user');
  const user = JSON.parse(storedUserData);

  const handleSignOut = () => {
    // Perform sign out logic here, such as clearing user data or session
    // For example, you can clear the user data in localStorage
    localStorage.removeItem('user');

    // Reload the sign-in page
    window.location.reload();
    navigate('/');
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
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default UserProfile;