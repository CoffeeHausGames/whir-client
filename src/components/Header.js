import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { user, businessUser, signOut, businessSignOut, isBusinessUserAuthenticated } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

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
  }, [user, businessUser, isBusinessUserAuthenticated]);

  const handleUserProfileClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    signOut();
    navigate('/signin');
  };

  const handleBusinessSignOut = () => {
    localStorage.removeItem('business');
    businessSignOut();
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={process.env.PUBLIC_URL + '/images/whirpng_croppedslim_white.png'}
          alt="Logo"
          className="logo"
          onClick={() => navigate('/home')}
        />
      </div>
      <nav className="mid-menu">
        <div className="mid-menu-buttons">
          <button 
          onClick={() => navigate('/homespotlight')}
          className="mmbutton">
            Spotlight
          </button>
          <button 
          onClick={() => navigate('/homelocations')}
          className="mmbutton">
            Locations
          </button>
          <button 
          onClick={() => navigate('/homeabout')}
          className="mmbutton">
            About
          </button>
        </div>
      </nav>
      <nav className="menu">
        {(user && user.authenticated) || (businessUser && businessUser.authenticated) || isBusinessUserAuthenticated ? (
          <div className="menu-dropdown">
            <button className="menu-button" onClick={handleUserProfileClick}>
              <img
                src={process.env.PUBLIC_URL + '/images/person-circle.png'}
                alt="Logo"
                className="profile-image"
              />
            </button>
            {user && user.authenticated && (
              <div className="dropdown-content">
                <button className="dropdown-item" onClick={() => navigate(businessUser ? "/userprofile" : "/userprofile")}>Profile</button>
                <button className="dropdown-item" onClick={() => navigate(businessUser ? "/settings" : "/usersettings")}>Settings</button>
                <button className="dropdown-item" onClick={businessUser ? handleBusinessSignOut : handleSignOut}>
                  Log Out
                </button>
              </div>
            )}
            {businessUser && businessUser.authenticated && (
              <div className="dropdown-content">
                <button className="dropdown-item" onClick={() => navigate(businessUser ? "/userprofile" : "/userprofile")}>Profile</button>
                <button className="dropdown-item" onClick={() => navigate('/businessdashboard')}> Dashboard </button>
                <button className="dropdown-item" onClick={() => navigate('/businessdealmanager')}> Deals </button>
                <button className="dropdown-item" onClick={() => navigate(businessUser ? "/settings" : "/usersettings")}>Settings</button>
                <button className="dropdown-item" onClick={businessUser ? handleBusinessSignOut : handleSignOut}>
                  Log Out
                </button>
              </div>

            )}
          </div>
        ) : (
          <>
            <button className="menu-button" onClick={() => navigate('/signin')}>Sign In</button>
            <button className="join" onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
