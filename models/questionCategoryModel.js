const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const QuestionCategory = mongoose.model(
  "QuestionCategory",
  questionCategorySchema
);
module.exports = QuestionCategory;
