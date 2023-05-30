const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate a token
    const token = jwt.sign({ id: newUser._id, username }, secretKey);
    res.header("Authorization", `Bearer ${token}`);
    res.json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id, username }, secretKey);
    res.header("Authorization", `Bearer ${token}`);
    res.json({ message: "User signed in successfully", token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { signup, signin };
