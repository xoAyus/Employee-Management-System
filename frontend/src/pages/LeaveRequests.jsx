import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, CardContent, Typography, Box, Grid, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';

export default function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/leave/my-leaves').then(res => setLeaves(res.data));
  }, []);

  const applyLeave = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      await api.post('/leave', { startDate, endDate, reason });
      setReason(''); setStartDate(''); setEndDate('');
      setMsg('Leave request submitted!');
      const res = await api.get('/leave/my-leaves');
      setLeaves(res.data);
    } catch (err) {
      setError('Failed to apply for leave');
    }
  };

  const cancelLeave = async (id) => {
    await api.delete(`/leave/${id}/cancel`);
    setLeaves(leaves => leaves.filter(l => l._id !== id));
    setMsg('Leave request cancelled!');
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>Leave Requests</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Apply for Leave</Typography>
              <form onSubmit={applyLeave}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  label="Reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Apply</Button>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {msg && <Alert severity="success" sx={{ mt: 2 }}>{msg}</Alert>}
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>My Leave Requests</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Start</TableCell>
                      <TableCell>End</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaves.map(l => (
                      <TableRow key={l._id}>
                        <TableCell>{l.startDate.slice(0,10)}</TableCell>
                        <TableCell>{l.endDate.slice(0,10)}</TableCell>
                        <TableCell>{l.reason}</TableCell>
                        <TableCell>{l.status}</TableCell>
                        <TableCell>
                          {l.status === 'pending' && (
                            <Button color="error" onClick={() => cancelLeave(l._id)} size="small">Cancel</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}