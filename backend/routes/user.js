const express = require("express");
const { User } = require("../models");
const verifyToken = require("../middlewares/verifyToken"); // Import the verifyToken middleware
const router = express.Router();

// GET /api/users - Fetch all users (protected route)
router.get("/", verifyToken, async (req, res) => {
  // <-- Add verifyToken here
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users); // Send the users data as JSON response
  } catch (err) {
    console.error("Error fetching users:", err); // Log any errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/users/profile - Fetch a user's profile (protected route)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the token (from the decoded JWT token)
    const user = await User.findByPk(req.user.id); // Get the user by their ID from the token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send the user data as JSON response
  } catch (err) {
    console.error("Error fetching user profile:", err); // Log any errors
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
