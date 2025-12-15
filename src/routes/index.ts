import { Router } from "express";
import bookRoutes from "./bookRoutes";
import authorRoutes from "./authorRoutes";
import userRoutes from "./userRoutes";

const router = Router();

// Global styles and scripts
router.use("/", (req, res, next) => {
  res.locals.styles = ["/styles/global.css", "/styles/partials/header.css"];
  res.locals.scripts = [];
  next();
});

// Homepage
router.get("/", (req, res, next) => {
  res.render("pages/index", {
    metaTitle: "Home",
  });
});

router.use("/books", bookRoutes);
// router.use("/authors", authorRoutes);
router.use("/users", userRoutes);

export default router;
