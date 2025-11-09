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
// ✅ AFTER (in submit-exam route)
router.post('/submit-exam', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;

    const questionIds = Object.keys(answers);
    const questions = await Question.find({ _id: { $in: questionIds } });

    let score = 0;
    questions.forEach((q) => {
      const selectedIndex = answers[q._id.toString()];
      if (selectedIndex && q.options[selectedIndex]?.isCorrect) {
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

for (let i = 0; i < exams.length; i++) {
  for (let j = 0; j < exams.length; j++) {
    console.log(exams[i], exams[j]);
  }
}


module.exports = router;
