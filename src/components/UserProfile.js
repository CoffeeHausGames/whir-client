import React, { useState, useEffect } from 'react';
import './UserProfile.css';

function UserProfile(props) {
    const [showComponent, setShowComponent] = useState(false);

  const user = props.user;
  const handleSignOut = () => {
    // Perform sign out logic here, such as clearing user data or session
    // For example, you can clear the user state and any stored tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Reload the sign in page
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
      {/* <p>First Name: {user.First_name}</p> */}
      {/* <p>Last Name: {user.Last_name}</p> */}
      {/* <p>Email: {user.Email}</p> */}
      <button onClick={handleSignOut}>Sign Out</button>
      
    </div>
  );
}

export default UserProfile;