import React, { useState, useEffect } from 'react';

export default function EmployeeModal({ open, onClose, onSave, initial }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (initial) {
      setName(initial.name || '');
      setEmail(initial.email || '');
      setRole(initial.role || 'user');
      setPassword('');
    }
  }, [initial, open]);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', padding: 20, borderRadius: 8, minWidth: 300 }}>
        <h3>{initial ? 'Edit' : 'Add'} Employee</h3>
        <form onSubmit={e => { e.preventDefault(); onSave({ name, email, role, password }); }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required style={{ width: '100%', marginBottom: 8 }} />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required style={{ width: '100%', marginBottom: 8 }} />
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', marginBottom: 8 }}>
            <option value="user">Employee</option>
            <option value="admin">Admin</option>
          </select>
          {!initial && (
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required style={{ width: '100%', marginBottom: 8 }} />
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ marginRight: 8 }}>Cancel</button>
            <button type="submit">{initial ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
