import express from "express";
import Department from "../models/Department.js";
import e from "connect-flash";

//show all departments
export const getDepartments = async (req, res) => {
  const departments = await Department.findAll();

  res.render("/departments/index.ejs", { departments });
};
export const postDepartments = async (req, res) => {
  const departments = await Department.findAll();

  res.render("/departments/index.ejs", { departments });
};

//new department page
export const getNewDepartment = (req, res) => {
  res.render("/departments/new.ejs");
};
export const postNewDepartment = (req, res) => {
  const { department_name } = req.body;
  let errors = [];

  //check required fields
  if (!department_name) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("/departments/new.ejs", {
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
        res.redirect("/departments/index.ejs");
      })
      .catch((err) => console.log(err));
  }
};

//edit department page
export const getEditDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);

  res.render("/departments/edit.ejs", { department });
};
export const postEditDepartment = async (req, res) => {
  const { department_name } = req.body;
  let errors = [];

  //check required fields
  if (!department_name) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("/departments/edit.ejs", {
      errors,
      department_name,
    });
  } else {
    //validation passed
    Department.update({ department_name }, { where: { id: req.params.id } })
      .then((department) => {
        req.flash("success_msg", "Department updated successfully");
        res.redirect("/departments/index.ejs");
      })
      .catch((err) => console.log(err));
  }
};

//delete department
export const deleteDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);

  Department.destroy({
    where: { id: req.params.id },
  })
    .then((department) => {
      req.flash("success_msg", "Department deleted successfully");
      res.redirect("/departments/index.ejs");
    })
    .catch((err) => console.log(err));
};
