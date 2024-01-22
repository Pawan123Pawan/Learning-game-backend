// models
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User-Game", userSchema);

module.exports = User;
