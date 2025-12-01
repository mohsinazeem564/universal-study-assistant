const express = require('express');
const router = express.Router();
const aiSolver = require('../services/aiSolver');
const diagramGenerator = require('../services/diagramGenerator');
const Problem = require('../models/Problem');
const Solution = require('../models/Solution');

// Solve a problem
router.post('/solve', async (req, res) => {
  try {
    const { problem, subject, topic, difficulty, userId } = req.body;

    if (!problem || !subject) {
      return res.status(400).json({ error: 'Problem and subject are required' });
    }

    // Generate AI solution
    const solution = await aiSolver.solveProblem(
      problem,
      subject,
      topic || 'General',
      difficulty || 'medium'
    );

    // Generate diagram if needed
    let diagram = null;
    if (solution.needsDiagram) {
      try {
        diagram = await diagramGenerator.generateDiagram(
          'auto',
          { problem, solution: solution.solution },
          subject
        );
      } catch (err) {
        console.error('Diagram generation failed:', err);
      }
    }

    // Save to database
    const problemDoc = new Problem({
      text: problem,
      subject,
      topic,
      difficulty,
      userId
    });
    await problemDoc.save();

    const solutionDoc = new Solution({
      problemId: problemDoc._id,
      solution: solution.solution,
      explanation: solution.explanation,
      steps: solution.steps,
      diagram: diagram,
      keywords: solution.keywords,
      userId
    });
    await solutionDoc.save();

    res.json({
      success: true,
      problemId: problemDoc._id,
      solutionId: solutionDoc._id,
      solution: solution.solution,
      explanation: solution.explanation,
      steps: solution.steps,
      diagram: diagram,
      keywords: solution.keywords
    });

  } catch (error) {
    console.error('Problem solving error:', error);
    res.status(500).json({ 
      error: 'Failed to solve problem',
      message: error.message 
    });
  }
});

// Get problem history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, subject, topic } = req.query;

    const query = { userId };
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;

    const problems = await Problem.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('solutions');

    const count = await Problem.countDocuments(query);

    res.json({
      problems,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });

  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get specific problem with solution
router.get('/:problemId', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.problemId);
    const solution = await Solution.findOne({ problemId: req.params.problemId });

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json({
      problem,
      solution
    });

  } catch (error) {
    console.error('Problem fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch problem' });
  }
});

// Generate practice problems
router.post('/practice', async (req, res) => {
  try {
    const { subject, topic, count = 3 } = req.body;

    const practiceProblems = await aiSolver.generatePracticeProblems(
      subject,
      topic,
      count
    );

    res.json({
      success: true,
      problems: practiceProblems
    });

  } catch (error) {
    console.error('Practice generation error:', error);
    res.status(500).json({ error: 'Failed to generate practice problems' });
  }
});

// Search problems
router.get('/search', async (req, res) => {
  try {
    const { query, subject, topic, difficulty } = req.query;

    const searchQuery = {
      $text: { $search: query }
    };

    if (subject) searchQuery.subject = subject;
    if (topic) searchQuery.topic = topic;
    if (difficulty) searchQuery.difficulty = difficulty;

    const problems = await Problem.find(searchQuery)
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);

    res.json({ problems });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
