import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Notification from '../components/Notification';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  Card, CardContent, Typography, Box, Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Grid
} from '@mui/material';

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [notification, setNotification] = useState({ message: '', type: 'info' });
  const [confirm, setConfirm] = useState({ open: false, onConfirm: null, message: '' });

  const fetchLeaves = async () => {
    let url = '/leave/all';
    const params = [];
    if (filter) params.push(`employee=${encodeURIComponent(filter)}`);
    if (statusFilter) params.push(`status=${encodeURIComponent(statusFilter)}`);
    if (params.length) url += '?' + params.join('&');
    const res = await api.get(url);
    setLeaves(res.data);
  };

  useEffect(() => { fetchLeaves(); }, [filter, statusFilter]);

  const handleStatus = (id, status) => {
    setConfirm({
      open: true,
      message: `Are you sure you want to ${status} this leave request?`,
      onConfirm: async () => {
        await api.put(`/leave/${id}/status`, { status });
        setNotification({ message: `Status updated to ${status}!`, type: 'info' });
        setConfirm({ open: false });
        fetchLeaves();
      }
    });
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>Leave Management</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                label="Filter by employee name/email"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                displayEmpty
                fullWidth
                size="small"
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map(l => (
              <TableRow key={l._id}>
                <TableCell>{l.user?.name}</TableCell>
                <TableCell>{l.startDate.slice(0,10)}</TableCell>
                <TableCell>{l.endDate.slice(0,10)}</TableCell>
                <TableCell>{l.reason}</TableCell>
                <TableCell>{l.status}</TableCell>
                <TableCell align="right">
                  {l.status === 'pending' && (
                    <>
                      <Button variant="outlined" color="success" size="small" onClick={() => handleStatus(l._id, 'approved')}>Approve</Button>
                      <Button variant="outlined" color="error" size="small" onClick={() => handleStatus(l._id, 'rejected')} sx={{ ml: 1 }}>Reject</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'info' })}
      />
      <ConfirmDialog
        open={confirm.open}
        message={confirm.message}
        onCancel={() => setConfirm({ open: false })}
        onConfirm={confirm.onConfirm}
      />
    </Box>
  );
}
