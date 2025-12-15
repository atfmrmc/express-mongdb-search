import express from "express";
import * as AuthorController from "../controllers/authorController.js";

const router = express.Router();

router.get("/", AuthorController.displayAuthors);

export default router;
