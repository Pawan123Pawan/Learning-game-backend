const express = require("express");
const cors = require("cors");
const clc = require("cli-color");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routers/userRouter");
const questionRouter = require("./routers/question");
const categoriesRouter = require("./routers/questionCategory");

// configure env
dotenv.config();
//port
const PORT = process.env.PORT || 8070;
// db connection
connectDB();

// rest object
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRouter);
app.use("/api/question-categories", categoriesRouter);
app.use("/api/questions", questionRouter);

app.listen(PORT, () => {
  console.log(clc.yellowBright(`Server is running on port ${PORT}`));
});
