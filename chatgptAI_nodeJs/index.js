const express = require("express");
const app = express();
const port = 3500;
const { processMessages } = require("./messageProcessor");
const fileUpload = require("express-fileupload");

require("dotenv").config();

app.use(express.json());
app.use(fileUpload());

const GenerateSeoRoute_CSV = require("./routes/GenerateSeoKeywords_CSV");
const GenerateMediaPost = require("./routes/GenerateMediaPost.js");
const GenerateSeoRoute = require("./routes/GenerateSeoKeywords_UserInput");
const getConversationRoute = require("./routes/GetConversation");

app.use("/generate-media-post", GenerateMediaPost(processMessages));
app.use("/generate-seo-keywords-csv", GenerateSeoRoute_CSV(processMessages));
app.use("/generate-seo-keywords", GenerateSeoRoute(processMessages));
app.use("/getConversation", getConversationRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
