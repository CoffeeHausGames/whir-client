import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './SignIn.css';

function SignIn() {
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
      const response = await fetch('http://localhost:4444/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Replace the following line with the check you use to distinguish business users
        if (responseData.data.userType === 'business') {
          // Handle business user sign-in
          console.log('Business User Authentication Successful');
          // Business user sign-in logic
        } else {
          // Handle regular user sign-in
          console.log('User Authentication Successful');
          const user = { ...responseData.data, authenticated: true };
          localStorage.setItem('user', JSON.stringify(user));
          signIn(); // Call the signIn function to update the context
          navigate('/searchscreen'); // Redirect to the protected route
        }
      } else {
        console.error('User authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

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
          <button type="submit" className="custom-button">
            Sign In
          </button>
        </form>
        <button
          type="button"
          className="alt-login"
          onClick={() => {
            // Handle business sign-in or navigation here
            navigate('/businesssignin');
          }}
        >
          Are you a merchant? Sign in here
        </button>
      </div>
    </div>
  );
}

export default SignIn;