import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 220;

const navItems = (role) => [
  { text: 'Dashboard', icon: <DashboardIcon />, path: role === 'admin' ? '/admin' : '/employee' },
  ...(role === 'admin'
    ? [
        { text: 'Employees', icon: <PeopleIcon />, path: '/employees' },
        { text: 'Leave Management', icon: <EventNoteIcon />, path: '/leave-management' },
      ]
    : [
        { text: 'Leave Requests', icon: <EventNoteIcon />, path: '/leave-requests' },
      ]),
  { text: 'Announcements', icon: <AnnouncementIcon />, path: '/announcements' },
  { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <>{children}</>;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 2 }}>
            EMPLOYEE PORTAL
          </Typography>
          <IconButton color="inherit" onClick={() => { logout(); navigate('/login'); }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'primary.main', color: '#fff' },
        }}
      >
        <Toolbar />
        <List>
          {navItems(user.role).map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} sx={{ color: '#fff' }}>
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', p: 4 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
