require("dotenv").config();

const connectDB = require("./db/connectDb");
const Prompt = require("./models/precreatePromptSchema");

const jsonPrompts = require("./populatePrompt.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Prompt.deleteMany();
    await Prompt.create(jsonPrompts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
