import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Ensure you have the corresponding CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'driver' }), // Adjust role as needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Registration failed');
        return;
      }

      navigate('/login');
    } catch (err) {
      setError('An error occurred while registering');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit">Register</button>
      </form>
      
      <div className="home-button-container">
        <button className="back-home-button"type="button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};

export default Register;
