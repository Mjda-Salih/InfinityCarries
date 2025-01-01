require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors"); // Import CORS for cross-origin requests
const app = express();

app.use(cors()); // Allow all origins, or specify origins as needed

app.use(express.json()); // Middleware to parse incoming JSON requests

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Import and link authentication routes (register, login)
const authRoutes = require("./routes/auth"); // Import auth routes
app.use("/api/auth", authRoutes); // Use '/api/auth' for authentication routes

// Import and link user management routes (e.g., /users)
const userRoutes = require("./routes/user"); // Import user routes
app.use("/api/users", userRoutes); // Use '/api' for user-related routes (protected)

// Global Error Handling for uncaught errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err); // Log the error
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Global Error Handling for unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error("Unhandled Rejection:", err); // Log the unhandled rejection error
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
