import setupDatabaseConnection from "./mongodb/connect.js";
import express from "express";
import Book from "./features/book/book.model.js";

const app = express();

setupDatabaseConnection();

const newBook = new Book({
  title: "Le Petit Prince",
  release_date: new Date("1943-04-06"),
  genre: "Fiction",
  ISBN: "978-0156012195",
});

newBook
  .save()
  .then(() => {
    console.log("Livre sauvegardé avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la sauvegarde du livre :", error);
  });

// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");

// Middleware global pour loguer les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue à ${req.url} - Time: `, new Date().toISOString());
  next();
});

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.render("index", {
    title: "Accueil",
    message: "Bienvenue sur la page d'accueil",
  });
});

// Démarrer le serveur
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Serveur démarré sur http://localhost:${process.env.PORT || 3000}`
  );
});
