import express from "express";
import * as BookController from "../controllers/bookController.js";

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
router.get("/", BookController.getBooks);

export default router;
