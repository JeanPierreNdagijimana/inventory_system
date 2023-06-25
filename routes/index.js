import express from "express";
const router = express.Router();
import auth from "../config/auth.js";

//Home page
router.get("/", (req, res) => res.render("home.ejs"));

//dashboard
router.get("/dashboard", auth.ensureAuthenticated, (req, res) => {
  res.render("dashboard.ejs", {
    username: req.user.username,
    user_email: req.user.user_email,
  });
});

export default router;
