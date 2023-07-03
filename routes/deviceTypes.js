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
import auth from "../config/auth.js";

const DeviceTypeRouter = express.Router();

//show all device types
DeviceTypeRouter.get("/", auth.ensureAuthenticated, getDeviceTypes);

//add device type
DeviceTypeRouter.get("/new", auth.ensureAuthenticated, getAddDeviceType);
DeviceTypeRouter.post("/new", auth.ensureAuthenticated, postAddDeviceType);

//edit device type
DeviceTypeRouter.get("/edit/:id", auth.ensureAuthenticated, getEditDeviceType);
DeviceTypeRouter.post(
  "/edit/:id",
  auth.ensureAuthenticated,
  postEditDeviceType
);

//delete device type
DeviceTypeRouter.get(
  "/delete/:id",
  auth.ensureAuthenticated,
  getDeleteDeviceType
);
DeviceTypeRouter.post(
  "/delete/:id",
  auth.ensureAuthenticated,
  postDeleteDeviceType
);

export default DeviceTypeRouter;
