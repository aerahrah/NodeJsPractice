const csv = require('csv-parser');
const fs = require('fs');
const { processMessages } = require("../messageProcessor.js");

// using multer opts to control storing uploads
// setting up the config
const apiKey = process.env.OPENAI_API_KEY;
// openAi configuration
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    },
};

const arrayOfAnalyzedData = []; // this will become array full of objects
const upcomingMessage = []; // array for the messages and prompt

// to restructure the objects so productName and productFeature will the key of each analyzed objects 
const analyzedCsv = (productName,productFeature) => {
    arrayOfAnalyzedData.push({productName,productFeature})
};

const createFeatureSuggestion = async(req,res) => {
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

    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data',(data)=>analyzedCsv(data['Product Name'], data['Product Feature']))
    .on('end',async()=>{
        fs.unlinkSync(filePath);
        const stringedArray = arrayOfAnalyzedData.map(({ productName, productFeature })=>`${productName}: ${productFeature}`).join('\n');
        const prompt = `I want you to act as a product feature generator with Senior Business Analayst and Senior Data analyst skills that will thinks step by step or debates pros and cons before suggesting an answer. Your suggestion will be based on the json data that I will give you. You will use your Artificial intelligence tools to generate the most unique and the best feature based on the data that you will analyze.
        Here's the Data:${stringedArray},
        Strictly follow the given format don't change anything on it including the characters, Output in JSON data and in this format:
        {
        Feature 1: " ",
        Feature 2: " ",
        Feature 3: " ",
        }
        Strictly, don't generate or include messages that is not part of the given format, also limit the tokens for exactly 20 tokens per features object value, Strictly follow the given format don't change anything on it including the characters. Just stick to the format that is provided.
        `;
        const message = {
            role: "user",
            content: prompt
        };
        // before pushing the schema, Check first if the user has an input title
        if (file !== "" || file === undefined || file === null) {
        upcomingMessage.push(message); // push to the array every objects that is made by the user
        }
        // sending the request to the openai api endpoint
        const completion = await processMessages(req, upcomingMessage); //algorithm made to fetch the data
        // const jsonString = completion.data.choices[0].message.content;
        // console.log(stringedArray);
        console.log(completion);
        res.status(201).json({
            answer: completion
        });
    });
});

}

// process of reading and parsing the csv files

module.exports = {
    createFeatureSuggestion
}