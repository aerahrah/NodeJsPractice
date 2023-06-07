require("dotenv").config({ path: "../.env" });
const csvParser = require("csv-parser");
const fs = require("fs");
const { getPromptFeature } = require("../controllers/promptController");

const apiCompletion = async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const { promptId, message, promptType } = req.body;
  if (
    { promptId, message, promptType } === undefined ||
    { promptId, message, promptType } === null
  ) {
    res
      .status(401)
      .json({ message: "ERR_CONN", error: "Undefined required Parameters" });
  }

  try {
    const promptFeature = await getPromptFeature(promptId);

    if (promptType === "csv") {
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
        console.log(csvDataString);
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

            const response = await fetch(
              "https://api.openai.com/v1/chat/completions",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer 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",
                },
                method: "POST",
                body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: [...messages],
                }),
              }
            );
            const responseData = await response.json();
            const generatedMessages = responseData.choices.map((choice) => ({
              role: "assistant",
              content: choice.message.content,
            }));
            res.json({
              prompt: promptFeature,
              userinput: message,
              generatedPrompt: `${promptFeature} ${message}`,
              response: generatedMessages,
            });
          });
      });
    } else {
      const upcomingMessage = [];
      let messages = {
        role: "user",
        content: `${promptFeature} ${message}`,
      };
      if (message !== "" || message === undefined || message === null) {
        upcomingMessage.push(messages); // push to the array every objects that is made by the user
      }
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          method: "POST",
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...upcomingMessage],
          }),
        }
      );
      const responseData = await response.json();
      const generatedMessages = responseData.choices.map((choice) => ({
        role: "assistant",
        content: choice.message.content,
      }));
      const generatedMessagesResponse = responseData.choices[0].message.content;
      res.json({
        prompt: promptFeature,
        userinput: message,
        generatedPrompt: `${promptFeature} ${message}`,
        response: generatedMessagesResponse,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
};

module.exports = {
  apiCompletion,
};
