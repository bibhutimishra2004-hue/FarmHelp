// server/index.js

require("dotenv").config(); // 🔑 loads .env

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();




const path = require("path");

// serve static frontend
app.use(express.static(path.join(__dirname, "../client")));

// Routes
app.use(express.static("client"));
app.use("/api/recommend", require("./routes/recommend"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/weather", require("./routes/weather"));
app.use("/api/mandi", require("./routes/mandi"));
app.use("/api/disease", require("./routes/disease"));

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});




// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});