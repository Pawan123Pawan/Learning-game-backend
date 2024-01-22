const slugify = require("slugify");
const QuestionCategory = require("../models/questionCategoryModel");

const createQuestionController = async (req, res) => {
  try {
    const { name } = await req.body;
    if (!name) {
      return res
        .status(401)
        .send({ success: false, message: "Name is required" });
    }
    const existingCategory = await QuestionCategory.findOne({ name: name });
    if (existingCategory) {
      return res
        .status(201)
        .send({ success: false, message: "Category already exists" });
    }
    const category = await new QuestionCategory({
      name,
      slug: slugify(name) || name,
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    res.status(500).send({ success: false, error, message: "Category error" });
  }
};

// update controller
const questionUpdateController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await QuestionCategory.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: " Question category Updated Successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Update Question Category error",
    });
  }
};

//get question category controllers
const getQuestionController = async (req, res) => {
  try {
    const category = await QuestionCategory.find({});
    if (!category) {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All categories listed successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Get Category error" });
  }
};

// delete a category contoller
const deleteQuestionController = async (req, res) => {
  try {
    const { id } = req.params;
    await QuestionCategory.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Single Get Category Error" });
  }
};

module.exports = {
  deleteQuestionController,
  getQuestionController,
  createQuestionController,
  questionUpdateController,
};
