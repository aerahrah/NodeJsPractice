const csvParser = require("csv-parser");
const fs = require("fs");

const generateProductRecommendation = (processMessages) => async (req, res) => {
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
      content: generateProductRecommendationPrompt(product),
    },
  ];

  const response = await processMessages(req, messages);
  console.log(response);
  res.json({ message: response });
};

const generateProductRecommendationCSV =
  (processMessages) => async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;
    const prompt = `Recommend list of twenty product copy WITHOUT DESCRIPTION using this data set, using format like this:
      These are the top 20 product copy based on the given data set:
      1. Product  
      2. Product  
      3. Product 
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
            content: prompt + "\nFile Content:\n" + csvDataString,
          });

          // Call the processMessages function from the main file
          const response = await processMessages(req, messages);

          res.json({ message: response });
        });
    });
  };

const generateProductRecommendationPrompt = (prompt) => {
  return `Recommend me twenty product copy of ${prompt} with NO description with this format:
  These are the top 20 product copy based on the given product:
  1. product_name
  2. product_name
  3. product_name`;
};

module.exports = {
  generateProductRecommendation,
  generateProductRecommendationCSV,
};
