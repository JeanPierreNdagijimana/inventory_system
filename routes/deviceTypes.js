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

const DeviceTypeRouter = express.Router();

//add device type
DeviceTypeRouter.post("/add", (req, res) => {
  const { device_type_name, devive_type_prefix } = req.body;
  let errors = [];

  //check required fields
  if (!device_type_name || !devive_type_prefix) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("addDeviceType.ejs", {
      errors,
      device_type_name,
      devive_type_prefix,
    });
  } else {
    //validation passed
    Device_type.create({
      device_type_name,
      devive_type_prefix,
    })
      .then((device_type) => {
        req.flash("success_msg", "Device type added successfully");
        res.redirect("/device_type");
      })
      .catch((err) => console.log(err));
  }
});
