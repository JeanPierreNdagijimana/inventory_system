import express from "express";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";
import e from "connect-flash";
import { name } from "ejs";

// const DeviceRouter = express.Router();

//show all devices
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.findAll({
      include: "device_type",
    });
    res.render("devices/index.ejs", {
      devices,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getNewDevice = async (req, res) => {
  const device_types = await Device_type.findAll();
  console.log(device_types);

  res.render("devices/new.ejs", { device_types });
};

//post new device
export const postNewDevice = (req, res) => {
  const { device_types_id, model, serial_number, code } = req.body;
  let errors = [];

  //check required fields
  if (!device_types_id || !model || !serial_number || !code) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("devices/new.ejs", {
      errors,
      device_types_id,
      model,
      serial_number,
      code,
    });
  } else {
    //validation passed
    Device.create({
      device_types_id,
      model,
      serial_number,
      code,
    })
      .then((device) => {
        req.flash("success_msg", "Device added successfully");
        res.redirect("/devices");
      })
      .catch((err) => console.log(err));
  }
};

//delete device
export const getDeleteDevice = async (req, res) => {
  const device = await Device.findByPk(req.params.id);
  res.render("devices/delete.ejs", { device: device });
};

export const postDeleteDevice = async (req, res) => {
  await Device.destroy({ where: { id: req.params.id } });
  req.flash("success_msg", "Device deleted successfully");
  res.redirect("/devices");
};
