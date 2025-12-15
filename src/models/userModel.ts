import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// ----------------------------- //
// -- Hashage du mot de passe -- //
// ----------------------------- //
userSchema.pre("save", async function (next) {
  const user = this;

  // Si le mot de passe n'a pas été modifié ou est nouveau, on passe à la suite.
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// ----------------- //
// -- Inscription -- //
// ----------------- //
userSchema.statics.registerUser = async function (username, email, password) {
  // 1. Vérification des champs requis
  if (!username || !email || !password) {
    throw new Error("Tous les champs sont requis pour l'inscription.");
  }

  // 2. Vérification de l'unicité de l'email et du username
  const existingUserByEmail = await this.findOne({ email });
  if (existingUserByEmail) {
    throw new Error("Cet email est déjà enregistré.");
  }

  // 3. Vérification de l'unicité du nom d'utilisateur
  const existingUserByUsername = await this.findOne({ username });
  if (existingUserByUsername) {
    throw new Error("Ce nom d'utilisateur est déjà pris.");
  }

  // 4. Création et sauvegarde de l'utilisateur
  const newUser = new this({ username, email, password });
  return await newUser.save();
};

// --------------- //
// -- Connexion -- //
// --------------- //
userSchema.statics.loginUser = async function (email, password) {
  const user = await this.findOne({ email });

  // 1. Utilisateur non trouvé ou mot de passe incorrect
  if (!user) {
    throw new Error("Email ou mot de passe invalide.");
  }

  // 2. Comparer le mot de passe fourni avec le hash stocké (via méthode d'instance)
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Email ou mot de passe invalide.");
  }

  return user;
};

// --------------------------------- //
// -- Comparaison du mot de passe -- //
// --------------------------------- //
// La méthode d'instance est utilisée sur un document utilisateur spécifique (`user.comparePassword(...)`).
userSchema.methods.comparePassword = function (candidatePassword) {
  // Utiliser return pour pouvoir faire `await user.comparePassword(...)` dans loginUser
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

// Exportation seulement du modèle (il contient toutes les méthodes statiques)
export default User;
