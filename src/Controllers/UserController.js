const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

const getUser = async (req, res) => {
  const userid = req.user;
  if (!userid) {
    return res.status(400).json({ error: "Failed to authorize" });
  }
  const user = await User.findOne({ userid });
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
      password: hashedPassword,
    });

    const userId = newUser._id;

    // Generate token
    const token = await generateToken(userId);
    if (token.length < 1) {
      return res.status(400).json({ error: "Failed to generate token" });
    }
    const redirectUrl = path.join("/", "/") + `?token=${token}`;
    // Redirect to login page with token as query parameter
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id; 
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Check if request body is empty
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No data provided in the request body" });
  }

  try {
    // Find user by ID
    const user = await User.findById(userId);
    
    // If user does not exist, return error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user with the data from the request body
    await user.updateOne(req.body);

    // Send success response
    res.status(200).json({ message: `Updated user ${userId}` });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    // Find user by ID
    const user = await User.findById(id);

    // If user does not exist, return error
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Delete user
    await user.remove();

    // Send success response
    res.status(200).json({ message: `User ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
