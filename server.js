import express from "express";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";
import setupDatabaseConnection from "./mongodb/connect.js";
import router from "./src/routes/index.js";
import setupGlobalMiddlewares from "./src/middlewares/index.js";

// ------------------------ //
// -- Initialisation App -- //
// ------------------------ //

// Création de l'application Express
const app = express();

// Connexion à la base de données
setupDatabaseConnection();

// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// ----------------------- //
// -- Middleware global -- //
// ----------------------- //
setupGlobalMiddlewares(app);

// ------------ //
// -- Routes -- //
// ------------ //

// Routes Indexes
app.use("/", router);

// --------------- //
// -- Démarrage -- //
// --------------- //

// Démarrer le serveur
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Serveur démarré sur http://localhost:${process.env.PORT || 3000}`
  );
});
