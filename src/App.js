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
import SearchScreen from './components/SearchScreen';
import Footer from './components/Footer';
import BusinessSignUp from './components/BusinessSignUp';
import SuccessScreen from './components/SuccessScreen';
import BusinessDealManager from './components/BusinessDealManager';
import BusinessDashboard from './components/BusinessDashboard';
import HomeAbout from './components/HomeAbout';
import HomeLocations from './components/HomeLocations';
import HomeSpotlight from './components/HomeSpotlight';
import LandingPage from './components/LandingPage';
import Search from './components/Search';
import MapComponent from './components/Map';
import { AuthProvider } from './utils/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/businesssignup" element={<BusinessSignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/businesssignin" element={<BusinessSignIn />} />
            <Route path="/successscreen" element={<SuccessScreen />} />
            <Route path="/usersettings" element={<UserSettings />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/searchscreen" element={<SearchScreen />} />
            <Route path="businessdealmanager" element={<BusinessDealManager />} />
            <Route path="businessdashboard" element={<BusinessDashboard />} />
            <Route path="homespotlight" element={<HomeSpotlight />} />
            <Route path="homelocations" element={<HomeLocations />} />
            <Route path="homeabout" element={<HomeAbout />} />
            <Route path="landingpage" element={<LandingPage />} />
            <Route path="search" element={<Search />} />
            <Route path="mapcomponent" element={<MapComponent />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;