const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ROOT
app.get("/", (req, res) => {
  res.send("API running...");
});

module.exports = app;