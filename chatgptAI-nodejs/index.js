const express = require("express");
const app = express();
const port = 3500;
const { processMessages } = require("./messageProcessor");
const fileUpload = require("express-fileupload");

const connectDB = require("./db/connectDb");

require("dotenv").config();

app.use(express.json());
app.use(fileUpload());

const authRouter = require("./routes/AuthenticationRoute");
const getConversationRoute = require("./routes/GetConversationRoute");
const promptFeatures = require("./routes/mainPromptRoute");
const promptCreate = require("./routes/PromptRoute");
const keyCRUD = require("./routes/apiKeyRoute");
const accountRoute = require("./routes/getKeyRoute.js");

app.use("/auth", authRouter);
app.use("/getConversation", getConversationRoute);
app.use("/prompt", promptCreate);
app.use("/feature", promptFeatures);
app.use("/account", accountRoute);
app.use("/key", keyCRUD);

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
