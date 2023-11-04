import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({
  onProfileButtonClick,
  onBusinessProfileButtonClick,
  onBusinessSignIn,
  onUserSignIn,
  onSettingsButtonClick,
  onHomeButtonClick,
  onSignIn,
  onSignUp,
  onSignOut,
  isUserSignedIn,
  isBusinessSignedIn,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const handleSignOut = () => {
    // Perform sign out logic here, such as clearing user data or session
    // For example, you can clear the user state and any stored tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Reload the sign-in page
    window.location.reload();
  };

  const handleUserProfileClick = () => {
    if (isUserSignedIn) {
      setShowUserDropdown(!showUserDropdown);
      setShowBusinessDropdown(false); // Close business dropdown if open
    } else {
      onUserSignIn();
    }
  };

  const handleBusinessProfileClick = () => {
    if (isBusinessSignedIn) {
      setShowBusinessDropdown(!showBusinessDropdown);
      setShowUserDropdown(false); // Close user dropdown if open
    } else {
      onBusinessSignIn();
    }
  };

  const handleProfileDropdownClick = (action) => {
    if (action === 'userprofile') {
      onProfileButtonClick();
    } else if (action === 'signout') {
      handleSignOut();
    } else if (action === 'usersettings') {
      onSettingsButtonClick();
    }
    setShowUserDropdown(false);
  };

  const handleBusinessProfileDropdownClick = (action) => {
    if (action === 'businessprofile') {
      onBusinessProfileButtonClick();
    } else if (action === 'signout') {
      handleSignOut();
    } else if (action === 'usersettings') {
      onSettingsButtonClick();
    }
    setShowBusinessDropdown(false);
  };

  useEffect(() => {
    setShowComponent(true); // Show the component immediately

    const transitionDelay = setTimeout(() => {
      setShowComponent(false); // Remove the transition effect class
    }, 500);

    return () => clearTimeout(transitionDelay);
  }, []);

  return (
    <header className={`header ${showComponent ? 'visible' : 'transition-effect'}`}>
      <div className="logo-container">
        <img
          onClick={onHomeButtonClick}
          src={process.env.PUBLIC_URL + '/images/whirpng_croppedslim.png'}
          alt="Logo"
          className="logo"
        />
      </div>
      <nav className="menu">
        <button className="menu-button" onClick={onHomeButtonClick}>
          Home
        </button>
        {isUserSignedIn && (
          <div className="menu-dropdown">
            <button className="menu-button" onClick={handleUserProfileClick}>
              <img
                src={process.env.PUBLIC_URL + '/images/logo192.png'}
                alt="Logo"
                className="profile-image"
              />
            </button>
            {showUserDropdown && (
              <div className="dropdown-content">
                <button
                  className="dropdown-item"
                  onClick={() => handleProfileDropdownClick('userprofile')}
                >
                  Profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleProfileDropdownClick('usersettings')}
                >
                  Settings
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleProfileDropdownClick('signout')}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
        {isBusinessSignedIn && (
          <div className="menu-dropdown">
            <button className="menu-button" onClick={handleBusinessProfileClick}>
              <img
                src={process.env.PUBLIC_URL + '/images/logo192.png'}
                alt="Logo"
                className="profile-image"
              />
            </button>
            {showBusinessDropdown && (
              <div className="dropdown-content">
                <button
                  className="dropdown-item"
                  onClick={() => handleBusinessProfileDropdownClick('businessprofile')}
                >
                  Profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleBusinessProfileDropdownClick('usersettings')}
                >
                  Settings
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleBusinessProfileDropdownClick('signout')}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
        {!isUserSignedIn && !isBusinessSignedIn && (
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
