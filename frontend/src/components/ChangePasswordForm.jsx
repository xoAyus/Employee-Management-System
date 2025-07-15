import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Alert } from '@mui/material';

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = async (e) => {
    e.preventDefault();
    await api.put('/employees/profile/change-password', { oldPassword, newPassword });
    setMsg('Password changed!');
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <form onSubmit={handleChange}>
      <TextField
        label="Old Password"
        type="password"
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>Change Password</Button>
      {msg && <Alert severity="success" sx={{ mt: 2 }}>{msg}</Alert>}
    </form>
  );
}
