import React from 'react';
import './Footer.css'; // Import the CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/">Legal</a>
        <a href="/signup">Sign Up</a>
        <a href="/signin">Careers</a>
        <a href="/userprofile">JK Lol</a>
        <a href="/usersettings">Ligma</a>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Your Website. All rights reserved. Image by <a href="https://www.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_15441959.htm#query=orange%20white%20background&position=3&from_view=keyword&track=ais">Freepik</a>
      </div>
    </footer>
  );
}

export default Footer;
