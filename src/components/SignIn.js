import React, { useState, useEffect } from 'react';
import './SignIn.css';

function SignIn({onUserSignIn, onBusinessSignIn }) {
  const [showComponent, setShowComponent] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Sending sign-in request:', formData);

    // Send a POST request to your backend to handle user authentication
    // You should replace 'YOUR_BACKEND_API_URL' with your actual API endpoint.
    try {
      const response = await fetch('http://localhost:4444/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        console.log('User authenticated successfully');
        const responseData = await response.json(); // Parse the JSON response
        const user = { ...responseData.data, authenticated: true };
        localStorage.setItem('user', JSON.stringify(user));
        onUserSignIn(formData);
      } else {
        console.error('User authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
    <div className={`signin ${showComponent ? 'visible' : 'transition-effect'}`}>    
      <div className="sign-in-container" >
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
            type="submit" 
            className="custom-button"
            >
            Sign In
          </button>          

        </form>
          <button 
            type="nav" 
            className="alt-login"
            onClick={onBusinessSignIn}
            >
            Are you a merchant? Sign in here
          </button>
      </div>
    </div>

  );
}

export default SignIn;
