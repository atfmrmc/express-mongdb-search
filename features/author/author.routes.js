// features/author/author.routes.js
import express from "express";
import * as AuthorController from "./author.controller.js";

const router = express.Router();

// Base path: /api/authors
router.route("/").get(AuthorController.getAllAuthors); // GET /api/authors

export default router;
