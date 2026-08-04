import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Shyam Sharma" },
    title: { type: String, default: "Full Stack MERN Developer" },
    tagline: { type: String, default: "" },
    bio: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    projectsCompleted: { type: Number, default: 0 },
    yearsLearning: { type: Number, default: 0 },
    technologiesMastered: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
