const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const Solution = require('../models/Solution');
const User = require('../models/User');

// Get platform statistics
router.get('/platform', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProblems = await Problem.countDocuments();
    const totalSolutions = await Solution.countDocuments();

    // Most popular subjects
    const popularSubjects = await Problem.aggregate([
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Most helpful solutions
    const topSolutions = await Problem.find()
      .sort({ helpful: -1 })
      .limit(10)
      .select('text subject topic helpful');

    // Daily active users (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo },
    });

    // Problems solved per day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyProblems = await Problem.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProblems,
        totalSolutions,
        activeUsers,
        popularSubjects,
        topSolutions,
        dailyProblems,
      },
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get subject-specific analytics
router.get('/subject/:subject', async (req, res) => {
  try {
    const { subject } = req.params;

    const totalProblems = await Problem.countDocuments({ subject });

    // Topic breakdown
    const topicStats = await Problem.aggregate([
      { $match: { subject } },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Difficulty distribution
    const difficultyStats = await Problem.aggregate([
      { $match: { subject } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } },
    ]);

    // Average helpfulness
    const helpfulnessStats = await Problem.aggregate([
      { $match: { subject } },
      {
        $group: {
          _id: null,
          avgHelpful: { $avg: '$helpful' },
          totalHelpful: { $sum: '$helpful' },
          totalNotHelpful: { $sum: '$notHelpful' },
        },
      },
    ]);

    res.json({
      success: true,
      subject,
      stats: {
        totalProblems,
        topicStats,
        difficultyStats,
        helpfulnessStats: helpfulnessStats[0] || {},
      },
    });

  } catch (error) {
    console.error('Subject analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch subject analytics' });
  }
});

// Get trending topics
router.get('/trending', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const trending = await Problem.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { subject: '$subject', topic: '$topic' },
          count: { $sum: 1 },
          avgHelpful: { $avg: '$helpful' },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    res.json({
      success: true,
      trending,
      period: `${days} days`,
    });

  } catch (error) {
    console.error('Trending analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch trending topics' });
  }
});

// Get user engagement metrics
router.get('/engagement', async (req, res) => {
  try {
    // Average problems per user
    const userProblemStats = await Problem.aggregate([
      { $group: { _id: '$userId', count: { $sum: 1 } } },
      {
        $group: {
          _id: null,
          avgProblems: { $avg: '$count' },
          maxProblems: { $max: '$count' },
          minProblems: { $min: '$count' },
        },
      },
    ]);

    // Retention rate (users active in last 7 days vs last 30 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeLastWeek = await User.countDocuments({
      lastLogin: { $gte: sevenDaysAgo },
    });

    const activeLastMonth = await User.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo },
    });

    const retentionRate = activeLastMonth > 0 
      ? (activeLastWeek / activeLastMonth) * 100 
      : 0;

    res.json({
      success: true,
      engagement: {
        userProblemStats: userProblemStats[0] || {},
        activeLastWeek,
        activeLastMonth,
        retentionRate: retentionRate.toFixed(2) + '%',
      },
    });

  } catch (error) {
    console.error('Engagement analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch engagement metrics' });
  }
});

module.exports = router;
