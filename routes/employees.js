import express from "express";

const EmployeeRouter = express.Router();

//add employee
EmployeeRouter.post("/new", (req, res) => {
  const {
    employee_firstName,
    employee_lastName,
    employee_email,
    employee_phone,
    department_name,
  } = req.body;
  let errors = [];

  //check required fields
  if (
    !employee_firstName ||
    !employee_lastName ||
    !employee_email ||
    !employee_phone ||
    !department_name
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("addEmployee.ejs", {
      errors,
      employee_firstName,
      employee_lastName,
      employee_email,
      employee_phone,
      department_name,
    });
  } else {
    //validation passed
    Employee.create({
      employee_firstName,
      employee_lastName,
      employee_email,
      employee_phone,
      department_name,
    })
      .then((employee) => {
        req.flash("success_msg", "Employee added successfully");
        res.redirect("/employee");
      })
      .catch((err) => console.log(err));
  }
});

export default EmployeeRouter;
