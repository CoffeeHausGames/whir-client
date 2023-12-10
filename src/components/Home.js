// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import { useAuth } from '../utils/AuthContext';
import './Home.css';
import { apiRequest } from '../utils/NetworkContoller'; // Assuming api.js is in the same directory

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [showComponent, setShowComponent] = useState(false);
  const navigate = useNavigate(); // Create a history object
  const { signIn } = useAuth(); // Get the signIn function from the context

  const [showCookiePopup, setShowCookiePopup] = useState(false);

  // Show the cookie popup when the component mounts
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowCookiePopup(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowCookiePopup(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie-consent', 'false');
    setShowCookiePopup(false);
  };

  useEffect(() => {
    setShowComponent(true);

    const transitionDelay = setTimeout(() => {
      setShowComponent(false);
    }, 100);

    return () => clearTimeout(transitionDelay);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    const storedBusinessUser = localStorage.getItem('businessData');
    const businessUser = storedBusinessUser ? JSON.parse(storedBusinessUser) : null;
    
    if ((!user || !user.authenticated) && (!businessUser || !businessUser.authenticated)) {
      console.log('Checking user authentication')
      // Make a request to your server to check if the user is authenticated
      apiRequest('/user', 'GET', null, {}, true)
        .then(data => {
          if (data.data) {
            // If the user is authenticated, store the user data in local storage, update the context, and navigate to the logged in page
            console.log('User Authentication Successful');
            const user = { ...data.user, authenticated: true };
            localStorage.setItem('user', JSON.stringify(user));
            console.log(localStorage.getItem('user'));
            signIn();
            navigate('/home');
          }
        })
        .catch((error) => {
          console.warn('Error:', error);
        });
    }
  }, [navigate, signIn]);

  const navigateToSearchScreen = () => {
    // Use the history object to navigate to /searchscreen
    navigate('/searchscreen');
  };

  return (
    <div className="body-img">
      <div>
        <img
          src={process.env.PUBLIC_URL + '/images/whirpng_croppedslim_white.png'}
          alt="mapimage"
          className="logo-img-home"
        />
      </div>
      <div className="main-img-container">
        <img
          src={process.env.PUBLIC_URL + '/images/map_sil_fade.png'}
          alt="mapimage"
          className="main-img"
        />
      </div>
      <div className="button-container">
        {/* Button to navigate to /searchscreen */}
        <button className="discover-deals-button-left" onClick={navigateToSearchScreen}>
          Discover Deals Near You
        </button>
        {/* Add other buttons or actions as needed */}
      </div>
      {showCookiePopup && (
        <div className="cookie-popup">
          <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
          <div className="button-group">
            <button onClick={handleAcceptCookies}>Accept</button>
            <button onClick={handleDeclineCookies}>Decline</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
