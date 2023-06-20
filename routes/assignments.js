import express from "express";
import session from "express-session";
import passport from "passport";
import { Sequelize } from "sequelize";
import { db } from "../config/db.js";
import { Assignment } from "../models/Assignment.js";
import { Device } from "../models/Device.js";
import { Device_type } from "../models/Device_type.js";
import { Employee } from "../models/Employee.js";
import { Department } from "../models/Department.js";

const AssignmentRouter = express.Router();

//add assignment
AssignmentRouter.post("/addAssignment", (req, res) => {
  const { employee_email, device_name, assignment_status } = req.body;
  let errors = [];

  //check required fields
  if (!employee_email || !device_name || !assignment_status) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("addAssignment.ejs", {
      errors,
      employee_email,
      device_name,
      assignment_status,
    });
  } else {
    //validation passed
    Assignment.create({
      employee_email,
      device_name,
      assignment_status,
    })
      .then((assignment) => {
        req.flash("success_msg", "Assignment added successfully");
        res.redirect("/assignment");
      })
      .catch((err) => console.log(err));
  }
});
