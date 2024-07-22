// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faChartLine, faCalendarAlt, faFlag, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return null; // Don't render Navbar if not logged in
  }

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/news"><FontAwesomeIcon icon={faNewspaper} /> News</Link>
        </li>
        <li className="navbar-item">
         <Link to="/standings"><FontAwesomeIcon icon={faChartLine} /> Standings</Link>
        </li> 
        <li className="navbar-item">
          <Link to="/calendar"><FontAwesomeIcon icon={faCalendarAlt} /> Calendar</Link>
        </li>
       <li className="navbar-item">
          <Link to="/report-incident"><FontAwesomeIcon icon={faFlag} /> Report Incident</Link>
        </li>
        { role === 'driver' && <li className="navbar-item">
         <Link to="/driver-dashboard"><FontAwesomeIcon icon={faUser} /> Driver Dashboard</Link>
        </li>}
        { role === 'steward' && <li className="navbar-item">
          <Link to="/steward-dashboard"><FontAwesomeIcon icon={faUser} /> Steward Dashboard</Link>
        </li> }
        <li className="navbar-item">
          <button onClick={handleLogout} className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
