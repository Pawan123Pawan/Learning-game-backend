const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const userPorformance = require("../models/userSetPorformanceModel");

const registerController = async (req, res) => {
  //   res.send("Welcome to the register page!");
  try {
    const { name, email, password, phone, role } = await req.body;
    console.log(name + " " + email + " " + password);
    if (!name) return res.send({ message: "name is required" });
    if (!email) return res.send({ message: "email is required" });
    if (!password) return res.send({ message: "password is required" });
    if (!phone) return res.send({ message: "phone is required" });
    //check user
    const existingUser = await User.findOne({ email });

    //exisiting user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    // hash the password
    const passwordHash = await hashPassword(password);
    //save user
    const user = await new User({
      email,
      name,
      password: passwordHash,
      phone,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

// login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered please sginup your account",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    // create token
    const token = await JWT.sign({ _id: user._id }, process.env.SCRETE_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error login page" });
  }
};

//forgotPasswordController

const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await User.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email ",
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// user set porfomance controller
const userSetPerformancesController = async (req, res) => {
  try {
    const { name, email, ansNumber } = await req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!name) {
      res.status(400).send({ message: "Name is required" });
    }
    if (!ansNumber) {
      res.status(400).send({ message: "ansNumber is required" });
    }

    const user = await userPorformance({ name, email, ansNumber }).save();

    res.status(200).send({
      success: true,
      message: "User saved successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// user porfomance controller
const userPerformancesController = async (req, res) => {
  try {
    const allusers = await userPorformance.find();
    res.status(200).send({
      success: true,
      message: " All Users feched successfully",
      allusers: allusers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//resete user performance
const resetProgressController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email ", email);
    const allusers = await userPorformance.findOneAndDelete({ email: email });
    if (!allusers) {
      res.status(200).send({
        success: false,
        message: "Not Reset ",
      });
    }
    res.status(200).send({
      success: true,
      message: " Reset successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
module.exports = {
  registerController,
  loginController,
  resetProgressController,
  forgotPasswordController,
  userPerformancesController,
  userSetPerformancesController,
};
