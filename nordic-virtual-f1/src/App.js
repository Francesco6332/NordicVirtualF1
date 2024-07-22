import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NewsPage from './pages/NewsPage/NewsPage';
import StandingsPage from './pages/StandingsPage/StandingsPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import IncidentReporting from './pages/IncidentReporting/IncidentReporting';
import DriverDashboard from './pages/DriverDashboard/DriverDashboard';
import StewardsDashboard from './pages/StewardsDashboard/StewardsDashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import Register from './pages/Register/Register';
import NavBar from './components/Navbar/NavBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <div className="App">
      {token && <NavBar />}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={Register} />
        <Route path="/news" element={<PrivateRoute element={NewsPage} />} />
        <Route path="/standings" element={<PrivateRoute element={StandingsPage} />} />
        <Route path="/calendar" element={<PrivateRoute element={CalendarPage} />} />
        <Route path="/report-incident" element={token && role === 'driver' ? <PrivateRoute element={IncidentReporting} /> : <Navigate to="/login" />} />
        <Route path="/driver-dashboard" element={token && role === 'driver' ? <PrivateRoute element={DriverDashboard} /> : <Navigate to="/login" />} />
        <Route path="/steward-dashboard" element={token && role === 'steward' ? <PrivateRoute element={StewardsDashboard} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
