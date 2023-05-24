// uploadRoute.js
const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

const router = express.Router();
module.exports = (processMessages) => {
  router.post("/", upload.single("file"), async (req, res) => {
    const filePath = req.file.path;
    let csvDataString = "";
    const messages = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        const message = data.Name;
        console.log(message);
        if (message) {
          csvDataString += `${message} \n`;
        }
      })
      .on("end", async () => {
        fs.unlinkSync(filePath);
        messages.push({
          role: "user",
          content: `Generate SEO keyword for every products on this list. Include the name alongside its SEO keyword${csvDataString}`,
        });

        const response = await processMessages(messages);

        res.json({ message: response });
      });
  });

  return router;
};
