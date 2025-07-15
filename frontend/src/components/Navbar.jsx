import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null; // Hide navbar if not logged in

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: '#222',
      color: '#fff',
      marginBottom: '2rem'
    }}>
      <div>
        <Link to={user.role === 'admin' ? '/admin' : '/employee'} style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>
          Dashboard
        </Link>
        {user.role === 'admin' && (
          <>
            <Link to="/employees" style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>
              Employees
            </Link>
            <Link to="/leave-management" style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>
              Leave Management
            </Link>
          </>
        )}
        {(user.role === 'user' || user.role === 'employee') && (
          <Link to="/leave-requests" style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>
            Leave Requests
          </Link>
        )}
        <Link to="/announcements" style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>
          Announcements
        </Link>
        <Link to="/profile" style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>
          Profile
        </Link>
      </div>
      <button onClick={handleLogout} style={{ background: '#fff', color: '#222', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Logout
      </button>
    </nav>
  );
}
