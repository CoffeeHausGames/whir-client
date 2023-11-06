import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { user, businessUser, signOut, businessSignOut, setUser, setBusinessUser } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      // Handle changes in localStorage data for user and business user
      const userStorageData = localStorage.getItem('user');
      const businessUserStorageData = localStorage.getItem('business');

      // Parse JSON data only if it exists
      const user = userStorageData ? JSON.parse(userStorageData) : null;
      const businessUser = businessUserStorageData ? JSON.parse(businessUserStorageData) : null;

      // Check if the parsed data is authenticated
      if (user && user.authenticated) {
        console.log('Regular User is authenticated');
      }

      if (businessUser && businessUser.authenticated) {
        console.log('Business User is authenticated');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleUserProfileClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    signOut();
  };

  const handleBusinessSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setBusinessUser(null);
    businessSignOut();
  };


  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={process.env.PUBLIC_URL + '/images/whirpng_croppedslim.png'}
          alt="Logo"
          className="logo"
        />
      </div>
      <nav className="menu">
        <Link to="/home" className="menu-button">Home</Link>
        {(user && user.authenticated) || (businessUser && businessUser.authenticated) ? (
          <div className="menu-dropdown">
            <button className="menu-button" onClick={handleUserProfileClick}>
              <img
                src={process.env.PUBLIC_URL + '/images/person-circle.svg'}
                alt="Logo"
                className="profile-image"
              />
            </button>
            {showUserDropdown && (
              <div className="dropdown-content">
                <Link to={businessUser ? "/businessprofile" : "/userprofile"} className="dropdown-item">Profile</Link>
                <Link to={businessUser ? "/businesssettings" : "/usersettings"} className="dropdown-item">Settings</Link>
                <Link to="/signin" className="dropdown-item" onClick={businessUser ? handleBusinessSignOut : handleSignOut}>
                  Log Out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signin" className="menu-button">Sign In</Link>
            <Link to="/signup" className="join">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;