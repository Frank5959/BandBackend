import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("your_secure_password", 10);

  await Admin.create({
    email: "admin@example.com",
    password: hashedPassword,
  });

  console.log("Admin created successfully");
  process.exit();
};

seedAdmin();
