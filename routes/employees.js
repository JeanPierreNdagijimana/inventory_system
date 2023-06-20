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

const EmployeeRouter = express.Router();

//add employee
EmployeeRouter.post("/addEmployee", (req, res) => {
  const {
    employee_firstName,
    employee_lastName,
    employee_email,
    employee_phone,
    department_name,
  } = req.body;
  let errors = [];

  //check required fields
  if (
    !employee_firstName ||
    !employee_lastName ||
    !employee_email ||
    !employee_phone ||
    !department_name
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("addEmployee.ejs", {
      errors,
      employee_firstName,
      employee_lastName,
      employee_email,
      employee_phone,
      department_name,
    });
  } else {
    //validation passed
    Employee.create({
      employee_firstName,
      employee_lastName,
      employee_email,
      employee_phone,
      department_name,
    })
      .then((employee) => {
        req.flash("success_msg", "Employee added successfully");
        res.redirect("/employee");
      })
      .catch((err) => console.log(err));
  }
});
