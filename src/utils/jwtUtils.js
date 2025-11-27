import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Create and sign a JWT token, then set it as a secure HTTP-only cookie
const createTokenAndSetCookie = (res, userId) => {
  // 1. Generate the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  // 2. Set the token as a secure HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side JS access (XSS defense)
    secure: process.env.NODE_ENV !== "development", // Use secure in production (HTTPS)
    sameSite: "strict", // CSRF defense
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days (must match JWT_LIFETIME)
  });
};

export { createTokenAndSetCookie };
