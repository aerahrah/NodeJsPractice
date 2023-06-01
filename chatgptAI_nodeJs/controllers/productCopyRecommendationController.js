const csvParser = require("csv-parser");
const fs = require("fs");
const { getPromptFeature } = require("../controllers/promptController");

const generateProductRecommendation = (processMessages) => async (req, res) => {
  const promptFeature = await getPromptFeature("productCopyRecommendation");
  const product = req.body.product || "";
  console.log(`hello:  ${product}`);
  if (product.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid input",
      },
    });
    return;
  }

  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: `${promptFeature} ${product}`,
    },
  ];

  const response = await processMessages(req, messages);
  console.log(response);
  res.json({ message: response });
};

const generateProductRecommendationCSV =
  (processMessages) => async (req, res) => {
    const promptFeature = await getPromptFeature(
      "productCopyRecommendationCSV"
    );
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;
    const prompt = `
    `;
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
            content: promptFeature + "\nFile Content:\n" + csvDataString,
          });

          // Call the processMessages function from the main file
          const response = await processMessages(req, messages);

          res.json({ message: response });
        });
    });
  };

module.exports = {
  generateProductRecommendation,
  generateProductRecommendationCSV,
};
