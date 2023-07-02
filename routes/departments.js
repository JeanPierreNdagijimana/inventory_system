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

const DepartmentRouter = express.Router();

//show all departments
DepartmentRouter.get("/", getDepartments);

//new department page
DepartmentRouter.get("/new", getNewDepartment);
DepartmentRouter.post("/new", postNewDepartment);

//edit department page
DepartmentRouter.get("/edit/:id", getEditDepartment);
DepartmentRouter.post("/edit/:id", postEditDepartment);

//delete department
DepartmentRouter.get("/delete/:id", getDeleteDepartment);
DepartmentRouter.post("/delete/:id", postDeleteDepartment);

export default DepartmentRouter;
