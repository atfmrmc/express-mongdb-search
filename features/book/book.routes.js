// features/book/book.routes.js
import express from "express";
import { getAllBooks } from "./book.controller.js";

const router = express.Router();

// Base path: /api/books
router.route("/").get(getAllBooks); // GET /api/books

export default router;
