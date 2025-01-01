const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize"); // Import Op for case-insensitive query
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Trim the email to remove any leading/trailing spaces
    const trimmedEmail = email.trim();

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists (case-insensitive)
    const existingUser = await User.findOne({
      where: { email: { [Op.iLike]: trimmedEmail } }, // Case-insensitive query
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Hash password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password during registration:", hashedPassword); // Log the hashed password

    // Create new user
    const user = await User.create({
      name,
      email: trimmedEmail, // Use trimmed email
      password: hashedPassword,
    });

    // Generate token after successful registration
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Respond with user details (excluding password) and token
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.error("Error registering user:", err); // Log error for debugging
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with email:", email); // Log the incoming email to check
  const trimmedEmail = email.trim(); // Trim email to remove spaces
  console.log("Trimmed email:", trimmedEmail);
  console.log("Entered password:", password); // Log the entered password to verify

  try {
    // Find user by email (case-insensitive)
    const user = await User.findOne({
      where: { email: { [Op.iLike]: trimmedEmail } },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the hash from the database
    console.log("Stored hash from DB:", user.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token for the user if credentials match
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Token will expire in 1 hour
    });

    console.log("Generated token:", token);

    // Send the token along with the user details (excluding password)
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: token, // Send token back
    });
  } catch (err) {
    console.error("Error logging in:", err); // Log error for debugging
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

module.exports = router;
