import React, { useEffect, useState } from 'react';
import './DriverDashboard.css';

function DriverDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://ec2-18-194-185-210.eu-central-1.compute.amazonaws.com:8000/api/incidents', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch incidents');
        }

        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Driver Dashboard</h1>
      <h2>My Incidents</h2>
      {incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id}>
              <h3>{incident.title}</h3>
              <p>{incident.description}</p>
              <p>Status: {incident.status}</p>
              {incident.link && <p><a href={incident.link} target="_blank" rel="noopener noreferrer">View Details</a></p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DriverDashboard;
