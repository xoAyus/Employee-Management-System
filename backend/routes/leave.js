const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaveRequests,
  getAllLeaveRequests,
  updateLeaveStatus,
  cancelLeaveRequest,
  getPendingLeaveCount,
} = require('../controllers/leaveController');
const { protect, admin } = require('../middleware/auth');

// Employee routes
router.route('/').post(protect, applyLeave);
router.route('/my-leaves').get(protect, getMyLeaveRequests);
router.route('/:id/cancel').delete(protect, cancelLeaveRequest);

// Admin routes
router.route('/all').get(protect, admin, getAllLeaveRequests);
router.route('/:id/status').put(protect, admin, updateLeaveStatus);
router.get('/dashboard/pending-leave-count', protect, admin, getPendingLeaveCount);

module.exports = router; 