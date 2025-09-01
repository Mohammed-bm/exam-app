const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Day 10 test: added for AI inline comment
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);

    // Day 10 test: error handling log
    process.exit(1);
  }
};

module.exports = connectDB;
