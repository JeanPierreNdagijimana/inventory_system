import express from "express";
import Device from "../models/Device";

const DeviceRouter = express.Router();

//add device
DeviceRouter.post("/addDevice", (req, res) => {
  const { device_type_id, model, serial_number, code, status } = req.body;
  let errors = [];

  //check required fields
  if (!device_type_id || !model || !serial_number || !code || !status) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("addDevice.ejs", {
      errors,
      device_type_id,
      model,
      serial_number,
      code,
      status,
    });
  } else {
    //validation passed
    Device.create({
      device_type_id,
      model,
      serial_number,
      code,
      status,
    })
      .then((device) => {
        req.flash("success_msg", "Device added successfully");
        res.redirect("/devices");
      })
      .catch((err) => console.log(err));
  }
});

export default DeviceRouter;
