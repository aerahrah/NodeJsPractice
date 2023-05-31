const csvParser = require("csv-parser");
const fs = require("fs");


const generateRevenueActivityInsight = (processMessages) => async (req, res) => {
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

    const insights = [];
    let messages = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('headers', (headerList) => {
        // Process the headers of the CSV file
        const headers = headerList.join(', ');
        insights.push(headers);
      })
      .on('data', (row) => {
        // Process each row of the CSV file
        const rowData = Object.values(row).join(', ');
        insights.push(rowData);
      })
      .on("end", async () => {
        fs.unlinkSync(filePath);
        messages.push({
          role: "user",
          content: `
            
          Generate a revenue activity insight by category to the given data set.

          File Content:
            ${insights.join('\n')}`,
        });

        // Call the processMessages function from the main file
        const response = await processMessages(req, messages);

        res.json({ message: response });
      });
  });
};

module.exports = {
  generateRevenueActivityInsight
};
