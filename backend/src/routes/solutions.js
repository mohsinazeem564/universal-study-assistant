const express = require('express');
const router = express.Router();
const Solution = require('../models/Solution');

// Get solution by ID
router.get('/:solutionId', async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.solutionId)
      .populate('problemId');

    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }

    res.json({
      success: true,
      solution
    });

  } catch (error) {
    console.error('Solution fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch solution' });
  }
});

// Rate solution (helpful/not helpful)
router.post('/:solutionId/rate', async (req, res) => {
  try {
    const { helpful } = req.body;
    const solution = await Solution.findById(req.params.solutionId);

    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }

    // Update problem rating
    const Problem = require('../models/Problem');
    const problem = await Problem.findById(solution.problemId);
    
    if (helpful) {
      problem.helpful += 1;
    } else {
      problem.notHelpful += 1;
    }
    
    await problem.save();

    res.json({
      success: true,
      helpful: problem.helpful,
      notHelpful: problem.notHelpful
    });

  } catch (error) {
    console.error('Rating error:', error);
    res.status(500).json({ error: 'Failed to rate solution' });
  }
});

// Get popular solutions
router.get('/popular', async (req, res) => {
  try {
    const { subject, limit = 10 } = req.query;

    const Problem = require('../models/Problem');
    const query = subject ? { subject } : {};

    const problems = await Problem.find(query)
      .sort({ helpful: -1, views: -1 })
      .limit(parseInt(limit));

    const solutions = await Solution.find({
      problemId: { $in: problems.map(p => p._id) }
    }).populate('problemId');

    res.json({
      success: true,
      solutions
    });

  } catch (error) {
    console.error('Popular solutions error:', error);
    res.status(500).json({ error: 'Failed to fetch popular solutions' });
  }
});

module.exports = router;
