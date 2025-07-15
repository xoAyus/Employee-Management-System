import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import LeaveRequests from './pages/LeaveRequests';
import Announcements from './pages/Announcements';
import Profile from './pages/Profile';
import Employees from './pages/Employees';
import LeaveManagement from './pages/LeaveManagement';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* Employee routes */}
          <Route path="/employee" element={<ProtectedRoute role={["user", "employee"]}><EmployeeDashboard /></ProtectedRoute>} />
          <Route path="/leave-requests" element={<ProtectedRoute role={["user", "employee"]}><LeaveRequests /></ProtectedRoute>} />
          <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          {/* Admin routes */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute role="admin"><Employees /></ProtectedRoute>} />
          <Route path="/leave-management" element={<ProtectedRoute role="admin"><LeaveManagement /></ProtectedRoute>} />
          {/* Catch-all route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
