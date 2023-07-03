import express from "express";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";
import e from "connect-flash";
import {
  getDevices,
  getNewDevice,
  postNewDevice,
  postDecommissionDevice,
  postRecommissionDevice,
} from "../controllers/devices.js";
import auth from "../config/auth.js";

const DeviceRouter = express.Router();

//show all devices
DeviceRouter.get("/", auth.ensureAuthenticated, getDevices);

//new device page
DeviceRouter.get("/new", auth.ensureAuthenticated, getNewDevice);

//add device
DeviceRouter.post("/new", auth.ensureAuthenticated, postNewDevice);

// Decommission device
DeviceRouter.post(
  "/decommission/:id",
  auth.ensureAuthenticated,
  postDecommissionDevice
);

// Recommission device
DeviceRouter.post(
  "/recommission/:id",
  auth.ensureAuthenticated,
  postRecommissionDevice
);

export default DeviceRouter;
