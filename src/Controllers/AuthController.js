const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//get login page
const loginPage = (req, res) => {
  res.render("auth/login");
};
//get register page
const registerPage = (req, res) => {
  res.render("auth/register");
};

const home = (req, res) => {
  res.render("home");
};


const generateToken = (userId) => {
  const payload = { userId };
  const secretKey = process.env.JWT_SECRET;

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};



const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  // Check if either email or password is missing
  if (!email || !password) {
    return res.render("login", { error: "All fields are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user does not exist, return error
    if (!user) {
      return res.render("login", { error: "User does not exist" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return error
    if (!passwordMatch) {
      return res.render("login", { error: "Incorrect password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Check if token generation failed
    if (!token) {
      return res.render("login", { error: "Failed to generate token" });
    }

   res.render("home", { token });
  } catch (error) {
    console.error("Error in login:", error);
    res.render("login", { error: "Internal server error" });
  }
};

module.exports = {
  home,
  loginPage,
  registerPage,
  loginHandler,
};
