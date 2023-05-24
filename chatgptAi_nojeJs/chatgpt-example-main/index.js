const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 3500;
const { processMessages } = require("./messageProcessor");

require("dotenv").config();

app.use(express.json());

const uploadRoute = require("./routes/upload");
const uploadAutoRoute = require("./routes/uploadAutoGenerateSeo");
const chatRoute = require("./routes/chat");
const getConversationRoute = require("./routes/conversation");

app.use("/uploadAuto", uploadAutoRoute(processMessages));
app.use("/upload", uploadRoute(processMessages));
app.use("/chat", chatRoute(processMessages));
app.use("/getConversation", getConversationRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
