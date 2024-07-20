// frontend/src/pages/CalendarPage.js
import React, { useState, useEffect } from 'react';
import './CalendarPage.css';

function CalendarPage() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/calendar')
      .then(response => response.json())
      .then(data => setRaces(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container">
      <h2>Race Calendar</h2>
      <ul>
        {races.map((race) => (
          <li key={race.id}>
            {race.date} - {race.grand_prix}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarPage;
