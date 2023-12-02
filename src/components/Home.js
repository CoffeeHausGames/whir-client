// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
// import { AuthContext } from '../AuthContext'; // Import the AuthContext
import { useAuth } from '../AuthContext';
import './Home.css';
import { apiRequest } from '../utils/NetworkContoller'; // Assuming api.js is in the same directory

function Home() {
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
  
    if (!user || !user.authenticated) {
      console.log('Checking user authentication')
      // Make a request to your server to check if the user is authenticated
      apiRequest('/v1/users/login', 'GET', null, {}, true)
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
      {/* <div className="main-text-home">
        <div className={`home ${showComponent ? 'visible' : 'transition-effect'}`}>
          <h1>Welcome to Whir</h1>
          <p>
            Discover Local Delights with Whir: Your one-stop destination for all things local.
            Explore exclusive deals, events, and promotions, while supporting community businesses.
            Join the Whir community to unlock unique membership perks and be part of the movement
            that revitalizes local commerce
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
