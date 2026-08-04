import express from "express";
import Experience from "../models/Experience.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (err) {
    res.status(400).json({ message: "Could not create experience", error: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    res.json(experience);
  } catch (err) {
    res.status(400).json({ message: "Could not update experience", error: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
