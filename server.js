import express from "express";
import expressLayouts from "express-ejs-layouts";
import setupDatabaseConnection from "./mongodb/connect.js";
import router from "./src/routes/index.js";

const app = express();

setupDatabaseConnection();

// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// ----------------------- //
// -- Middleware global -- //
// ----------------------- //

// Fichiers statiques
app.use(express.static("public"));
// Utilisation des layouts EJS
app.use(expressLayouts);
// Middleware pour parser le corps des requêtes
app.use(express.urlencoded({ extended: true }));
// Autres middlewares
app.use((req, res, next) => {
  console.log(`Requête reçue à ${req.url} - Time: `, new Date().toISOString());
  next();
});

app.locals.styles = [];
app.locals.scripts = [];

// Routes Indexes
app.use("/", router);

// Démarrer le serveur
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Serveur démarré sur http://localhost:${process.env.PORT || 3000}`
  );
});
