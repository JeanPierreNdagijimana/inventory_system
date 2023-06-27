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

const EmployeeRouter = express.Router();

//add employee
EmployeeRouter.get("/new", getEmployee);
EmployeeRouter.post("/new", postEmployee);

//get employee list
EmployeeRouter.get("/", getEmployeeList);

//edit employee
EmployeeRouter.get("/edit/:id", getEmployeeEdit);
EmployeeRouter.post("/edit/:id", postEmployeeEdit);

//delete employee
EmployeeRouter.get("/delete/:id", getEmployeeDelete);
EmployeeRouter.post("/delete/:id", postEmployeeDelete);

export default EmployeeRouter;
