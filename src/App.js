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
import BusinessProfile from './components/BusinessProfile';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isProfileVisible, setIsProfileVisible] = useState(false); // New state variable
  const [isHomeVisible, setIsHomeVisible] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isBusinessSignedIn, setIsBusinessSignedIn] = useState(false);
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

  const handleUserSignIn = () => {
    console.log(isUserSignedIn);
    setActiveTab('home');
    setIsUserSignedIn(true);
    console.log(isUserSignedIn);
  };


  const handleUserSignOut = () => {
    setUser(null);
    setActiveTab('signin');
    setIsUserSignedIn(false);
  };

    const handleBusinessSignOut = () => {
    setBusiness(null);
    setActiveTab('signin');
    setIsBusinessSignedIn(false);
  };

  // New function to toggle the visibility of the user profile
  const handleUserProfileButtonClick = () => {
    setActiveTab('userprofile');
    // setIsProfileVisible(!isProfileVisible);
  };

  const handleBusinessProfileButtonClick = () => {
    setActiveTab('businessprofile');
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
    setActiveTab('home'); // Set the active tab to 'businesssignin'
    setIsBusinessSignedIn(true); // Set isSignedIn to true
  }

  return (
    <div className="App">
      <Header 
        onUserProfileButtonClick={handleUserProfileButtonClick}
        onBusinessProfileButtonClick={handleBusinessProfileButtonClick}
        onHomeButtonClick={handleHomeButtonClick} 
        onSettingsButtonClick={handleSettingsButtonClick}
        onSignIn={() => setActiveTab('signin')}
        onSignUp={() => setActiveTab('signup')}
        onBusinessSignIn={() => setActiveTab('businesssignin')}
        isUserSignedIn={isUserSignedIn}
        isBusinessSignedIn={isBusinessSignedIn}
      />
      {activeTab === 'signup' && <SignUp onSignUp={handleUserSignUp} />}
      {activeTab === 'signin' && <SignIn onUserSignIn={handleUserSignIn} />}
      {activeTab === 'home' && <Home onSignIn={handleUserSignIn} />}
      {activeTab === 'businesssignin' && <BusinessSignIn onBusinessSignIn={handleBusinessSignIn} />}
      {activeTab === 'usersettings' && <UserSettings onSignIn={handleUserSignIn} />}
      {activeTab === 'userprofile' && (
        <UserProfile user={user} onSignOut={handleUserSignOut} />
      )}
      {activeTab === 'businessprofile' && (
        <BusinessProfile business={business} onSignOut={handleBusinessSignOut} />
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
