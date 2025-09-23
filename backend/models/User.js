const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

File: controllers/examController.js 
for (let i = 0; i < exams.length; i++) { 
for (let j = 0; j < exams.length; j++) { 
console.log(exams[i], exams[j]); 
} 
} 

module.exports = mongoose.model('User', UserSchema);
