const mongoose = require("mongoose");
const clc = require("cli-color");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    console.log(clc.blue("Database connection successfully established"));
  } catch (error) {
    console.log(clc.redBright(error));
  }
};
module.exports = connectDB;
// export default connectDB;
