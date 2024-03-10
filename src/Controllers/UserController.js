const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");``
const getUser = async (req, res) => {
  const userid= req.user
  if(!userid){
    return res.status(400).json({ error: "Failed to authorize" });
  }
  const user = await User.findOne({userid});
  if (!user) {
    res.status(403);
    throw new Error("no user has been found ");
  }
  res.status(200).json({ message: user });
};
const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const userId=newUser._id;
    // Generate and check if token is successfully generated
    const token = await generateToken(userId)
    if (token.length < 1) {
      return res.status(400).json({ error: "Failed to generate token" });
    }

    // Send success response with token
    res.status(201).json({ message: "New User Created successfully", token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = (req, res) => {
  res.status(200).json({ message: `Updated  User ${req.params.id}` });
};

const deleteUser = (req, res) => {
  res.status(200).json({ message: `delete  User ${(req, params.id)}` });
};

const generateToken = (userId) => {
  const payload = { userId }; // Customize payload as needed
  const secretKey = process.env.JWT_SECRET; // Replace with your own secret key
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
