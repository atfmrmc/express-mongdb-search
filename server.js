import express from "express";
import setupDatabaseConnection from "./mongodb/connect.js";
import router from "./src/routes/index.js";

const app = express();

setupDatabaseConnection();

// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware global pour loguer les requêtes

app.use((req, res, next) => {
  express.urlencoded({ extended: true });
  console.log(`Requête reçue à ${req.url} - Time: `, new Date().toISOString());
  next();
});

// Routes Indexes
app.use("/", router);

// Démarrer le serveur
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Serveur démarré sur http://localhost:${process.env.PORT || 3000}`
  );
});
