import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  const [activeTab, setActiveTab] = useState('signup'); // Use state to track the active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
      {activeTab === 'signup' && <SignUp />}
      {activeTab === 'signin' && <SignIn />}
    </div>
  );
}

export default App;
