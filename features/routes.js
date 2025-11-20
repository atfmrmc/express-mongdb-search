import { Router } from "express";
import bookRoutes from "./book/book.routes.js";
import authorRoutes from "./author/author.routes.js";

const apiRouter = Router();

// Route all /api/books requests to the bookRoutes handler
apiRouter.use("/books", bookRoutes);

// Route all /api/authors requests to the authorRoutes handler
apiRouter.use("/authors", authorRoutes);

export default apiRouter;
