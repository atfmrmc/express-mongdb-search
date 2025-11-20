import { Router } from "express";

const viewRouter = Router();

// Homepage
viewRouter.get("/", (req, res, next) => {
  console.log("Rendering home page");
  res.render("home/index", {
    title: "Accueil",
    message: "Bienvenue sur la page d'accueil",
  });
});

viewRouter.get("/books", (req, res) => {
  console.log("Rendering books page");
  res.send("Books Page - To be implemented");
});

export default viewRouter;
