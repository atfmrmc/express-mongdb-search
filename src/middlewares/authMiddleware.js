import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// --------------------- //
// -- Set User Locals -- //
// --------------------- //
const setUserLocals = async (req, res, next) => {
  const token = req.cookies.jwt;

  // Always initialize locals
  res.locals.user = null;
  res.locals.isLoggedIn = false;

  if (!token) {
    return next(); // No token, continue to the route handler
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (user) {
      // Success: Attach to request (for other middlewares/controllers) and locals (for views)
      req.user = user;
      res.locals.user = user;
      res.locals.isLoggedIn = true;
    } else {
      res.clearCookie("jwt"); // Token is valid but user was deleted.
    }

    next();
  } catch (error) {
    // Token is bad/expired. Clear the cookie and continue.
    res.clearCookie("jwt");
    next();
  }
};

// ----------------------------------------- //
// -- Protect from Unauthenticated Access -- //
// ----------------------------------------- //
const protectRoute = async (req, res, next) => {
  // If setLocals ran first, req.user will be set. We can skip the verification.
  if (req.user) {
    return next();
  }

  // Fallback/Redundant check (if protect is used before setLocals)
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).redirect("/users/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // We only need to verify the token and get the ID here,
    // as the actual user object will be fetched by setLocals or can be attached here.
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.clearCookie("jwt"); // Clear the bad cookie
    return res.status(401).redirect("/users/login");
  }
};

export { setUserLocals, protectRoute }; // Export both functions
