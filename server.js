import setupDatabaseConnection from "./database/connect.js";
import express from "express";

const app = express();

setupDatabaseConnection();

// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");

// Middleware global pour loguer les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue à ${req.url} - Time: `, new Date().toISOString());
  next();
});

// Route qui utilise res.render()
/*
app.get("/:name", (req, res) => {
  res.render("index", {
    title: "Accueil",
    message: "Bonjour Mr " + req.params.name,
  });
});
*/

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
