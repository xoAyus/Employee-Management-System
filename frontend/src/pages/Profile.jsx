import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ChangePasswordForm from '../components/ChangePasswordForm';
import { Card, CardContent, Typography, Box, TextField, Button, Alert } from '@mui/material';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/employees/profile/me').then(res => {
      setProfile(res.data);
      setName(res.data.name);
    });
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    await api.put('/employees/profile/me', { name });
    setMsg('Profile updated!');
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>Profile</Typography>
      <Card sx={{ maxWidth: 500, mb: 3 }}>
        <CardContent>
          <form onSubmit={updateProfile}>
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>Update</Button>
            {msg && <Alert severity="success" sx={{ mt: 2 }}>{msg}</Alert>}
          </form>
          <Typography sx={{ mt: 2 }}>Email: {profile.email}</Typography>
          <Typography>Role: {profile.role}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom>Change Password</Typography>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </Box>
  );
}
