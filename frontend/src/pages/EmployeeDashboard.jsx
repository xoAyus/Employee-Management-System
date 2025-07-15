import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, Typography, Box, Grid, Avatar, Button, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get('/employees/profile/me', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfile(res.data);
      setLoading(false);
    };
    fetchProfile();
  }, [user.token]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
          borderRadius: 4,
          p: 4,
          mb: 4,
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar sx={{ width: 72, height: 72, bgcolor: 'secondary.main', fontSize: 36 }}>
              {profile?.name?.[0]}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Welcome back, {profile?.name}!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              {profile?.email}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" size="large" sx={{ boxShadow: 2 }}>
              Apply for Leave
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#fff' }}>
              <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h5" color="primary" sx={{ mt: 1 }}>12</Typography>
              <Typography color="text.secondary">Leaves Taken This Year</Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#fff' }}>
              <EventAvailableIcon color="secondary" sx={{ fontSize: 40 }} />
              <Typography variant="h5" color="secondary" sx={{ mt: 1 }}>5</Typography>
              <Typography color="text.secondary">Upcoming Holidays</Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#fff' }}>
              <AnnouncementIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h5" color="primary" sx={{ mt: 1 }}>3</Typography>
              <Typography color="text.secondary">Unread Announcements</Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}