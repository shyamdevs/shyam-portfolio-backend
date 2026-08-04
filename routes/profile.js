import express from "express";
import Profile from "../models/Profile.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// GET /api/profile - public, returns the single profile document
router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/profile - admin only
router.put("/", protect, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: "Could not update profile", error: err.message });
  }
});

export default router;
