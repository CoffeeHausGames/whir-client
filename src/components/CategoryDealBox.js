// CategoryDeals.js
import React, { useState } from 'react';
import './CategoryDealBox.css';

const CategoryDeals = () => {
  // Placeholder data for categories and deals
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const deals = [
    { id: 1, title: 'Deal 1', description: 'Description for Deal 1' },
    { id: 2, title: 'Deal 2', description: 'Description for Deal 2' },
    { id: 3, title: 'Deal 3', description: 'Description for Deal 3' },
  ];

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="category-deals-container">
      {/* Category Dropdown */}
      <div className="category-dropdown">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Deals Display */}
      <div className="deals-display">
        <h2>Deals for {selectedCategory}</h2>
        <div className="deal-cards">
          {deals.map((deal) => (
            <div key={deal.id} className="deal-card">
              <h3>{deal.title}</h3>
              <p>{deal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDeals;
