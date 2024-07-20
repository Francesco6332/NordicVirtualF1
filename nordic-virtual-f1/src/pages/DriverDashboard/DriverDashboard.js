// frontend/src/pages/DriverDashboard.js
import React, { useState, useEffect } from 'react';
import './DriverDashboard.css';

function DriverDashboard() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/api/incidents', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setIncidents(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container">
      <h2>Driver Dashboard</h2>
      <h3>Your Incident Reports</h3>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <h4>{incident.title}</h4>
            <p>{incident.description}</p>
            <p>Status: {incident.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverDashboard;
