import User from "../models/userModel.js";
import { createTokenAndSetCookie } from "../utils/jwtUtils.js";

// ------------ //
// -- Login -- //
// ----------- //
const getLoginPage = (req, res) => {
  res.render("pages/login", { metaTitle: "Login", errorMessage: null });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(email, password);

    if (user) {
      createTokenAndSetCookie(res, user._id);
      res.redirect("/books");
    }
  } catch (error) {
    res.status(401);

    res.render("pages/login", {
      metaTitle: "Login",
      errorMessage: error.message,
    });
  }
};

// -------------- //
// -- Register -- //
// -------------- //
const getRegisterPage = (req, res) => {
  res.render("pages/register", { metaTitle: "Register", errorMessage: null });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.registerUser(username, email, password);

    createTokenAndSetCookie(res, newUser._id);

    res.redirect("/books");
  } catch (error) {
    res.status(400);

    res.render("pages/register", {
      metaTitle: "Register",
      errorMessage: error.message,
    });
  }
};

// ------------ //
// -- Logout -- //
// ------------ //
const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/users/login");
};

export { registerUser, loginUser, getLoginPage, getRegisterPage, logoutUser };
