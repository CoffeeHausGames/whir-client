import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [showComponent, setShowComponent] = useState(false);


  useEffect(() => {
    setShowComponent(true); // Show the component immediately

    // Add the transition effect after a short delay
    const transitionDelay = setTimeout(() => {
      setShowComponent(false); // Remove the transition effect class
    }, 100); // You can adjust the duration as needed

    return () => clearTimeout(transitionDelay);
  }, []);

  return (
    <div className={`home ${showComponent ? 'visible' : 'transition-effect'}`}>
      <h1>Welcome to Whir</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac velit ac tellus venenatis tincidunt. Sed nec odio tincidunt, hendrerit urna eu, vestibulum nulla. Phasellus convallis vel dolor eu malesuada. Proin in eros vitae lorem feugiat pharetra. Nullam pulvinar quam non orci tincidunt, nec semper nisl varius. Fusce varius ultricies quam, ac eleifend augue. Cras eget orci quis elit venenatis aliquet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eu dapibus nulla. Nullam nec facilisis nisi.</p>
    </div>
  );
}

export default Home;