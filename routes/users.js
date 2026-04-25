const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all users
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, username, image FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single user
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, username, image FROM users WHERE id = ?",
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;