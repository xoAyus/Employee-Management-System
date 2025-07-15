const Leave = require('../models/Leave');

// Employee: Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const leave = await Leave.create({
      user: req.user.id,
      startDate,
      endDate,
      reason,
    });
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Employee: Get their own leave requests
exports.getMyLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find({ user: req.user.id });
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Get all leave requests (with filtering)
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const { status, employee, startDate, endDate } = req.query;
    let query = {};
    if (status) query.status = status;
    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) query.startDate.$gte = new Date(startDate);
      if (endDate) query.startDate.$lte = new Date(endDate);
    }
    let leaveQuery = Leave.find(query).populate('user', 'name email');
    // Filter by employee name or email (case-insensitive)
    if (employee) {
      leaveQuery = leaveQuery.where('user').populate({
        path: 'user',
        match: {
          $or: [
            { name: { $regex: employee, $options: 'i' } },
            { email: { $regex: employee, $options: 'i' } }
          ]
        },
        select: 'name email'
      });
    }
    let leaveRequests = await leaveQuery.exec();
    // If filtering by employee, remove null users (no match)
    if (employee) {
      leaveRequests = leaveRequests.filter(l => l.user);
    }
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Get count of pending leave requests
exports.getPendingLeaveCount = async (req, res) => {
  try {
    const count = await Leave.countDocuments({ status: 'pending' });
    res.json({ pending: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update leave request status
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Employee: Cancel a leave request
exports.cancelLeaveRequest = async (req, res) => {
  try {
    const leave = await Leave.findOne({ _id: req.params.id, user: req.user.id });

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending requests can be cancelled' });
    }

    await leave.remove();
    res.json({ message: 'Leave request cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 