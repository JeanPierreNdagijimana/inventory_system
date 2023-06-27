import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import passportStrategy from "../config/passport.js";
import e from "connect-flash";
passportStrategy(passport);

export const getEmployee = async (req, res) => res.render("employees/new.ejs");
export const postEmployee = (req, res) => {
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
    res.render("employees/new.ejs", {
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
        res.redirect("/employees");
      })
      .catch((err) => console.log(err));
  }
};

export const getEmployeeList = async (req, res) => {
  const employees = await Employee.findAll();
  res.render("employees/index.ejs", { employees: employees });
};

export const getEmployeeEdit = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  res.render("employees/edit.ejs", { employee: employee });
};

export const postEmployeeEdit = async (req, res) => {
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
    res.render("employees/edit.ejs", {
      errors,
      employee_firstName,
      employee_lastName,
      employee_email,
      employee_phone,
      department_name,
    });
  } else {
    //validation passed
    Employee.update(
      {
        employee_firstName,
        employee_lastName,
        employee_email,
        employee_phone,
        department_name,
      },
      { where: { id: req.params.id } }
    )
      .then((employee) => {
        req.flash("success_msg", "Employee updated successfully");
        res.redirect("/employees");
      })
      .catch((err) => console.log(err));
  }
};

export const getEmployeeDelete = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  res.render("employees/delete.ejs", { employee: employee });
};

export const postEmployeeDelete = async (req, res) => {
  await Employee.destroy({ where: { id: req.params.id } });
  req.flash("success_msg", "Employee deleted successfully");
  res.redirect("/employees");
};
