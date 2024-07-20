// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaNewspaper, FaTachometerAlt, FaCalendarAlt, FaExclamationTriangle, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './NavBar.css';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Nordic F1</Link>
        <ul className={`navbar-list ${isNavOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link"><FaHome className="icon"/> Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/news" className="navbar-link"><FaNewspaper className="icon"/> News</Link>
          </li>
          <li className="navbar-item">
            <Link to="/standings" className="navbar-link"><FaTachometerAlt className="icon"/> Standings</Link>
          </li>
          <li className="navbar-item">
            <Link to="/calendar" className="navbar-link"><FaCalendarAlt className="icon"/> Calendar</Link>
          </li>
          <li className="navbar-item">
            <Link to="/report-incident" className="navbar-link"><FaExclamationTriangle className="icon"/> Report Incident</Link>
          </li>
          <li className="navbar-item">
            <Link to="/driver-dashboard" className="navbar-link"><FaUserCircle className="icon"/> Driver Dashboard</Link>
          </li>
          <li className="navbar-item">
            <Link to="/steward-dashboard" className="navbar-link"><FaUserCircle className="icon"/> Steward Dashboard</Link>
          </li>
          <li className="navbar-item">
            <button onClick={handleLogout} className="logout-button"><FaSignOutAlt className="icon"/> Logout</button>
          </li>
        </ul>
        <div className="nav-toggle" onClick={handleToggle}>
          <span className="nav-toggle-icon"></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
