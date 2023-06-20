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

const DeviceRouter = express.Router();

//add device
DeviceRouter.post("/addDevice", (req, res) => {
  const {
    device_type_name,
    device_model,
    device_serial_number,
    device_code,
    device_status,
  } = req.body;
  let errors = [];

  //check required fields
  if (
    !device_type_name ||
    !device_model ||
    !device_serial_number ||
    !device_code ||
    !device_status
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("addDevice.ejs", {
      errors,
      device_type_name,
      device_model,
      device_serial_number,
      device_code,
      device_status,
    });
  } else {
    //validation passed
    Device.create({
      device_type_name,
      device_model,
      device_serial_number,
      device_code,
      device_status,
    })
      .then((device) => {
        req.flash("success_msg", "Device added successfully");
        res.redirect("/device");
      })
      .catch((err) => console.log(err));
  }
});
