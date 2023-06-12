const mongoose = require("mongoose");

const connectDb = async (url) => {
  try {
    mongoose.connect(url);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDb;
