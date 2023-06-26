import express from "express";
import DeviceType from "../models/DeviceType.js";

//show all device types
export const getDeviceTypes = async (req, res) => {
  const device_types = await DeviceType.findAll();

  res.render("/device_types/index.ejs", { device_types });
};
export const postDeviceTypes = async (req, res) => {
  const device_types = await DeviceType.findAll();

  res.render("/device_types/index.ejs", { device_types });
};

//add device type
export const getAddDeviceType = (req, res) => {
  res.render("/device_types/new.ejs");
};
export const postAddDeviceType = (req, res) => {
  const { device_type_name, devive_type_prefix } = req.body;
  let errors = [];

  //check required fields
  if (!device_type_name || !devive_type_prefix) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("/device_types/new.ejs", {
      errors,
      device_type_name,
      devive_type_prefix,
    });
  } else {
    //validation passed
    DeviceType.create({
      device_type_name,
      devive_type_prefix,
    })
      .then((device_type) => {
        req.flash("success_msg", "Device type added successfully");
        res.redirect("/device_types/index.ejs");
      })
      .catch((err) => console.log(err));
  }
};

//edit device type
export const getEditDeviceType = async (req, res) => {
  const device_type = await DeviceType.findByPk(req.params.id);

  res.render("/device_types/edit.ejs", { device_type });
};
export const postEditDeviceType = async (req, res) => {
  const { device_type_name, devive_type_prefix } = req.body;
  let errors = [];

  //check required fields
  if (!device_type_name || !devive_type_prefix) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("/device_types/edit.ejs", {
      errors,
      device_type_name,
      devive_type_prefix,
    });
  } else {
    //validation passed
    DeviceType.update(
      { device_type_name, devive_type_prefix },
      { where: { id: req.params.id } }
    )
      .then((device_type) => {
        req.flash("success_msg", "Device type updated successfully");
        res.redirect("/device_types/index.ejs");
      })
      .catch((err) => console.log(err));
  }
};

//delete device type
export const deleteDeviceType = async (req, res) => {
  const device_type = await DeviceType.findByPk(req.params.id);

  device_type.destroy();
  req.flash("success_msg", "Device type deleted successfully");
  res.redirect("/device_types/index.ejs");
};
