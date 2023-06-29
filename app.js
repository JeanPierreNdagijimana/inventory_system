import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import dotenv from "dotenv";
dotenv.config();

import { db } from "./config/db.js";

//models
import Role from "./models/Role.js";
import User from "./models/User.js";
import Department from "./models/Department.js";
import Employee from "./models/Employee.js";
import Device_type from "./models/Device_type.js";
import Device from "./models/Device.js";
import Assignment from "./models/Assignment.js";

//routes
import router from "./routes/index.js";
import EmployeeRouter from "./routes/employees.js";
import DeviceRouter from "./routes/devices.js";
import DeviceTypeRouter from "./routes/deviceTypes.js";
import AssignmentRouter from "./routes/assignments.js";
import UserRouter from "./routes/users.js";
import DepartmentRouter from "./routes/departments.js";

//passport config
import "./config/passport.js";

const __dirname = path.resolve();

//test db
db.authenticate()
  .then(async () => await db.sync())
  .catch((err) => console.log("Error: " + err));

//define associations
// User.belongsTo(Role, {
//   foreignKey: {
//     name: "role_id",
//   },
//   as: "role",
// });

Employee.belongsTo(Department, {
  foreignKey: {
    name: "departments.id",
  },
  as: "departments",
});

Device.belongsTo(Device_type, {
  foreignKey: {
    name: "id",
  },
  as: "device_type_name",
});

Employee.belongsToMany(Device, {
  through: Assignment,
  foreignKey: "employees.id",
  as: "devices",
});

Device.belongsToMany(Employee, {
  through: Assignment,
  foreignKey: "devices.id",
  as: "employees",
});

const app = express();

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//EJS middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

//bodyparser
app.use(express.urlencoded({ extended: false }));

//express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); //global variable
  res.locals.error_msg = req.flash("error_msg"); //global variable
  res.locals.error = req.flash("error"); //global variable
  next();
});

//routes
app.use("/", router);
app.use("/users", UserRouter);
app.use("/employees", EmployeeRouter);
app.use("/departments", DepartmentRouter);
app.use("/devices", DeviceRouter);
app.use("/device_types", DeviceTypeRouter);
app.use("/assignments", AssignmentRouter);
//loclahost:5000
//loclahost:5000/dashoard
//loclahost:5000/users/login
//loclahost:5000/users/register
//loclahost:5000/users/logout
//loclahost:5000/users/edit/:id
//loclahost:5000/users/delete/:id
//loclahost:5000/employees/
//loclahost:5000/employees/new
//loclahost:5000/employees/edit/:id
//loclahost:5000/employees/:id
//loclahost:5000/departments
//loclahost:5000/departments/new
//loclahost:5000/departments/edit/:id
//loclahost:5000/departments/:id
//loclahost:5000/devices
//loclahost:5000/devices/new
//loclahost:5000/devices/edit/:id
//loclahost:5000/device_types
//loclahost:5000/device_types/new
//loclahost:5000/device_types/edit/:id
//loclahost:5000/device_types/:id
//loclahost:5000/assignments
//loclahost:5000/assignments/new
//loclahost:5000/assignments/edit/:id
//loclahost:5000/assignments/:id

//set a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
