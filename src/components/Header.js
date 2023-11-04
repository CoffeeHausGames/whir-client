import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Header = ({ onProfileButtonClick, onBusinessSignIn, onSettingsButtonClick, onHomeButtonClick, onSignIn, onSignUp, onSignOut, isSignedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const handleSignOut = () => {
    // Perform sign out logic here, such as clearing user data or session
    // For example, you can clear the user state and any stored tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Reload the sign in page
    window.location.reload();
  };

  const handleProfileClick = () => {
    if (isSignedIn) {
      setShowDropdown(!showDropdown);
    } else {
      onSignIn();
    }
  };

  const handleProfileDropdownClick = (action) => {
    if (action === 'userprofile') {
      // Navigate to the UserProfile component using Link
      onProfileButtonClick();
    } else if (action === 'signout') {
      handleSignOut();
    } else if (action === 'usersettings') {
      onSettingsButtonClick();
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    setShowComponent(true); // Show the component immediately

    // Add the transition effect after a short delay
    const transitionDelay = setTimeout(() => {
      setShowComponent(false); // Remove the transition effect class
    }, 500); // You can adjust the duration as needed

    return () => clearTimeout(transitionDelay);
  }, []);


  return (
    <header className={`header ${showComponent ? 'visible' : 'transition-effect'}`}>
      <div className="logo-container">
        <img onClick={onHomeButtonClick} src={process.env.PUBLIC_URL + '/images/whirpng_croppedslim.png'} alt="Logo" className="logo" />
      </div>
      <nav className="menu">
        <button className="menu-button" onClick={onHomeButtonClick}>
          Home
        </button>

        {isSignedIn ? (
          <div className="menu-dropdown">
            <button className="menu-button" onClick={handleProfileClick}>
              <img src={process.env.PUBLIC_URL + '/images/logo192.png'} alt="Logo" className="profile-image" />
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <button className="dropdown-item" onClick={() => handleProfileDropdownClick('userprofile')}>Profile</button>
                <button className="dropdown-item" onClick={() => handleProfileDropdownClick('usersettings')}>Settings</button>
                <button className="dropdown-item" onClick={() => handleProfileDropdownClick('signout')}>Log Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="menu-button" onClick={onSignIn}>
              Sign In
            </button>
            <button className="menu-button" onClick={onBusinessSignIn}>
              Business Sign In
            </button>
            <button className="join menu-button" onClick={onSignUp}>
              Join Whir
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
