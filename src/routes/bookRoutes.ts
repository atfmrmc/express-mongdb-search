import express from "express";
import * as BookController from "../controllers/bookController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ------------ //
// -- Styles -- //
// ------------ //
router.use("/", (req, res, next) => {
  // Add stylesheet for this page
  res.locals.styles.push("/styles/pages/book.css");
  next();
});

// ------------ //
// -- Routes -- //
// ------------ //
router.get("/", protectRoute, BookController.getBooks);

export default router;
