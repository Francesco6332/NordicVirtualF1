// frontend/src/pages/HomePage.js
import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to the Nordic Virtual F1 League</h1>
      <p>Please select your login type:</p>
      <ul>
        <li>
          <a href="/login?type=driver">Driver Login</a>
        </li>
        <li>
          <a href="/login?type=steward">Steward Login</a>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
