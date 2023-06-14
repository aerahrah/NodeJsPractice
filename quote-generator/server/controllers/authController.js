const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/users");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userSave = new Users({ username, password: hashedPassword });
    await userSave.save();
    return res.status(200).send({ message: "User Created Successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Users.findOne({ username });

    if (!existingUser) {
      return res.status(400).send({ message: "invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).send({ message: "invalid username or password" });
    }
    const token = jwt.sign({ id: existingUser._id }, secretKey);
    return res
      .status(200)
      .send({ message: "users successfully signed in", token: token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { signin, signup };
