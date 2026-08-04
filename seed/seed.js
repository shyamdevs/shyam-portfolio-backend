// Run with: npm run seed
// Populates MongoDB Atlas with Shyam Sharma's real portfolio content
// pulled from his resume, plus creates the admin login.

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Profile from "../models/Profile.js";
import Admin from "../models/Admin.js";

dotenv.config();

const projects = [
  {
    title: "FreshCart",
    shortDescription: "Full-stack MERN e-commerce platform with cart, payments and an admin dashboard.",
    detailedDescription:
      "FreshCart is a full-stack e-commerce application built on the MERN stack with a responsive UI. It features secure JWT authentication with role-based authorization, REST APIs for products, users, orders and shopping cart, an admin dashboard with full CRUD operations, image upload, and payment gateway integration. Performance was optimized using reusable React components and efficient API calls.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "REST APIs"],
    category: "Full Stack",
    liveUrl: "https://freshcart-frontend-nu.vercel.app/",
    githubUrl: "https://github.com/shyamdevs",
    featured: true,
    published: true,
    order: 1,
  },
  {
    title: "Student Management System",
    shortDescription: "Responsive student management app with complete CRUD operations.",
    detailedDescription:
      "A responsive student management application built with reusable React components and efficient state management, featuring a clean, mobile-friendly interface for managing student records end to end.",
    techStack: ["React.js", "JavaScript", "CSS3"],
    category: "Frontend",
    liveUrl: "https://student-management-6hme.vercel.app/",
    githubUrl: "https://github.com/shyamdevs",
    featured: true,
    published: true,
    order: 2,
  },
  {
    title: "Smart To-Do List",
    shortDescription: "Task manager with add, edit, delete, search and completion tracking.",
    detailedDescription:
      "A smart to-do list app implementing add, edit, delete, search and task completion features, with local storage used for persistent task management and a responsive, user-friendly interface.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    category: "Frontend",
    liveUrl: "https://smart-todolist-project.netlify.app",
    githubUrl: "https://github.com/shyamdevs",
    featured: false,
    published: true,
    order: 3,
  },
];

const skills = [
  { name: "JavaScript (ES6+)", category: "Language", proficiency: 90, order: 1 },
  { name: "HTML5", category: "Frontend", proficiency: 95, order: 2 },
  { name: "CSS3", category: "Frontend", proficiency: 90, order: 3 },
  { name: "React.js", category: "Frontend", proficiency: 88, order: 4 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 88, order: 5 },
  { name: "Bootstrap", category: "Frontend", proficiency: 80, order: 6 },
  { name: "Node.js", category: "Backend", proficiency: 82, order: 7 },
  { name: "Express.js", category: "Backend", proficiency: 82, order: 8 },
  { name: "MongoDB", category: "Database", proficiency: 80, order: 9 },
  { name: "Mongoose", category: "Database", proficiency: 78, order: 10 },
  { name: "JWT Authentication", category: "Backend", proficiency: 80, order: 11 },
  { name: "REST APIs", category: "Backend", proficiency: 85, order: 12 },
  { name: "Git & GitHub", category: "Tools", proficiency: 85, order: 13 },
  { name: "Postman", category: "Tools", proficiency: 80, order: 14 },
];

const experience = [
  {
    role: "MERN Stack Developer Intern",
    organization: "Tech Solutions Inc.",
    startDate: "Jan 2024",
    endDate: "Apr 2024",
    description: "Built and maintained web applications, worked on REST APIs and database design.",
    order: 1,
  },
  {
    role: "Freelance Developer",
    organization: "Self Employed",
    startDate: "May 2024",
    endDate: "Present",
    description: "Building custom websites and web apps for clients worldwide.",
    order: 2,
  },
  {
    role: "Open Source Contributor",
    organization: "Various Projects",
    startDate: "2023",
    endDate: "Present",
    description: "Contributing to open source and helping the developer community.",
    order: 3,
  },
];

const profile = {
  name: "Shyam Sharma",
  title: "Full Stack MERN Developer",
  tagline: "I build scalable, fast and modern web applications that solve real world problems.",
  bio: "Full Stack Developer specializing in the MERN stack with hands-on experience building scalable, responsive web applications. Skilled in React.js, Node.js, Express.js, MongoDB, REST APIs and JWT authentication. Passionate about writing clean, maintainable code and continuously learning new technologies.",
  email: "shyamsharma729785@gmail.com",
  phone: "+91 7297856063",
  location: "Jaipur, Rajasthan",
  github: "https://github.com/shyamdevs",
  linkedin: "https://linkedin.com/in/shyam-sharma2004",
  resumeUrl: "",
  projectsCompleted: 9,
  yearsLearning: 2,
  technologiesMastered: 5,
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas for seeding...");

    await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Profile.deleteMany({}),
    ]);

    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    await Experience.insertMany(experience);
    await Profile.create(profile);

    const adminEmail = process.env.ADMIN_EMAIL || "shyamsharma729785@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await Admin.create({ email: adminEmail, password: hashedPassword });
      console.log(`Admin account created: ${adminEmail}`);
    } else {
      console.log("Admin account already exists, skipping.");
    }

    console.log("Seed complete: projects, skills, experience and profile inserted.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedDatabase();
