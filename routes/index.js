import express from "express";
export const router = express.Router();
import { db } from "../config/db.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

//Home page
router.get("/", (req, res) => res.render("home.ejs"));

//dashboard
router.get("/dashboard", db.ensureAuthenticated, (req, res) =>
  res.render("dashboard.ejs", {
    username: req.user.username, //req.user is available because of passport)
    user_email: req.user.user_email, //req.user is available because of passport)
  })
);

export default router;
