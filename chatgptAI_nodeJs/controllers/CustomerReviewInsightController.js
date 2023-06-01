const csv = require("csv-parser");
const fs = require("fs");
const { getPromptFeature } = require("../controllers/promptController");

const generateCustomerReviewInsight = (processMessages) => async (req, res) => {
  const promptFeature = await getPromptFeature("customerReviewInsight");
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "CSV file is required" });
  }

  const file = req.files.file;

  if (file.mimetype !== "text/csv") {
    return res
      .status(400)
      .json({ error: "Invalid file format. Only CSV files are allowed." });
  }

  const filePath = `uploads/${file.name}`;
  let hasReviewColumn = false;
  const reviews = [];

  file.mv(filePath, async (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to upload the file" });
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("headers", (headers) => {
        hasReviewColumn = headers.includes("review");
      })
      .on("data", (data) => {
        if (hasReviewColumn) {
          reviews.push(data["review"]);
        }
      })
      .on("end", async () => {
        fs.unlinkSync(filePath);

        if (!hasReviewColumn) {
          return res.status(400).json({
            error:
              'Invalid CSV file. The CSV file must have a "review" column.',
          });
        }

        const groupSize = 1;
        // console.log(reviews);
        const totalGroups = Math.ceil(reviews.length / groupSize);
        const reply = [];

        for (let groupIndex = 0; groupIndex < totalGroups; groupIndex++) {
          const startIndex = groupIndex * groupSize;
          const endIndex = startIndex + groupSize;
          const group = reviews.slice(startIndex, endIndex);
          const groupString = JSON.stringify(group);
          const payload = [
            {
              role: "user",
              content: `${promptFeature} ${groupString}`,
            },
          ];
          const response = await processMessages(req, payload);
          reply.push(response);
        }

        res.json({ response: reply });
      });
  });
};

module.exports = { generateCustomerReviewInsight };
