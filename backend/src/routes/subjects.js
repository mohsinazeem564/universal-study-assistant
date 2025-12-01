const express = require('express');
const router = express.Router();
const subjects = require('../config/subjects');

// Get all subjects
router.get('/', (req, res) => {
  res.json({
    success: true,
    subjects: subjects
  });
});

// Get subjects by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryData = subjects[category];

  if (!categoryData) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json({
    success: true,
    category,
    subjects: categoryData
  });
});

// Get topics for a subject
router.get('/:category/:subject', (req, res) => {
  const { category, subject } = req.params;
  
  const categoryData = subjects[category];
  if (!categoryData) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const subjectData = categoryData[subject];
  if (!subjectData) {
    return res.status(404).json({ error: 'Subject not found' });
  }

  res.json({
    success: true,
    category,
    subject,
    topics: subjectData.topics
  });
});

// Search subjects and topics
router.get('/search', (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query required' });
  }

  const results = [];
  const searchTerm = query.toLowerCase();

  Object.entries(subjects).forEach(([category, categoryData]) => {
    Object.entries(categoryData).forEach(([subject, subjectData]) => {
      if (subject.toLowerCase().includes(searchTerm)) {
        results.push({
          category,
          subject,
          topics: subjectData.topics,
          match: 'subject'
        });
      } else {
        const matchingTopics = subjectData.topics.filter(topic =>
          topic.toLowerCase().includes(searchTerm)
        );
        
        if (matchingTopics.length > 0) {
          results.push({
            category,
            subject,
            topics: matchingTopics,
            match: 'topic'
          });
        }
      }
    });
  });

  res.json({
    success: true,
    query,
    results,
    count: results.length
  });
});

// Get subject statistics
router.get('/stats', (req, res) => {
  let totalSubjects = 0;
  let totalTopics = 0;
  const categories = Object.keys(subjects);

  Object.values(subjects).forEach(category => {
    totalSubjects += Object.keys(category).length;
    Object.values(category).forEach(subject => {
      totalTopics += subject.topics.length;
    });
  });

  res.json({
    success: true,
    stats: {
      categories: categories.length,
      subjects: totalSubjects,
      topics: totalTopics,
      categoryList: categories
    }
  });
});

module.exports = router;
