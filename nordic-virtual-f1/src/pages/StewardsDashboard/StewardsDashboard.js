// frontend/src/pages/StewardDashboard.js
import React, { useState, useEffect } from 'react';
import './StewardsDashboard.css';

function StewardDashboard() {
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

  const handleUpdateStatus = (id, status) => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/incidents/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: status }),
    })
      .then(response => response.json())
      .then(data => {
        setIncidents(incidents.map(incident => (incident.id === id ? data : incident)));
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container">
      <h2>Steward Dashboard</h2>
      <h3>All Incident Reports</h3>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <h4>{incident.title}</h4>
            <p>{incident.description}</p>
            <p>Status: {incident.status}</p>
            {incident.status !== 'closed' && (
              <div>
                <button onClick={() => handleUpdateStatus(incident.id, 'on-review')}>
                  Mark as On-Review
                </button>
                <button onClick={() => handleUpdateStatus(incident.id, 'closed')}>
                  Close
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StewardDashboard;
