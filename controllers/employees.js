import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import passportStrategy from "../config/passport.js";
import e from "connect-flash";
import Department from "../models/Department.js";
passportStrategy(passport);

//get all employees
export const getEmployeeList = async (req, res) => {
  const employees = await Employee.findAll({
    include: "department",
  });
  res.render("employees/index.ejs", { employees });
};

//get new employee
export const getEmployee = async (req, res) => {
  const department_names = await Department.findAll();
  console.log(department_names);

  res.render("employees/new.ejs", { department_names });
};

//post new employee
export const postEmployee = (req, res) => {
  const { first_name, last_name, email, country, department_names_id } =
    req.body;
  let errors = [];

  //check required fields
  if (!first_name || !last_name || !email || !country || !department_names_id) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("employees/new.ejs", {
      errors,
      first_name,
      last_name,
      email,
      country,
      department_names_id,
    });
  } else {
    //validation passed
    Employee.create({
      first_name,
      last_name,
      email,
      country,
      departments_id: department_names_id,
    })
      .then((employee) => {
        req.flash("success_msg", "Employee added successfully");
        res.redirect("/employees");
      })
      .catch((err) => console.log(err));
  }
};

export const getEmployeeEdit = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  res.render("employees/edit.ejs", { employee: employee });
};

export const postEmployeeEdit = async (req, res) => {
  const { firstName, lastName, email, country, name } = req.body;
  let errors = [];

  //check required fields
  if (!firstName || !lastName || !email || !country || !name) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("employees/edit.ejs", {
      errors,
      firstName,
      lastName,
      email,
      country,
      name,
    });
  } else {
    //validation passed
    Employee.update(
      {
        firstName,
        lastName,
        email,
        country,
        name,
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
