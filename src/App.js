import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import UserSettings from './components/UserSettings'
import Footer from './components/Footer';
import BusinessSignIn from './components/BusinessSignIn';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isProfileVisible, setIsProfileVisible] = useState(false); // New state variable
  const [isHomeVisible, setIsHomeVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);

   // State for component transition
   const [isEntering, setIsEntering] = useState(false);
   const [isExiting, setIsExiting] = useState(false);

  const handleTabClick = (tab) => {
    setIsExiting(true); // Start the exit transition
    setTimeout(() => {
      setActiveTab(tab); // Change the tab after the exit transition
      setIsEntering(true); // Start the enter transition
    }, 300); // Adjust the duration to match your CSS transition duration
  };

  const handleUserSignUp = (user) => {
    setUser(user);
    setActiveTab('userprofile');
  };

  const handleUserSignIn = (user) => {
    setUser(user);
    setActiveTab('home');
    setIsSignedIn(true);
  };


  const handleUserSignOut = () => {
    setUser(null);
    setActiveTab('signin');
    setIsSignedIn(false);
  };

  // New function to toggle the visibility of the user profile
  const handleProfileButtonClick = () => {
    setActiveTab('userprofile');
    // setIsProfileVisible(!isProfileVisible);
  };

  const handleHomeButtonClick = () => {
    setActiveTab('home');
    // setIsProfileVisible(!isProfileVisible);
  };

  const handleSettingsButtonClick = () => {
    setActiveTab('usersettings');
    // setIsProfileVisible(!isProfileVisible);
  };

  const handleBusinessSignIn = () => {
    setActiveTab('businesssignin');
  }
  

  return (
    <div className="App">
      <Header 
        onProfileButtonClick={handleProfileButtonClick}
        onHomeButtonClick={handleHomeButtonClick} 
        onSettingsButtonClick={handleSettingsButtonClick}
        onSignIn={() => setActiveTab('signin')}
        onSignUp={() => setActiveTab('signup')}
        onBusinessSignIn={() => setActiveTab('businesssignin')}
        isSignedIn={isSignedIn}
      />
      {activeTab === 'signup' && <SignUp onSignUp={handleUserSignUp} />}
      {activeTab === 'signin' && <SignIn onSignIn={handleUserSignIn} />}
      {activeTab === 'home' && <Home onSignIn={handleUserSignIn} />}
      {activeTab === 'businesssignin' && <BusinessSignIn onBusinessSignIn={handleBusinessSignIn} />}
      {activeTab === 'usersettings' && <UserSettings onSignIn={handleUserSignIn} />}
      {activeTab === 'userprofile' && (
        <UserProfile user={user} onSignOut={handleUserSignOut} />
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
