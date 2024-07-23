import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Ensure you have the corresponding CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      // Fetch the user role to decide the redirection
      const userResponse = await fetch('http://18.194.185.210:8000/users/me', {
        headers: { Authorization: `Bearer ${data.access_token}` }
      });
      const userData = await userResponse.json();
      localStorage.setItem('role', userData.role);

      navigate('/main'); // Redirect to the main page or any dashboard page
    } catch (err) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
      
      <div className="register-button-container">
        <button className="to-register-button" type="button" onClick={() => navigate('/register')}>Go to Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
