import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
            <img
                src={process.env.PUBLIC_URL + '/images/Landing-page-no-back.png'}
                alt="Landingpage"
                className="landingpagetop"
            />
      <header className="header">
        <h1>Whir</h1>
        <p>Deal discovery, Simplified.</p>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Empowering Innovation</h2>
          <p>Your journey begins with us. Explore cutting-edge solutions and transform your ideas into reality.</p>
          <button className="cta-button">Get Started</button>
        </div>
        {/* Add an image or illustration for the hero section */}
        <img src="/path/to/hero-image.jpg" alt="Tech Startup" className="hero-image" />
      </section>

      <section className="features-section">
        <div className="feature">
          <h3>Feature 1</h3>
          <p>Discover powerful features that streamline your workflow and enhance productivity.</p>
        </div>
        <div className="feature">
          <h3>Feature 2</h3>
          <p>Stay ahead of the curve with advanced technologies and industry best practices.</p>
        </div>
        <div className="feature">
          <h3>Feature 3</h3>
          <p>Join a community of innovators and collaborate on projects that shape the future.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join us on our mission to revolutionize the tech landscape.</p>
        <button className="cta-button">Sign Up Now</button>
      </section>
    </div>
  );
};

export default LandingPage;
