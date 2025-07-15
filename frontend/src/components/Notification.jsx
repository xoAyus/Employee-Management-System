import React from 'react';

export default function Notification({ message, type = 'info', onClose }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        background: type === 'error' ? '#f44336' : '#4caf50',
        color: '#fff',
        padding: '1rem 2rem',
        borderRadius: 8,
        zIndex: 1000,
        minWidth: 200,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
}
