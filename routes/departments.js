import express from "express";
import Department from "../models/Department";

const DepartmentRouter = express.Router();

//show all departments
DepartmentRouter.get("/", async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.render("departments/index.ejs", {
      departments,
    });
  } catch (err) {
    console.log(err);
  }
});

//new department page
DepartmentRouter.get("/new", (req, res) => {
  res.render("departments/new.ejs");
});

//add department
DepartmentRouter.post("/new", (req, res) => {
  const { department_name } = req.body;
  let errors = [];

  //check required fields
  if (!department_name) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("departments/new.ejs", {
      errors,
      department_name,
    });
  } else {
    //validation passed
    Department.create({
      department_name,
    })
      .then((department) => {
        req.flash("success_msg", "Department added successfully");
        res.redirect("/department");
      })
      .catch((err) => console.log(err));
  }
});

export default DepartmentRouter;
