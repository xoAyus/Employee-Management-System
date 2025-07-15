const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  assignRole,
  getProfile,
  updateProfile,
  changePassword,
  getEmployeeCount,
} = require('../controllers/employeeController');
const { protect, admin } = require('../middleware/auth');

// Admin routes
router.route('/').get(protect, admin, getAllEmployees).post(protect, admin, addEmployee);
router
  .route('/:id')
  .get(protect, admin, getEmployeeById)
  .put(protect, admin, updateEmployee)
  .delete(protect, admin, deleteEmployee);
router.route('/:id/assign-role').put(protect, admin, assignRole);

// Employee routes
router.route('/profile/me').get(protect, getProfile).put(protect, updateProfile);
router.route('/profile/change-password').put(protect, changePassword);

router.get('/dashboard/employee-count', protect, admin, getEmployeeCount);

module.exports = router; 