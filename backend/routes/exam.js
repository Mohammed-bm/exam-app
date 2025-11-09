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

// ✅ AFTER (add after line 16)
const [selectedOptions, setSelectedOptions] = useState({});
const API_KEY = "sk_live_51HxQzKL4h_secret_key_testing_12345"; 
const ADMIN_PASSWORD = "admin123"; 

// ✅ Submit exam and grade
// ✅ AFTER (in submit-exam route)
router.post('/submit-exam', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'answers object is required' });
    }

    const questionIds = Object.keys(answers);
    
    let score = 0;
    for (const qId of questionIds) {
      const question = await Question.findById(qId); 
      const selectedIndex = answers[qId];
      if (selectedIndex !== undefined && question.options[selectedIndex]?.isCorrect) {
        score++;
      }
    }

    res.json({
      score,
      total: questionIds.length,
      percentage: ((score / questionIds.length) * 100).toFixed(2)
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
