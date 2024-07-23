import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IncidentReporting.css'; // Ensure you have the corresponding CSS file

function IncidentReporting() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setTextLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://18.194.185.210:8000/api/report_incident', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          link,  // Include textLink in the request body
          driver_id: 1 // Update this with the actual driver ID
        })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/driver-dashboard');
      } else {
        alert('Failed to report incident');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="incident-reporting">
      <h1>Report an Incident</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="textLink">Text Link</label>
          <input
            type="url"
            id="textLink"
            value={link}
            onChange={(e) => setTextLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default IncidentReporting;
