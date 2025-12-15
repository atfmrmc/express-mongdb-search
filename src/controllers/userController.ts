//import * as UserModel from "../models/userModel.js";

const getLoginPage = (req, res) => {
  res.render("pages/login", { metaTitle: "Login" });
};

const loginUser = async (req, res) => {};

const getRegisterPage = (req, res) => {
  res.render("pages/register", { metaTitle: "Register" });
};

const registerUser = async (req, res) => {};

export { registerUser, loginUser, getLoginPage, getRegisterPage };
