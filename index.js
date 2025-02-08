import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection
const testDB = async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Connected to MySQL Database");
  } catch (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
};
testDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
