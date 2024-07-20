// frontend/src/pages/StandingsPage.js
import React, { useState, useEffect } from 'react';
import './StandingsPage.css';

function StandingsPage() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/standings')
      .then(response => response.json())
      .then(data => setStandings(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container">
      <h2>Standings</h2>
      <ul>
        {standings.map((driver) => (
          <li key={driver.id}>
            {driver.position}. {driver.name} - {driver.points} points
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StandingsPage;
