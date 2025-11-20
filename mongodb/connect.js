import mongoose from "mongoose";

const initConnection = async () => {
  try {
    mongoose
      .connect(
        `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`
      )
      .then(() => console.log("Connexion à MongoDB réussie"));
  } catch (error) {
    console.error("Erreur de connexion à MongoDB", error);
  }
};

const setupDatabaseConnection = async () => {
  await initConnection();
};

export default setupDatabaseConnection;
