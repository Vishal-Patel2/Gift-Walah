// backend/controllers/admincontroller.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug logs (optional, helps with troubleshooting on Vercel)
    console.log("ENV ADMIN_EMAIL   :", `"${process.env.ADMIN_EMAIL}"`);
    console.log("ENV ADMIN_PASSWORD:", `"${process.env.ADMIN_PASSWORD}"`);
    console.log("User EMAIL        :", `"${email}"`);
    console.log("User PASSWORD     :", `"${password}"`);

    // 1️⃣ Check email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Check password
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Generate Admin JWT
    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL, role: "admin" },
      process.env.ADMIN_JWT_SECRET, // ✅ ADMIN SECRET
      { expiresIn: "1d" }
    );

    res.json({ message: "Admin login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
