const csvParser = require("csv-parser");
const fs = require("fs");
const { getPromptFeature } = require("../controllers/promptController");

const generateSeoKeywordsUser = (processMessages) => async (req, res) => {
  const promptFeature = await getPromptFeature("generateSeoKeywords");

  console.log(promptFeature);
  const { message } = req.body;
  console.log("laksdflsdakjf");
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: `${promptFeature} ${message}`,
    },
  ];
  console.log(messages);
  const response = await processMessages(req, messages);

  res.json({ message: response });
};

const generateSeoKeywordsCSV = (processMessages) => async (req, res) => {
  const promptFeature = await getPromptFeature("generateSeoKeywordsCSV");
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
        const message = data.Names;
        if (message) {
          csvDataString += `${message} \n`;
        }
      })
      .on("end", async () => {
        fs.unlinkSync(filePath);
        messages.push({
          role: "user",
          content: `${promptFeature} ${csvDataString}`,
        });

        // Call the processMessages function from the main file
        const response = await processMessages(req, messages);

        res.json({ message: response });
      });
  });
};

module.exports = {
  generateSeoKeywordsCSV,
  generateSeoKeywordsUser,
};
