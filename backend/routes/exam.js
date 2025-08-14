const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Question = require('../models/Question');

// ✅ Get random questions
router.get('/start-exam', authMiddleware, async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Submit exam and grade
router.post('/submit-exam', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;

    // Check payload
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'answers object is required' });
    }

    const questionIds = Object.keys(answers); // ["64f0b2...", "64f0b3..."]
    const questions = await Question.find({ _id: { $in: questionIds } });

    let score = 0;
    questions.forEach((q) => {
      const selectedIndex = answers[q._id.toString()];
      if (selectedIndex !== undefined && q.options[selectedIndex]?.isCorrect) {
        score++;
      }
    });

    res.json({
      score,
      total: questions.length,
      percentage: ((score / questions.length) * 100).toFixed(2)
    });
  } catch (err) {
    console.error("Error grading exam:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
