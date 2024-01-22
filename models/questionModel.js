const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
  name: String,
  ans: String,
  category: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    default: [],
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
