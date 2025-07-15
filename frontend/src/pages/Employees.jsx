import React, { useEffect, useState } from 'react';
import api from '../services/api';
import EmployeeModal from '../components/EmployeeModal';
import Notification from '../components/Notification';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  Card, CardContent, Typography, Box, Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Grid, Chip
} from '@mui/material';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: '', type: 'info' });
  const [confirm, setConfirm] = useState({ open: false, onConfirm: null, message: '' });

  const roleOptions = [
    { value: 'user', label: 'Employee', color: 'info' },
    { value: 'admin', label: 'Admin', color: 'primary' }
  ];

  const fetchEmployees = async () => {
    const res = await api.get('/employees');
    setEmployees(res.data);
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleAdd = () => { setEditEmp(null); setModalOpen(true); };
  const handleEdit = (emp) => { setEditEmp(emp); setModalOpen(true); };

  const handleSave = async (data) => {
    try {
      if (editEmp) {
        await api.put(`/employees/${editEmp._id}`, data);
        setNotification({ message: 'Employee updated!', type: 'info' });
      } else {
        await api.post('/employees', data);
        setNotification({ message: 'Employee added!', type: 'info' });
      }
      setModalOpen(false);
      fetchEmployees();
    } catch {
      setNotification({ message: 'Error saving employee', type: 'error' });
    }
  };

  const handleDelete = (id) => {
    setConfirm({
      open: true,
      message: 'Delete this employee?',
      onConfirm: async () => {
        await api.delete(`/employees/${id}`);
        setNotification({ message: 'Employee deleted!', type: 'info' });
        setConfirm({ open: false });
        fetchEmployees();
      }
    });
  };

  const handleRole = async (emp, role) => {
    await api.put(`/employees/${emp._id}/assign-role`, { role });
    setNotification({ message: 'Role updated!', type: 'info' });
    fetchEmployees();
  };

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(filter.toLowerCase()) ||
    e.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>Employees</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleAdd}>Add Employee</Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Filter by name or email"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(e => (
              <TableRow key={e._id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label={roleOptions.find(opt => opt.value === e.role)?.label || e.role}
                      color={roleOptions.find(opt => opt.value === e.role)?.color || 'default'}
                      variant="outlined"
                      sx={{ fontWeight: 600, mr: 1, minWidth: 80 }}
                    />
                    <Select
                      value={e.role}
                      onChange={ev => handleRole(e, ev.target.value)}
                      size="small"
                      sx={{
                        minWidth: 90,
                        bgcolor: roleOptions.find(opt => opt.value === e.role)?.color === 'primary' ? 'primary.light' : 'info.light',
                        color: '#fff',
                        fontWeight: 600,
                        borderRadius: 2,
                        '.MuiSelect-select': { padding: '6px 16px' }
                      }}
                    >
                      {roleOptions.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="secondary" size="small" onClick={() => handleEdit(e)}>Edit</Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(e._id)} sx={{ ml: 1 }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EmployeeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editEmp}
      />
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
