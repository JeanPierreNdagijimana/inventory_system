import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import path from "path";
import router from "./routes/index.js";
import userRouter from "./routes/users.js";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import { db } from "./config/db.js";
import EmployeeRouter from "./routes/employees.js";
import DepartmentRouter from "./routes/departments.js";
import DeviceRouter from "./routes/devices.js";
import DeviceTypeRouter from "./routes/device_types.js";
import AssignmentRouter from "./routes/assignments.js";
import expressLayouts from "express-ejs-layouts";
import { db } from "./config/db.js";
//passport config
import "./config/passport.js";
const __dirname = path.resolve();

//test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

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
app.use("/users", userRouter);
app.use("/employees", EmployeeRouter);
app.use("/departments", DepartmentRouter);
app.use("/devices", DeviceRouter);
app.use("/device_types", DeviceTypeRouter);
app.use("/assignments", AssignmentRouter);

//set a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
