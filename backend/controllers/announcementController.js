const Announcement = require('../models/Announcement');

// Admin: Create announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = await Announcement.create({
      title,
      message,
      createdBy: req.user.id,
    });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// All users: Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 