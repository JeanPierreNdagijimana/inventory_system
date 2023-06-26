import express from "express";
import Assignment from "../models/Assignment.js";

//get all assignments
export const getAssignments = async (req, res) => {
  const assignments = await Assignment.findAll();

  res.render("/assignments/index.ejs", { assignments });
};

//post all assignments
export const postAssignments = async (req, res) => {
  const assignments = await Assignment.findAll();

  res.render("/assignments/index.ejs", { assignments });
};

//get add assignment page
export const getNewAssignment = (req, res) => {
  res.render("/assignments/new.ejs");
};

//post add assignment page
export const postNewAssignment = (req, res) => {
  const { employee_id, device_id, status } = req.body;
  let errors = [];

  //check required fields
  if (!employee_id || !device_id || !status) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("/assignments/new.ejs", {
      errors,
      employee_id,
      device_id,
      status,
    });
  } else {
    //validation passed
    Assignment.create({
      employee_id,
      device_id,
      status,
    })
      .then((assignment) => {
        req.flash("success_msg", "Assignment added successfully");
        res.redirect("/assignments/index.ejs");
      })
      .catch((err) => console.log(err));
  }
};

//get edit assignment page
export const getEditAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);

  res.render("/assignments/edit.ejs", { assignment });
};

//post edit assignment page
export const postEditAssignment = async (req, res) => {
  const { employee_id, device_id, status } = req.body;
  let errors = [];

  //check required fields
  if (!employee_id || !device_id || !status) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("/assignments/edit.ejs", {
      errors,
      employee_id,
      device_id,
      status,
    });
  } else {
    //validation passed
    Assignment.update(
      {
        employee_id,
        device_id,
        status,
      },
      { where: { id: req.params.id } }
    )
      .then((assignment) => {
        req.flash("success_msg", "Assignment updated successfully");
        res.redirect("/assignments/index.ejs");
      })
      .catch((err) => console.log(err));
  }
};

//delete assignment
export const deleteAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);

  assignment.destroy();
  req.flash("success_msg", "Assignment deleted successfully");
  res.redirect("/assignments/index.ejs");
};
