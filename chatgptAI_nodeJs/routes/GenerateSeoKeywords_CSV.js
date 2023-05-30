const express = require("express");
const csvParser = require("csv-parser");
const fs = require("fs");
const authenticate = require("../middleware/auth");

const router = express.Router();
module.exports = (processMessages) => {
  router.post("/", authenticate, async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;

    if (file.mimetype !== "text/csv") {
      return res
        .status(400)
        .json({ error: "Invalid file format. Please upload a CSV file" });
    }

    const filePath = `uploads/${file.name}`;

    file.mv(filePath, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to upload the file" });
      }

      let csvDataString = "";
      const messages = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => {
          const message = data.Name;
          if (message) {
            csvDataString += `${message} \n`;
          }
        })
        .on("end", async () => {
          fs.unlinkSync(filePath);
          messages.push({
            role: "user",
            content: `
            
            Generate SEO keyword for every products on this list. Include the name alongside its SEO keyword 
        
            Output in JSON data and in this format:

            {
              keywords: []
            }
            ${csvDataString}`,
          });

          const response = await processMessages(req, messages);

          res.json({ message: response });
        });
    });
  });
  return router;
};
