import React, { useEffect, useState } from 'react';

function DriverDashboard() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/incidents', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setIncidents(data);
    };

    fetchIncidents();
  }, []);

  return (
    <div className="dashboard">
      <h1>Driver Dashboard</h1>
      <h2>My Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <h3>{incident.title}</h3>
            <p>{incident.description}</p>
            <p>Status: {incident.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverDashboard;
