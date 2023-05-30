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

const generateSeoKeywordsUser = require("./routes/GenerateSeoKeywordsRoutes");
const generateSeoKeywordsCSV = require("./routes/GenerateSeoKeywordsRoutes");
const generateMediaPostUser = require("./routes/GenerateMediaPostRoutes");
const getConversationRoute = require("./routes/GetConversation");

app.use("/getConversation", getConversationRoute);
app.use("/generate-seo-keywords", generateSeoKeywordsUser);
app.use("/generate-media-post", generateMediaPostUser);
app.use("/generate-seo-keywords-csv", generateSeoKeywordsCSV);

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
