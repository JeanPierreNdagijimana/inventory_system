import express from "express";
import {
  getEmployee,
  postEmployee,
  getEmployeeList,
  getEmployeeEdit,
  postEmployeeEdit,
  getEmployeeDelete,
  postEmployeeDelete,
} from "../controllers/employees.js";
import auth from "../config/auth.js";

const EmployeeRouter = express.Router();

//add employee
EmployeeRouter.get("/new", auth.ensureAuthenticated, getEmployee);
EmployeeRouter.post("/new", auth.ensureAuthenticated, postEmployee);

//get employee list
EmployeeRouter.get("/", auth.ensureAuthenticated, getEmployeeList);

//edit employee
EmployeeRouter.get("/edit/:id", auth.ensureAuthenticated, getEmployeeEdit);
EmployeeRouter.post("/edit/:id", auth.ensureAuthenticated, postEmployeeEdit);

//delete employee
EmployeeRouter.get("/delete/:id", auth.ensureAuthenticated, getEmployeeDelete);
EmployeeRouter.post(
  "/delete/:id",
  auth.ensureAuthenticated,
  postEmployeeDelete
);

export default EmployeeRouter;
