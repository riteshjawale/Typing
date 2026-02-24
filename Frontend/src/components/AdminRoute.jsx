import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase();

const AdminRoute = ({ children }) => {
  const { initialized, isAuthenticated, user } = useSelector((state) => state.auth);

  if (!initialized) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userEmail = (user?.email || '').toLowerCase();
  if (!ADMIN_EMAIL || userEmail !== ADMIN_EMAIL) {
    return <Navigate to="/home-page" replace />;
  }

  return children;
};

export default AdminRoute;
