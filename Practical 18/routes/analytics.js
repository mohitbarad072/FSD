const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Task statistics
    const taskStats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Priority distribution
    const priorityStats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Tasks completed in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentCompletions = await Task.aggregate([
      {
        $match: {
          user: userId,
          status: 'completed',
          completedAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$completedAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Project statistics
    const projectStats = await Project.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Time tracking (if implemented)
    const timeStats = await Task.aggregate([
      { $match: { user: userId, actualTime: { $gt: 0 } } },
      {
        $group: {
          _id: null,
          totalTime: { $sum: '$actualTime' },
          avgTime: { $avg: '$actualTime' }
        }
      }
    ]);

    res.json({
      success: true,
      analytics: {
        tasks: {
          byStatus: taskStats,
          byPriority: priorityStats,
          recentCompletions
        },
        projects: {
          byStatus: projectStats
        },
        time: timeStats[0] || { totalTime: 0, avgTime: 0 }
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/productivity
// @desc    Get productivity trends
// @access  Private
router.get('/productivity', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = '30' } = req.query;
    const days = parseInt(period);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Daily productivity data
    const dailyData = await Task.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          created: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Weekly productivity data
    const weeklyData = await Task.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            week: { $week: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          created: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
            }
          }
        }
      },
      { $sort: { '_id.year': 1, '_id.week': 1 } }
    ]);

    res.json({
      success: true,
      productivity: {
        daily: dailyData,
        weekly: weeklyData
      }
    });
  } catch (error) {
    console.error('Get productivity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
