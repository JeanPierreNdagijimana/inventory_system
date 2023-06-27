import express from "express";
import Device from "../models/Device.js";
import Device_type from "../models/Device_type.js";
import e from "connect-flash";
import {
  getDevices,
  getNewDevice,
  postNewDevice,
  deleteDevice,
} from "../controllers/devices.js";

const DeviceRouter = express.Router();

//show all devices
DeviceRouter.get("/", getDevices);

//new device page
DeviceRouter.get("/new", getNewDevice);

//add device
DeviceRouter.post("/new", postNewDevice);

//delete device
DeviceRouter.delete("/:id", deleteDevice);

export default DeviceRouter;
