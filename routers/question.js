const express = require("express");
const {
  createQuestionController,
  getQuestionController,
  checkQuestionController,
} = require("../controllers/questionController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// create routes
router.post(
  "/create-question",
  requireSignIn,
  isAdmin,
  createQuestionController
);

// get single question category
router.get("/getall-question/category/:name", getQuestionController);

//check the quetion right or wrong
router.get("/check-question/:qid", checkQuestionController);

module.exports = router;
