import React from 'react';
import './Header.css'; // You can create a CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="path/to/your-logo-image.png" alt="Logo" className="logo" />
      </div>
      <nav className="menu">
        <button className="menu-button">Button 1</button>
        <button className="menu-button">Button 2</button>
        <button className="menu-button">Button 3</button>
      </nav>
    </header>
  );
};

export default Header;
