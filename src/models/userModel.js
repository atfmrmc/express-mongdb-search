import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  usernme: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const registerUser = async (username, email, password) => {
  if (username && email && password) {
    const newUser = new User({ username, email, password });
    return await newUser.save();
  }
  throw new Error("All fields are required for registration");
};

const loginUser = async (email, password) => {};

export default User;
