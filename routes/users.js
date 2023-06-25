import express from "express";
import passport from "passport";
import passportStrategy from "../config/passport.js";
passportStrategy(passport);
import {
  getLogin,
  getLogout,
  getRegister,
  postLogin,
  postRegister,
} from "../controllers/users.js";

const UserRouter = express.Router();

//Login page - now using the login controller
UserRouter.get("/login", getLogin);

//Login handle
UserRouter.post("/login", postLogin);

//Register page
UserRouter.get("/register", getRegister);

//Register handle
UserRouter.post("/register", postRegister);

//Logout handle
UserRouter.get("/logout", getLogout);

export default UserRouter;
