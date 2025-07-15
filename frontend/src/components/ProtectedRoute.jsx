import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Log the user's role for debugging
  console.log('User object:', user);
  if (user) {
    console.log('User role:', user.role);
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow multiple roles (case-insensitive)
  if (role) {
    const allowedRoles = Array.isArray(role) ? role.map(r => r.toLowerCase()) : [role.toLowerCase()];
    const userRole = user.role ? user.role.toLowerCase() : '';
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
  }

  // Otherwise, render the children
  return children;
}
