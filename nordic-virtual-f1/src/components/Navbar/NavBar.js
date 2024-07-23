import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const role = localStorage.getItem('role');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/main">Nordic Virtual F1</Link>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item"><Link to="/main">Home</Link></li>
          <li className="navbar-item"><Link to="/news">News</Link></li>
          <li className="navbar-item"><Link to="/standings">Standings</Link></li>
          <li className="navbar-item"><Link to="/calendar">Calendar</Link></li>
          {role === 'driver' && (
            <>
              <li className="navbar-item"><Link to="/report-incident">Report Incident</Link></li>
              <li className="navbar-item"><Link to="/driver-dashboard">Driver Dashboard</Link></li>
            </>
          )}
          {role === 'steward' && (
            <li className="navbar-item"><Link to="/steward-dashboard">Steward Dashboard</Link></li>
          )}
          <li className="navbar-item">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
