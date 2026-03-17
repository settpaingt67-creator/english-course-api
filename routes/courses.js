const express = require("express");
const router = express.Router();
const db = require("../db");

/// 1. GET all courses
router.get("/", (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

/// 2. GET course by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM courses WHERE id = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

/// 3. CREATE course
router.post("/", (req, res) => {
  const { title, description, level, rating, image_url } = req.body;

  db.query(
    "INSERT INTO courses (title, description, level, rating, image_url) VALUES (?, ?, ?, ?, ?)",
    [title, description, level, rating, image_url],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Course added" });
    }
  );
});

/// 4. UPDATE rating
router.put("/:id", (req, res) => {
  const { rating } = req.body;

  db.query(
    "UPDATE courses SET rating = ? WHERE id = ?",
    [rating, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Rating updated" });
    }
  );
});

/// 5. DELETE course
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM courses WHERE id = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Course deleted" });
  });
});

module.exports = router;