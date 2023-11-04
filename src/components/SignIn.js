import React, { useState } from 'react';

function SignIn(props) {
  const [formData, setFormData] = useState({
    First_name: '',
    Last_name: '',
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
        props.onSignIn(formData);
      } else {
        console.error('User authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.Email}
          onChange={(e) =>
            setFormData({ ...formData, Email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.Password}
          onChange={(e) =>
            setFormData({ ...formData, Password: e.target.value })
          }
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
