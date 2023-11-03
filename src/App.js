import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile'; // Import UserProfile

function App() {
  const [activeTab, setActiveTab] = useState('signup'); // Use state to track the active tab
  const [user, setUser] = useState(null); // Add state to track the signed up user

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleUserSignUp = (user) => { // Add a new handler for user signup
    setUser(user);
    setActiveTab('userprofile');
  };

  const handleUserSignIn = (user) => { // Add a new handler for user signup
    setUser(user);
    setActiveTab('userprofile');
  };

  return (
    <div className="App">
      <Header /> {/* Add the Header component here */}
      <div>
        <span
          className={activeTab === 'signup' ? 'active-tab' : 'inactive-tab'}
          onClick={() => handleTabClick('signup')}
        >
          Sign Up
        </span>
        <span
          className={activeTab === 'signin' ? 'active-tab' : 'inactive-tab'}
          onClick={() => handleTabClick('signin')}
        >
          Sign In
        </span>
      </div>
      {activeTab === 'signup' && <SignUp onSignUp={handleUserSignUp} />}
      {activeTab === 'signin' && <SignIn onSignIn={handleUserSignIn} />}
      {activeTab === 'userprofile' && <UserProfile user={user} />}
    </div>
  );
}

export default App;