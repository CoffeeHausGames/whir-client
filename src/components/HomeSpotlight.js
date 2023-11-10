import './SearchScreen.css';
import React, { useState } from 'react';

const HomeSpotlight = () => {
  // Sample list of news items (replace it with your data)
  const initialNews = [
    {
      id: 1,
      title: 'Breaking News 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'Important Update',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      title: 'Local Event Tomorrow',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
  ];

  const [news, setNews] = useState(initialNews);

  return (
    <div className="home-spotlight">
      <h1>Community Spotlight</h1>
      {news.map((item) => (
        <div key={item.id} className="news-item">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeSpotlight;
