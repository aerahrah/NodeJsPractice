const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];
  console.log(`authHeader  ${authHeader}`);
  console.log(`token:  ${token}`);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = authenticate;
