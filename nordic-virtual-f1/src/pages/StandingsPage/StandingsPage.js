import React, { useEffect, useState } from 'react';

function Standings() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const response = await fetch('http://18.156.77.207:8000/api/standings');
      const data = await response.json();
      setStandings(data);
    };

    fetchStandings();
  }, []);

  return (
    <div className="standings">
      <h1>Standings</h1>
      <ul>
        {standings.map((driver) => (
          <li key={driver.id}>
            <h2>{driver.name}</h2>
            <p>Position: {driver.position}</p>
            <p>Points: {driver.points}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Standings;
