const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET = "mysecretkey";

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { username, password, image } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, password, image) VALUES (?, ?, ?)",
      [username, hash, image]
    );

    res.json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        image: user.image,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;