import pool from "./config/db.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("adminpassword", 10);
  const [rows] = await pool.query(
    "INSERT INTO admins (email, password) VALUES (?, ?)",
    ["admin@example.com", hashedPassword]
  );
  console.log("Admin user seeded:", rows);
  process.exit();
};

seedAdmin();
