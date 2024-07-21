// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import DriverDashboard from './pages/DriverDashboard/DriverDashboard';
import StewardDashboard from './pages/StewardsDashboard/StewardsDashboard';
import IncidentReporting from './pages/IncidentReporting/IncidentReporting';
import NewsPage from './pages/NewsPage/NewsPage';
import StandingsPage from './pages/StandingsPage/StandingsPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Navbar from './components/Navbar/NavBar';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/driver-dashboard"
            element={
              <PrivateRoute>
                <DriverDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/steward-dashboard"
            element={
              <PrivateRoute>
                <StewardDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/report-incident"
            element={
              <PrivateRoute>
                <IncidentReporting />
              </PrivateRoute>
            }
          />
          <Route
            path="/news"
            element={
              <PrivateRoute>
                <NewsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/standings"
            element={
              <PrivateRoute>
                <StandingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <CalendarPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
