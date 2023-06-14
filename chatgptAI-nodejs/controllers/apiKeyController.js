const ApiKey = require("../models/apiKeySchema");

const deleteById = async (req, res) => {
  const keyId = req.body.keyId;
  try {
    const apiKeyDel = await ApiKey.deleteOne({ apiKey: keyId });
    if (apiKeyDel.deletedCount === 0) {
      res.status(201).json({
        message: `key is not on the database`,
      });
    } else if (apiKeyDel.deletedCount > 0) {
      res.status(201).json({
        message: "Key deleted successfully",
        deletedCount: apiKeyDel.deletedCount,
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (err) {
    console.error(`Error retriving key ${err}`);
  }
};
const getAllKeys = async (req, res) => {
  try {
    const allKeys = await ApiKey.find({});
    if (allKeys) {
      const allKeysMap = allKeys.map((key) => ({
        userAcc: key.userAcc,
        apiKey: key.apiKey,
      }));
      res.status(201).json(allKeysMap);
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (err) {
    console.error(`Error retriving key ${err}`);
  }
};

module.exports = {
  deleteById,
  getAllKeys,
};
