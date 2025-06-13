// index.js
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./config/database");

// Updated route import to new file name (capital C)
const createPostRoutes = require("./routes/CreatePosts");

const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API endpoint remains lowercase for RESTful convention
app.use("/api/createposts", createPostRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HRMS Backend Server is running!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to HRMS Backend API",
    version: "1.0.0",
    endpoints: {
      createPosts: "/api/createposts",
      health: "/api/health",
    },
  });
});

app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 HRMS Server is running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});