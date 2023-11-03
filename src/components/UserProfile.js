import React from 'react';

function UserProfile(props) {
  const user = props.user;

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {user.First_name}</p>
      <p>Last Name: {user.Last_name}</p>
      <p>Email: {user.Email}</p>
    </div>
  );
}

export default UserProfile;