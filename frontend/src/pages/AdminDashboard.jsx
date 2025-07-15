import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, Typography, Box, Grid, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ employees: 0, pendingLeaves: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      const [empRes, leaveRes] = await Promise.all([
        api.get('/employees/dashboard/employee-count', {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
        api.get('/leave/dashboard/pending-leave-count', {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
      ]);
      setCounts({
        employees: empRes.data.total,
        pendingLeaves: leaveRes.data.pending,
      });
      setLoading(false);
    };
    fetchCounts();
  }, [user.token]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 800 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#fff' }}>
              <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" color="primary" sx={{ mt: 1 }}>{counts.employees}</Typography>
              <Typography color="text.secondary">Total Employees</Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#fff' }}>
              <EventNoteIcon color="secondary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" color="secondary" sx={{ mt: 1 }}>{counts.pendingLeaves}</Typography>
              <Typography color="text.secondary">Pending Leave Requests</Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}