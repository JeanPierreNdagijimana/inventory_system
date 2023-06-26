import express from "express";
// import DeviceType from "../models/Device_type.js";
import { db } from "../config/db.js";
import Device_type from "../models/Device_type.js";
import {
  getDeviceTypes,
  postDeviceTypes,
  getAddDeviceType,
  postAddDeviceType,
  getEditDeviceType,
  postEditDeviceType,
  deleteDeviceType,
} from "../controllers/device_types.js";

const DeviceTypeRouter = express.Router();

//show all device types
DeviceTypeRouter.get("/", getDeviceTypes);
DeviceTypeRouter.post("/", postDeviceTypes);

//add device type
DeviceTypeRouter.get("/new", getAddDeviceType);
DeviceTypeRouter.post("/new", postAddDeviceType);

//edit device type
DeviceTypeRouter.get("/edit/:id", getEditDeviceType);
DeviceTypeRouter.post("/edit/:id", postEditDeviceType);

//delete device type
DeviceTypeRouter.delete("/:id", deleteDeviceType);

export default DeviceTypeRouter;
