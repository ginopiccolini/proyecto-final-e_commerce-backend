// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    // Agrega más campos según tu necesidad
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
