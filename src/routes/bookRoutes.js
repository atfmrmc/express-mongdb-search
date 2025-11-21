import express from "express";
import * as BookController from "../controllers/bookController.js";

const router = express.Router();

router.get("/", BookController.displayBooks);

export default router;
