const express = require("express");
const app = express();
const port = 3500;
const { processMessages } = require("./messageProcessor");
const authRouter = require("./routes/AuthenticationRoute");
const fileUpload = require("express-fileupload");

const connectDB = require("./db/connectDb");

require("dotenv").config();

app.use(express.json());
app.use(fileUpload());

app.use("/auth", authRouter);

const getConversationRoute = require("./routes/GetConversationRoute");
const promptFeatures = require("./routes/mainPromptRoute");
const promptCreate = require("./routes/PromptRoute");
const accountRoute = require("./routes/getKeyRoute.js");

app.use("/getConversation", getConversationRoute);
app.use("/prompt", promptCreate);
app.use("/feature", promptFeatures);
app.use("/account", accountRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
