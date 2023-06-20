import express from "express";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import failureFlash from "connect-flash";
import LocalStrategy from "passport-local";
import passportStrategy from "../config/passport.js";
passportStrategy(passport);
import { Sequelize } from "sequelize";
import { db } from "../config/db.js";
import Assignment from "../models/Assignment.js";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

const UserRouter = express.Router();

//Login page
UserRouter.get("/login", (req, res) => res.render("login.ejs"));

//Register page
UserRouter.get("/register", (req, res) => res.render("register.ejs"));

//Register handle
UserRouter.post("/register", (req, res) => {
  const {
    user_firstName,
    user_lastName,
    username,
    user_email,
    role,
    user_password,
    user_password2,
  } = req.body;
  let errors = [];

  //check required fields
  if (
    !user_firstName ||
    !user_lastName ||
    !username ||
    !user_email ||
    !role ||
    !user_password ||
    !user_password2
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check password match
  if (user_password !== user_password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  //check password length
  if (user_password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("register.ejs", {
      errors,
      user_firstName,
      user_lastName,
      username,
      user_email,
      role,
      user_password,
      user_password2,
    });
  } else {
    //validation passed
    User.findOne({ where: { username: username } }).then((user) => {
      if (user) {
        //user exists
        errors.push({ msg: "Username is already registered" });
        res.render("register.ejs", {
          errors,
          user_firstName,
          user_lastName,
          username,
          user_email,
          role,
          user_password,
          user_password2,
        });
      } else {
        const newUser = new User({
          user_firstName,
          user_lastName,
          username,
          user_email,
          role,
          user_password,
        });
        //Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.user_password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.user_password = hash;
            //Save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//Login handle
UserRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//Logout handle
UserRouter.get("/logout", (req, res) => {
  req.logout({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success_msg", "You are logged out");
      res.redirect("/users/login");
    }
  });
});

export default UserRouter;
