import React, { useEffect, useState } from 'react';
import './CalendarPage.css'; // Import the CSS file for styling

function CalendarPage() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchRaces = async () => {
      const response = await fetch('http://ec2-18-194-185-210.eu-central-1.compute.amazonaws.com:8000/api/calendar');
      const data = await response.json();
      setRaces(data);
    };

    fetchRaces();
  }, []);

  return (
    <div className="calendar">
      <h1>Race Calendar</h1>
      <ul>
        {races.map((race) => (
          <li key={race.id}>
            <h2>{race.grand_prix}</h2>
            <p className="date">Date: {race.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarPage;
