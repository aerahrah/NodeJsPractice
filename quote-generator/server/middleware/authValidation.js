const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const { id } = decodedToken;
    req.user = id;
    next();
  } catch (error) {
    return res.status(401).send({ message: "unauthorized" });
  }
};

module.exports = authenticate;
