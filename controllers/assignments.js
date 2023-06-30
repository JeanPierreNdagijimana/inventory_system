import express from "express";
import Assignment from "../models/Assignment.js";
import Device from "../models/Device.js";
import Employee from "../models/Employee.js";

//get all assignments
export const getAssignments = async (req, res) => {
  const assignments = await Assignment.findAll({
    include: ["devices", "employees"],
  });

  res.render("assignments/index.ejs", { assignments });
};

//get add assignment page
export const getNewAssignment = async (req, res) => {
  try {
    // Get all employees
    const employees = await Employee.findAll({
      attributes: ["id", "email"],
    });

    // query all devices that are not assigned (status = 0)
    const devices = await Device.findAll({
      attributes: ["id", "code"],
      where: {
        status: 0,
      },
    });
    res.render("assignments/new.ejs", { employees, devices });
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
};

//post add assignment page
export const postNewAssignment = (req, res) => {
  const { devices_id, employees_id } = req.body;
  let errors = [];

  //check required fields
  if (!devices_id || !employees_id) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("assignments/new.ejs", {
      errors,
      devices_id,
      employees_id,
    });
  } else {
    //validation passed
    Assignment.create({
      devices_id,
      employees_id,
    })
      .then((assignment) => {
        req.flash("success_msg", "Assignment added successfully");
        res.redirect("/assignments");
      })
      .catch((err) => console.log(err));
  }
};

//get edit assignment page
export const getEditAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);

  res.render("assignments/edit.ejs", { assignment });
};

//post edit assignment page
export const postEditAssignment = async (req, res) => {
  const { status, devices_id, employees_id } = req.body;
  let errors = [];

  //check required fields
  if (!status || !devices_id || !employees_id) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("assignments/edit.ejs", {
      errors,
      status,
      devices_id,
      employees_id,
    });
  } else {
    //validation passed
    Assignment.update(
      {
        status,
        devices_id,
        employees_id,
      },
      { where: { id: req.params.id } }
    )
      .then((assignment) => {
        req.flash("success_msg", "Assignment updated successfully");
        res.redirect("/assignments");
      })
      .catch((err) => console.log(err));
  }
};

//delete assignment
export const deleteAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);

  assignment.destroy();
  req.flash("success_msg", "Assignment deleted successfully");
  res.redirect("/assignments");
};
