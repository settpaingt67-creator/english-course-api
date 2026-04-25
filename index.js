const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const courseRoutes = require("./routes/courses");
app.use("/api/courses", courseRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;