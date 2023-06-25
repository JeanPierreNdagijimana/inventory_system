import express from "express";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";

const DeviceRouter = express.Router();
const devices = [
  {
    id: 1,
    name: "Device 1",
  },
  {
    id: 2,
    name: "Device 2",
  },
  {
    id: 3,
    name: "Device 3",
  },
];

//show all devices
DeviceRouter.get("/", async (req, res) => {
  // Device.findAll()
  //   .then((devices) => {
  //     res.render("devices/index.ejs", {
  //       devices,
  //     });
  //   })
  //   .catch((err) => console.log(err));
  try {
    const devices = await Device.findAll();
    res.render("devices/index.ejs", {
      devices,
    });
  } catch (err) {
    console.log(err);
  }
});

//new device page
DeviceRouter.get("/new", async (req, res) => {
  try {
    const device_types = await Device_type.findAll();
    res.render("devices/new.ejs", {
      device_types,
    });
  } catch (err) {
    console.log(err);
  }
  // res.render("devices/new.ejs");
});

//add device
DeviceRouter.post("/new", (req, res) => {
  const { device_type_id, model, serial_number, code, status } = req.body;
  let errors = [];

  //check required fields
  if (!device_type_id || !model || !serial_number || !code || !status) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("devices/new.ejs", {
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
