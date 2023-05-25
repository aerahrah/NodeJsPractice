const express = require("express");
const app = express();
const port = 3500;
const { processMessages } = require("./messageProcessor");
const fileUpload = require("express-fileupload");

require("dotenv").config();

app.use(express.json());
app.use(fileUpload());

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
