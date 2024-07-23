import React, { useEffect, useState } from 'react';
import './StandingsPage.css'; // Import the CSS file for styling

function StandingsPage() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const response = await fetch('http://18.194.185.210:8000/api/standings');
      const data = await response.json();
      setStandings(data);
    };

    fetchStandings();
  }, []);

  return (
    <div className="standings-container">
      <h1 className="standings-title">F1 Standings</h1>
      <div className="standings-table">
        <div className="table-header">
          <div className="header-item">Position</div>
          <div className="header-item">Driver</div>
          <div className="header-item">Points</div>
        </div>
        {standings.map((driver) => (
          <div key={driver.id} className="table-row">
            <div className="table-cell position">{driver.position}</div>
            <div className="table-cell driver-name">{driver.name}</div>
            <div className="table-cell points">{driver.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StandingsPage;
