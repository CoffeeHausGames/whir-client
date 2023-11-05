import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth

const Header = () => {
  const { isAuthenticated, isBusinessAuthenticated, signOut, businessSignOut } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    // Your existing code for regular user authentication
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authenticated) {
      console.log('User is authenticated'); // Optionally, you can add a log here
    }
  }, []); // Empty array means this effect runs once on mount and not on updates

  useEffect(() => {
    // Your existing code for business user authentication
    const businessUser = JSON.parse(localStorage.getItem('business'));
    if (businessUser && businessUser.authenticated) {
      console.log('Business User is authenticated'); // Optionally, you can add a log here
    }
  }, []); // Empty array means this effect runs once on mount and not on updates

  useEffect(() => {
    const handleStorageChange = () => {
      // Your existing code for regular user authentication
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.authenticated) {
        console.log('User is authenticated'); // Optionally, you can add a log here
      }

      // Your existing code for business user authentication
      const businessUser = JSON.parse(localStorage.getItem('business'));
      if (businessUser && businessUser.authenticated) {
        console.log('Business User is authenticated'); // Optionally, you can add a log here
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
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    signOut(); // Use the signOut function from useAuth
  };

  const handleBusinessSignOut = () => {
    localStorage.removeItem('business');
    businessSignOut(); // Use the businessSignOut function from useAuth
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
        {isAuthenticated || isBusinessAuthenticated ? (
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
                <Link to={isBusinessAuthenticated ? "/businessprofile" : "/userprofile"} className="dropdown-item">Profile</Link>
                <Link to={isBusinessAuthenticated ? "/businesssettings" : "/usersettings"} className="dropdown-item">Settings</Link>
                <Link to="/signin" className="dropdown-item" onClick={isBusinessAuthenticated ? handleBusinessSignOut : handleSignOut}>
                  Log Out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup" className="menu-button">Sign Up</Link>
            <Link to="/signin" className="menu-button">Sign In</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
