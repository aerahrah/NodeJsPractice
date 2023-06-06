// this will be the middlware for generating the features
// this middleware will be used for validating the api key
const ApiKey = require("../models/apiKeySchema.js");

const authenticateKey = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const getId = req.user.id;
  const token = authHeader?.split(" ")[2];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const apiKeyExistInDB = await ApiKey.exists({
      userAcc: getId,
      apiKey: token,
    });
    console.log(apiKeyExistInDB);
    if (!apiKeyExistInDB) {
      res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = authenticateKey;
