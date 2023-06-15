require("dotenv").config();
const csvParser = require("csv-parser");
const fs = require("fs");
const {
  getPromptFeature,
  getResponseFormat,
} = require("../controllers/promptController");

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
    const responseFormat = await getResponseFormat(promptId);

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
            const completePromptString = promptFeature
              .replace("(user_input)", csvDataString)
              .replace("(response_format)", responseFormat);
            messages.push({
              role: "user",
              content: completePromptString,
            });

            const response = await fetch(
              "https://api.openai.com/v1/chat/completions",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                method: "POST",
                body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: [...messages],
                }),
              }
            );

            const responseData = await response.json();
            const generatedMessagesResponse =
              responseData.choices[0].message.content;
            res.json({
              prompt: promptFeature,
              userinput: message,
              responseFormat: responseFormat,
              generatedPrompt: completePromptString,
              response: generatedMessagesResponse,
            });
          });
      });
    } else {
      const upcomingMessage = [];
      const completePromptString = promptFeature
        .replace("(user_input)", message)
        .replace("(response_format)", responseFormat);
      let messages = {
        role: "user",
        content: completePromptString,
      };
      if (message !== "" || message === undefined || message === null) {
        upcomingMessage.push(messages);
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          method: "POST",
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...upcomingMessage],
          }),
        }
      );

      const responseData = await response.json();
      const generatedMessagesResponse = responseData.choices[0].message.content;
      res.json({
        prompt: promptFeature,
        userinput: message,
        responseFormat: responseFormat,
        generatedPrompt: completePromptString,
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
