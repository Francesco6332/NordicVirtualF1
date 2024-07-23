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
import MainPage from './pages/MainPage/MainPage';
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {token ? (
          <>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/news" element={<PrivateRoute Component={NewsPage} />} />
            <Route path="/standings" element={<PrivateRoute Component={StandingsPage} />} />
            <Route path="/calendar" element={<PrivateRoute Component={CalendarPage} />} />
            <Route path="/report-incident" element={role === 'driver' ? <PrivateRoute Component={IncidentReporting} /> : <Navigate to="/login" />} />
            <Route path="/driver-dashboard" element={role === 'driver' ? <PrivateRoute Component={DriverDashboard} /> : <Navigate to="/login" />} />
            <Route path="/steward-dashboard" element={role === 'steward' ? <PrivateRoute Component={StewardsDashboard} /> : <Navigate to="/login" />} />
          </>
        ) : (
          <Route path="/" element={<HomePage />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
