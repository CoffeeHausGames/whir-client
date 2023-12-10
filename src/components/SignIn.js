import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './SignIn.css';
import { apiRequest } from '../utils/NetworkContoller';

function SignIn() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    setCookieConsent(consent === 'true');
  }, []);

  const navigate = useNavigate();
  const { user, signIn } = useAuth(); // Get the signIn function from the context
  const [showComponent, setShowComponent] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    console.log('Sending sign-in request:', formData);
   
    if (user && user.authenticated) {
      console.error('A user is already authenticated');
      return;
    }

    try {
      const response = await apiRequest('/users/login', 'POST', formData, {
        'Content-Type': 'application/json',
      });
    
      if (response.ok) {
        const responseData = await response.data;
    
        // Replace the following line with the check you use to distinguish business users
        if (responseData.userType === 'business') {
          // Handle business user sign-in
          console.log('Business User Authentication Successful');
          // Business user sign-in logic
        } else {
          // Handle regular user sign-in
          console.log('User Authentication Successful');
          const user = { ...responseData, authenticated: true };
          localStorage.setItem('user', JSON.stringify(user));
          signIn(); // Call the signIn function to update the context
          navigate('/home'); // Redirect to the protected route
        }
      } else {
        console.error('User authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Load the google sign-in button script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);
  
    // Add meta tag
    const meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'no-referrer-when-downgrade';
    document.head.appendChild(meta);
  
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    setShowComponent(true);

    const transitionDelay = setTimeout(() => {
      setShowComponent(false);
    }, 100);

    return () => clearTimeout(transitionDelay);
  }, []);

  return (
    <div className={`signin ${showComponent ? 'visible' : 'transition-effect'}`}>
      <div className="sign-in-container">
        <h2 className="title">Login</h2>
        <h3 className="subtitle">Please sign in to continue</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder=" Email"
            value={formData.Email}
            onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            required
            className="custom-input"
          />
          <input
            type="password"
            placeholder=" Password"
            value={formData.Password}
            onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
            required
            className="custom-input"
          />
          <button
          type="button"
          className="alt-login"
          onClick={() => {
            // Handle business sign-in or navigation here
            navigate('/businesssignin');
          }}>
            Are you a merchant? Sign in here
          </button>
          <button type="submit" className="custom-button">
            Sign In
          </button>

          {cookieConsent && (
            <>
            <div id="g_id_onload"
              data-client_id="709491539301-kovmas7f7dnfjv2asj1uas78c6p7640b.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="redirect"
              data-login_uri="http://localhost:4444/v1/users/login/google"
              data-auto_prompt="false"
              referrer-policy="no-referrer-when-downgrade">
            </div>

            <div className="g_id_signin"
              data-type="standard"
              data-shape="pill"
              data-theme="filled_blue"
              data-text="signin_with"
              data-size="medium"
              data-logo_alignment="left">
            </div>
            </>
          )}
        </form>

      </div>
    </div>
  );
}

export default SignIn;