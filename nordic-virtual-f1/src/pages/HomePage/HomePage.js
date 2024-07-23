import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to the Nordic Virtual F1 League</h1>
      <p>Please select your action:</p>
      <div className="options">
        <div className="option">
          <h2>Login</h2>
          <ul>
            <li>
              <Link to="/login" className="link">Login</Link>
            </li>

          </ul>
        </div>
        <div className="option">
          <h2>Register</h2>
          <ul>
            <li>
              <Link to="/register?type=driver" className="link">Driver Register</Link>
            </li>
            <li>
              <Link to="/register?type=steward" className="link">Steward Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
