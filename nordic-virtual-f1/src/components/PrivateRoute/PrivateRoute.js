import React from 'react';
import { Navigate } from 'react-router-dom';

// The PrivateRoute component now expects an element prop
const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token');
  
  // Redirect to login if there is no token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Render the element if token exists
  return <Element />;
};

export default PrivateRoute;
