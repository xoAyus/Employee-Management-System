import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, Typography, Box, TextField, Button, Grid, Alert } from '@mui/material';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [msg, setMsg] = useState('');
  const { user } = useAuth();

  const fetchAnnouncements = async () => {
    const res = await api.get('/announcements');
    setAnnouncements(res.data);
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/announcements', { title, message });
    setTitle(''); setMessage('');
    setMsg('Announcement created!');
    fetchAnnouncements();
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>Announcements</Typography>
      {user.role === 'admin' && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Create Announcement</Typography>
            <form onSubmit={handleCreate}>
              <TextField
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>Create</Button>
              {msg && <Alert severity="success" sx={{ mt: 2 }}>{msg}</Alert>}
            </form>
          </CardContent>
        </Card>
      )}
      <Grid container spacing={2}>
        {announcements.map(a => (
          <Grid item xs={12} md={6} lg={4} key={a._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="secondary">{a.title}</Typography>
                <Typography>{a.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(a.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
