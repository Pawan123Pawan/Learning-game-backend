const slugify = require("slugify");
const Question = require("../models/questionModel");

// create a question
const createQuestionController = async (req, res) => {
  try {
    const { name, ans, data, category } = req.body;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !ans:
        return res.status(500).send({ error: "Ans is Required" });
      case !data:
        return res.status(500).send({ error: "Data is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
    }

    const question = new Question({
      name,
      ans,
      data,
      category,
      slug: slugify(name),
    });
    await question.save();
    res.status(201).send({
      success: true,
      message: "Question Created Successfully",
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating question",
    });
  }
};

// get all questions according to user
const getQuestionController = async (req, res) => {
  // console.log(req.params.name);
  try {
    const question = await Question.find({ category: req.params.name });
    if (!question) {
      res.status(404).send({
        success: false,
        message: "Error in getting",
      });
    }
    res.status(200).send({
      success: true,
      message: "Question Fetched",
      question,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Eror while getitng  question",
      error,
    });
  }
};

const checkQuestionController = async (req, res) => {
  try {
    // console.log(req.params.pid)
    const question = await Question.findById(req.params.qid);
    if (!question) {
      res.status(404).send({
        success: false,
        message: "ans not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "ok",
      ans: question.ans,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createQuestionController,
  getQuestionController,
  checkQuestionController,
};
