require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const courseRoutes = require("./routes/courses");

app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("English Course API is running");
});

module.exports = app;