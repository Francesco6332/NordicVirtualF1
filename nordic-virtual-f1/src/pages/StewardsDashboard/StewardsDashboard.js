import React, { useEffect, useState } from 'react';

function StewardsDashboard() {
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

  const handleUpdate = async (id, status) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8000/api/incidents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const updatedIncidents = incidents.map((incident) =>
      incident.id === id ? { ...incident, status } : incident
    );
    setIncidents(updatedIncidents);
  };

  return (
    <div className="dashboard">
      <h1>Steward Dashboard</h1>
      <h2>All Incidents</h2>
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
