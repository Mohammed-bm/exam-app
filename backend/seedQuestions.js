const mongoose = require('mongoose');
const Question = require('./models/Question');

const questions = [
  {
    questionText: "What is the capital of France?",
    options: [
      { text: "Paris", isCorrect: true },
      { text: "London", isCorrect: false },
      { text: "Berlin", isCorrect: false }
    ]
  },
  {
    questionText: "Which language runs in web browsers?",
    options: [
      { text: "Java", isCorrect: false },
      { text: "Python", isCorrect: false },
      { text: "JavaScript", isCorrect: true }
    ]
  },
  {
    questionText: "What does HTML stand for?",
    options: [
      { text: "Hypertext Markup Language", isCorrect: true },
      { text: "Hyper Transfer Markup Language", isCorrect: false },
      { text: "High-level Text Management Language", isCorrect: false }
    ]
  },
  {
    questionText: "Which of these is NOT a JavaScript framework?",
    options: [
      { text: "React", isCorrect: false },
      { text: "Angular", isCorrect: false },
      { text: "Laravel", isCorrect: true }
    ]
  },
  {
    questionText: "What is the result of 2 + 2 * 2?",
    options: [
      { text: "6", isCorrect: true },
      { text: "8", isCorrect: false },
      { text: "4", isCorrect: false }
    ]
  },
  {
    questionText: "Which protocol is used for secure web connections?",
    options: [
      { text: "HTTP", isCorrect: false },
      { text: "HTTPS", isCorrect: true },
      { text: "FTP", isCorrect: false }
    ]
  },
  {
    questionText: "What does CSS stand for?",
    options: [
      { text: "Computer Style Sheets", isCorrect: false },
      { text: "Creative Style System", isCorrect: false },
      { text: "Cascading Style Sheets", isCorrect: true }
    ]
  },
  {
    questionText: "Which of these is a NoSQL database?",
    options: [
      { text: "MySQL", isCorrect: false },
      { text: "MongoDB", isCorrect: true },
      { text: "PostgreSQL", isCorrect: false }
    ]
  },
  {
    questionText: "What is the main purpose of DNS?",
    options: [
      { text: "To encrypt web traffic", isCorrect: false },
      { text: "To translate domain names to IP addresses", isCorrect: true },
      { text: "To store website content", isCorrect: false }
    ]
  },
  {
    questionText: "Which command is used to install packages in Node.js?",
    options: [
      { text: "node install", isCorrect: false },
      { text: "npm install", isCorrect: true },
      { text: "package add", isCorrect: false }
    ]
  }
];

const seedDB = async () => {
  try {
    // Use direct connection string
    const uri = 'mongodb://127.0.0.1:27017/examapp';
    console.log("🔗 Connecting to MongoDB with URI:", uri);
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    
    console.log("✅ Connected to MongoDB");
    await Question.deleteMany({});
    console.log("🗑️ Deleted existing questions");
    await Question.insertMany(questions);
    console.log("📝 Inserted new questions");
    console.log("🎉 Database seeded successfully!");
  } catch (err) {
    console.error("❌ CRITICAL ERROR:", err.message);
    console.error("💡 Ensure MongoDB is running. Open a new terminal and run 'mongod'");
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit();
  }
};

seedDB();