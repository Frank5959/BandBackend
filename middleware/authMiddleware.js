import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if admin exists
    const [rows] = await pool.query("SELECT * FROM admins WHERE id = ?", [
      decoded.id,
    ]);
    if (rows.length === 0)
      return res.status(401).json({ error: "Invalid token" });

    req.admin = rows[0];
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
