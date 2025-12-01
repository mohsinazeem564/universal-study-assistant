const express = require('express');
const router = express.Router();
const diagramGenerator = require('../services/diagramGenerator');

// Generate diagram
router.post('/generate', async (req, res) => {
  try {
    const { type, data, subject } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: 'Type and data are required' });
    }

    const diagram = await diagramGenerator.generateDiagram(type, data, subject);

    res.json({
      success: true,
      diagram
    });

  } catch (error) {
    console.error('Diagram generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate diagram',
      message: error.message 
    });
  }
});

// Generate math visualization
router.post('/math', async (req, res) => {
  try {
    const { equation } = req.body;

    if (!equation) {
      return res.status(400).json({ error: 'Equation is required' });
    }

    const diagram = await diagramGenerator.generateMathVisualization(equation);

    res.json({
      success: true,
      diagram
    });

  } catch (error) {
    console.error('Math visualization error:', error);
    res.status(500).json({ error: 'Failed to generate math visualization' });
  }
});

// Generate timeline
router.post('/timeline', async (req, res) => {
  try {
    const { events } = req.body;

    if (!events || !events.items) {
      return res.status(400).json({ error: 'Events data is required' });
    }

    const diagram = await diagramGenerator.generateTimeline(events);

    res.json({
      success: true,
      diagram
    });

  } catch (error) {
    console.error('Timeline generation error:', error);
    res.status(500).json({ error: 'Failed to generate timeline' });
  }
});

// Generate mind map
router.post('/mindmap', async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !data.central || !data.branches) {
      return res.status(400).json({ error: 'Mind map data is required' });
    }

    const diagram = await diagramGenerator.generateMindMap(data);

    res.json({
      success: true,
      diagram
    });

  } catch (error) {
    console.error('Mind map generation error:', error);
    res.status(500).json({ error: 'Failed to generate mind map' });
  }
});

module.exports = router;
