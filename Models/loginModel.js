
const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,  // 'name' field to store user names
    department: String,  // 'department' field to store the department name
  }, {
    timestamps: true
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports = {User};