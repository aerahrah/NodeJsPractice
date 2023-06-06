const crypto = require("crypto");
const ApiKey = require("../models/apiKeySchema.js");

// generating apikey
async function generateApiKey() {
  const apiKey = crypto.randomBytes(32).toString("hex");
  const modifiedKey = `HSI-${apiKey}`;
  return modifiedKey;
}

async function insertApiKey(userId) {
  const key = await generateApiKey();
  const createKey = new ApiKey({
    userAcc: userId,
    apiKey: key,
  });
  return await createKey.save();
}

const createApiKey = async (req, res) => {
  const getId = req.user.id;
  // if userId was fetched, insert the api key to the database along with the api key

  if (getId) {
    const response = await insertApiKey(getId);
    res.send(response);
  }
};

module.exports = {
  createApiKey,
};
