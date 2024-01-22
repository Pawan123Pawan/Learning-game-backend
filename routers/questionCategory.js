const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createQuestionController,
  questionUpdateController,
  getQuestionController,
  deleteQuestionController,
} = require("../controllers/questionCategoryController");
const router = express.Router();
//create routes

//question route
router.post(
  "/create-questionCategory",
  requireSignIn,
  isAdmin,
  createQuestionController
);

//update question route
router.put(
  "/update-questionCategory/:id",
  requireSignIn,
  isAdmin,
  questionUpdateController
);

// get question route
router.get("/get-questionCategory", getQuestionController);

//delete question route
router.delete("/delete-questionCategory/:id", deleteQuestionController);

module.exports = router;
