import React, { useEffect, useState } from 'react';

import './StewardsDashboard.css';

function StewardsDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/incidents', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
      } else {
        console.error('Failed to fetch incidents');
      }
    };

    fetchIncidents();
  }, []);

  const handleUpdate = async (id, status) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://ec2-18-194-185-210.eu-central-1.compute.amazonaws.com:8000/api/incidents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ 
        description: '', // Assuming you are not changing the description, or provide a value if needed
        status 
      })
    });
  
    if (response.ok) {
      const updatedIncident = await response.json();
      const updatedIncidents = incidents.map((incident) =>
        incident.id === id ? updatedIncident : incident
      );
      setIncidents(updatedIncidents);
      setNotification('Incident status updated successfully!');
    } else {
      console.error('Failed to update incident');
      setNotification('Failed to update incident.');
    }
  };
  

  return (
    <div className="dashboard">
      <h1>Steward Dashboard</h1>
      <h2>All Incidents</h2>
      {notification && <p className="notification">{notification}</p>}
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <h3>{incident.title}</h3>
            <p>{incident.description}</p>
            <p>Status: {incident.status}</p>
            {incident.status !== 'closed' && (
              <button onClick={() => handleUpdate(incident.id, 'closed')}>Close</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StewardsDashboard;
