import express from "express";
import Department from "../models/Department.js";
import {
  getDepartments,
  getNewDepartment,
  postNewDepartment,
  getEditDepartment,
  postEditDepartment,
  getDeleteDepartment,
  postDeleteDepartment,
} from "../controllers/departments.js";
import auth from "../config/auth.js";

const DepartmentRouter = express.Router();

//show all departments
DepartmentRouter.get("/", auth.ensureAuthenticated, getDepartments);

//new department page
DepartmentRouter.get("/new", auth.ensureAuthenticated, getNewDepartment);
DepartmentRouter.post("/new", auth.ensureAuthenticated, postNewDepartment);

//edit department page
DepartmentRouter.get("/edit/:id", auth.ensureAuthenticated, getEditDepartment);
DepartmentRouter.post(
  "/edit/:id",
  auth.ensureAuthenticated,
  postEditDepartment
);

//delete department
DepartmentRouter.get(
  "/delete/:id",
  auth.ensureAuthenticated,
  getDeleteDepartment
);
DepartmentRouter.post(
  "/delete/:id",
  auth.ensureAuthenticated,
  postDeleteDepartment
);

export default DepartmentRouter;
