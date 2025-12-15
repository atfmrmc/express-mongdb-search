// -- Imports ------------------------------------------------------------------------- //
import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();
// ------------------------------------------------------------------------------------ //

// -- Styles -------------------------------------------------------------------------- //

// ------------------------------------------------------------------------------------ //

// -- Routes -------------------------------------------------------------------------- //
router.get("/login", userController.getLoginPage);
router.post("/login", userController.loginUser);
router.get("/register", userController.getRegisterPage);
router.post("/register", userController.registerUser);
router.get("/logout", userController.logoutUser);
// ------------------------------------------------------------------------------------ //

// -- Exports ------------------------------------------------------------------------- //
export default router;
// ------------------------------------------------------------------------------------ //
