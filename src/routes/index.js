import { Router } from "express";
import bookRoutes from "./bookRoutes.js";
import authorRoutes from "./authorRoutes.js";

const router = Router();

// Homepage
router.get("/", (req, res, next) => {
  res.render("index", {
    metaTitle: "Home",
  });
});

router.use("/books", bookRoutes);
// router.use("/authors", authorRoutes);

export default router;
