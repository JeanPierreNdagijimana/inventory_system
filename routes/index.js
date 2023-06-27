import express from "express";
const router = express.Router();
import auth from "../config/auth.js";

//Home page
router.get("/", (req, res) => res.render("main/home.ejs"));

//dashboard
router.get("/dashboard", auth.ensureAuthenticated, (req, res) => {
  res.render("users/dashboard.ejs", {
    username: req.user.username,
    email: req.user.email,
  });
});

export default router;
