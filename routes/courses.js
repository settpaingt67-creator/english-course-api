const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM courses");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM courses WHERE id = ?",
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { title, description, level, rating, image_url } = req.body;

    await db.query(
      "INSERT INTO courses (title, description, level, rating, image_url) VALUES (?, ?, ?, ?, ?)",
      [title, description, level, rating, image_url]
    );

    res.json({ message: "Course added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE rating
router.put("/:id", async (req, res) => {
  try {
    const { rating } = req.body;

    await db.query(
      "UPDATE courses SET rating = ? WHERE id = ?",
      [rating, req.params.id]
    );

    res.json({ message: "Rating updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM courses WHERE id = ?",
      [req.params.id]
    );

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE course title
router.put("/edit/:id", async (req, res) => {
  try {
    const { title } = req.body;

    await db.query(
      "UPDATE courses SET title = ? WHERE id = ?",
      [title, req.params.id]
    );

    res.json({ message: "Title updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;