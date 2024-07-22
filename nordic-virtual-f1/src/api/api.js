import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = (username, password) => {
  return axios.post(`${API_URL}/token`, { username, password });
};

export const fetchCalendar = () => {
  return axios.get(`${API_URL}/api/calendar`);
};

export const fetchStandings = () => {
  return axios.get(`${API_URL}/api/standings`);
};

export const reportIncident = (incidentData, token) => {
  return axios.post(`${API_URL}/api/report_incident`, incidentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchIncidents = (token) => {
  return axios.get(`${API_URL}/api/incidents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateIncident = (incidentId, incidentData, token) => {
  return axios.put(`${API_URL}/api/incidents/${incidentId}`, incidentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
