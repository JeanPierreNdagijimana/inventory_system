import passport from "passport";
import passportStrategy from "../config/passport.js";
passportStrategy(passport);

import User from "../models/User.js";

export const getLogin = async (req, res) => res.render("login.ejs");

export const postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

export const getRegister = async (req, res) => res.render("register.ejs");

export const postRegister = async (req, res) => {
  const { first_name, last_name, username, email, role, password, password2 } =
    req.body;

  let errors = [];

  //check required fields
  if (
    !first_name ||
    !last_name ||
    !username ||
    !email ||
    !role ||
    !password ||
    !password2
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  //check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("register.ejs", {
      errors,
      first_name,
      last_name,
      username,
      email,
      role,
      password,
      password2,
    });
  } else {
    //validation passed
    User.findOne({ where: { username: username } }).then((user) => {
      if (user) {
        //user exists
        errors.push({ msg: "Username is already registered" });
        res.render("register.ejs", {
          errors,
          first_name,
          last_name,
          username,
          email,
          role,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          first_name,
          last_name,
          username,
          email,
          role,
          password,
        });
        //Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
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
};

export const getLogout = (req, res) => {
  req.logout({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success_msg", "You are logged out");
      res.redirect("/users/login");
    }
  });
};
