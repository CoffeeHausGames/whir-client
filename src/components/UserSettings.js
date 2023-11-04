import React, { useState } from 'react';

const UserSettings = ({ user, onSaveSettings }) => {
  // const [firstName, setFirstName] = useState(user.First_name);
  // const [lastName, setLastName] = useState(user.Last_name);

  const handleSaveSettings = async () => {
    // Prepare the updated user data
    // const updatedUserData = {
    //   ...user,
    //   First_name: firstName,
    //   Last_name: lastName,
    // };

    // Send a request to update user settings in the database
    // try {
    //   const response = await fetch('http://localhost:4444/users', {
    //     method: 'PUT', // Use the appropriate HTTP method (e.g., PUT) for updates
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(updatedUserData),
    //   });

    //   if (response.ok) {
    //     // Successfully updated user settings
    //     onSaveSettings(updatedUserData);
    //   } else {
    //     // Handle error responses as needed
    //     console.error('Failed to update user settings');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value="firstName"
          // onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value="lastName"
          // onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button onClick={handleSaveSettings}>Save</button>
    </div>
  );
};

export default UserSettings;
