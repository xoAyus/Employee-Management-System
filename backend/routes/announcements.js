const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
} = require('../controllers/announcementController');
const { protect, admin } = require('../middleware/auth');

// Admin: Create announcement
router.post('/', protect, admin, createAnnouncement);

// All users: Get all announcements
router.get('/', protect, getAnnouncements);

module.exports = router; 