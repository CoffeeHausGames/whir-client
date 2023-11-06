import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import UserSettings from './components/UserSettings';
import UserProfile from './components/UserProfile';
import BusinessSignIn from './components/BusinessSignIn';
// import BusinessProfile from './components/BusinessProfile';
import SearchScreen from './components/SearchScreen';
import Footer from './components/Footer';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/businesssignin" element={<BusinessSignIn />} />
            <Route path="/usersettings" element={<UserSettings />} />
            <Route path="/userprofile" element={<UserProfile />} />
            {/* <Route path="/businessprofile" element={<BusinessProfile />} /> */}
            <Route path="/searchscreen" element={<SearchScreen />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;