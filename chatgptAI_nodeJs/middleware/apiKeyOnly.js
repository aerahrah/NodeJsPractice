const ApiKey = require("../models/apiKeySchema.js");

const apiKeyOnlyUsage = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const apiKey = authHeader?.split(" ")[1];
    console.log(authHeader);
    if (!apiKey) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        //check if api exists in the database
        const checkKey = await ApiKey.findOne({apiKey:apiKey});
        if (!checkKey) {
            return res.status(401).json({ message: "Invalid API Key" });
        }
        const apiUserAcc = checkKey._id;
        console.log({id:apiUserAcc, key:checkKey.apiKey});
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = apiKeyOnlyUsage