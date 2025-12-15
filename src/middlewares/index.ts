import express from "express";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import setGlobalLocals from "./globalLocalsMiddleware.js";
import { setUserLocals } from "./authMiddleware.js";

const setupGlobalMiddlewares = (app) => {
  // Fichiers statiques
  app.use(express.static("public"));

  // Utilisation des layouts EJS
  app.use(expressLayouts);

  // Middleware pour parser le corps des requêtes
  app.use(express.urlencoded({ extended: true }));

  // Sécurité des en-têtes HTTP
  // app.use(helmet());

  // Middleware pour parser les cookies
  app.use(cookieParser());

  // TODO : Ajouter express-rate-limit ici

  app.use(setGlobalLocals);

  app.use(setUserLocals);

  // Autres middlewares (doit être après le parsing du body et autres setup)
  app.use((req, res, next) => {
    console.log(
      `Requête reçue à ${req.url} - Time: `,
      new Date().toISOString()
    );
    next();
  });
};

export default setupGlobalMiddlewares;
