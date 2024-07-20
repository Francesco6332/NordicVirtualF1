// frontend/src/pages/IncidentReporting.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function IncidentReporting() {
  const [incident, setIncident] = useState('');
  const [status, setStatus] = useState('Aperto');
  const [title, setTitle] = useState('');
  const [submittedIncidents, setSubmittedIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch incidents when the component mounts
    fetch('http://127.0.0.1:8000/api/incidents', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setSubmittedIncidents(data);
      })
      .catch(error => {
        console.error('Error fetching incidents:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/report_incident', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description: incident, status }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Incident reported:', data);
        // Optionally, update the list of incidents
        setSubmittedIncidents([...submittedIncidents, data]);
        setIncident('');
        setTitle('');
        setStatus('Aperto');
      })
      .catch(error => {
        console.error('Error reporting incident:', error);
      });
  };

  return (
    <div className="incident-reporting">
      <h2>Report an Incident</h2>
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
            required
          >
            <option value="Aperto">Opened</option>
            <option value="In Review">On Review</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit Report</button>
      </form>
      <div className="submitted-incidents">
        <h3>Submitted Incidents</h3>
        <ul>
          {submittedIncidents.map((incident) => (
            <li key={incident.id}>
              <strong>{incident.title}</strong>: {incident.description} (Status: {incident.status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IncidentReporting;
