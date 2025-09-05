// backend/middleware/adminAuth.js
import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No admin token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid admin token" });
  }
};

export default adminAuth;
