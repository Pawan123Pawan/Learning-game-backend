const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSetPorformance = new Schema({
  name: {
    type: String,
    required: true,
  },
  ansNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const userPorformance = mongoose.model("UserPorformance", userSetPorformance);
module.exports = userPorformance;
