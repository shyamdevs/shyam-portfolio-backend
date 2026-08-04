import express from "express";
import Message from "../models/Message.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// POST /api/messages - public, anyone can submit the contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }
    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (err) {
    res.status(400).json({ message: "Could not send message", error: err.message });
  }
});

// GET /api/messages - admin only, view inbox
router.get("/", protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/messages/:id/read - admin only, mark as read
router.put("/:id/read", protect, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/messages/:id - admin only
router.delete("/:id", protect, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
