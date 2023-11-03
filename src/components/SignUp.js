import React, { useState } from 'react';

function SignUp(props) {
  const [formData, setFormData] = useState({
    First_name: '',
    Last_name: '',
    Email: '',
    Password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Log before sending the request
    console.log('Sending sign-up request:', formData);

    // Send a POST request to your backend to handle user registration
    // You should replace 'YOUR_BACKEND_API_URL' with your actual API endpoint.
    try {
      const response = await fetch('http://localhost:4444/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Log the response status and data
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        console.log('User registered successfully');
        props.onSignUp(formData);
      } else {
        console.error('User registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }; 

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={formData.First_name}
          onChange={(e) =>
            setFormData({ ...formData, First_name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.Last_name}
          onChange={(e) =>
            setFormData({ ...formData, Last_name: e.target.value })
          }
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
