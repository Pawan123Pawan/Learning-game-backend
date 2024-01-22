// routes/userRoutes.js
const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  userPerformancesController,
  userSetPerformancesController,
  resetProgressController,
} = require("../controllers/userControllers");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// forget password
router.post("/forget-password", forgotPasswordController);

// user set porformance
router.post("/userset-performance", userSetPerformancesController);

//user porformances
router.get("/performance", userPerformancesController);
router.delete("/reset-progress", resetProgressController);

module.exports = router;
