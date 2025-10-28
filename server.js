const express = require("express");
const app = express();
const port = 3000;

// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");

// Middleware global pour loguer les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue à ${req.url} - Time: `, new Date().toISOString());
  next();
});

// Route qui utilise res.render()
app.get("/:name", (req, res) => {
  res.render("index", {
    title: "Accueil",
    message: "Bonjour Mr " + req.params.name,
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
