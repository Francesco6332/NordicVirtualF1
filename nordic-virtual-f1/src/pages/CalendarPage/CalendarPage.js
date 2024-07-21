import React, { useEffect, useState } from 'react';

function Calendar() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchRaces = async () => {
      const response = await fetch('http://localhost:8000/api/calendar');
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
            <p>Date: {race.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
