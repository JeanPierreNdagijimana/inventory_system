import express from "express";
import { db } from "../config/db.js";
import Device_type from "../models/Device_type.js";
import {
  getDeviceTypes,
  getAddDeviceType,
  postAddDeviceType,
  getEditDeviceType,
  postEditDeviceType,
  getDeleteDeviceType,
  postDeleteDeviceType,
} from "../controllers/device_types.js";

const DeviceTypeRouter = express.Router();

//show all device types
DeviceTypeRouter.get("/", getDeviceTypes);

//add device type
DeviceTypeRouter.get("/new", getAddDeviceType);
DeviceTypeRouter.post("/new", postAddDeviceType);

//edit device type
DeviceTypeRouter.get("/edit/:id", getEditDeviceType);
DeviceTypeRouter.post("/edit/:id", postEditDeviceType);

//delete device type
DeviceTypeRouter.get("/delete/:id", getDeleteDeviceType);
DeviceTypeRouter.post("/delete/:id", postDeleteDeviceType);

export default DeviceTypeRouter;
