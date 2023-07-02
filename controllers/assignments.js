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
export const postNewAssignment = async (req, res) => {
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
    try {
      //validation passed
      const assignment = await Assignment.create({
        devices_id: devices_id,
        employees_id: employees_id,
      });
      // update status in device table
      await Device.update(
        {
          status: 1,
        },
        { where: { id: devices_id } }
      );

      // .then((assignment) => {
      req.flash("success_msg", "Assignment added successfully");
      res.redirect("/assignments");
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server error");
    }
  }
};

//get edit assignment page
export const getEditAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);
  const employees = await Employee.findAll({
    attributes: ["id", "email"],
  });
  const devices = await Device.findAll({
    attributes: ["id", "code"],
  });

  res.render("assignments/edit.ejs", {
    assignment: assignment,
    employees: employees,
    devices: devices,
  });
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
    try {
      //validation passed
      await Assignment.update(
        {
          status,
          devices_id,
          employees_id,
        },
        { where: { id: req.params.id } }
      );

      // update status in device table
      if (status == 1) {
        await Device.update(
          {
            status: 1,
          },
          { where: { id: devices_id } }
        );
      } else {
        await Device.update(
          {
            status: 0,
          },
          { where: { id: devices_id } }
        );
      }
      req.flash("success_msg", "Assignment updated successfully");
      res.redirect("/assignments");
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server error");
    }
  }
};

//delete assignment
export const getDeleteAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);
  res.render("assignments/delete.ejs", { assignment: assignment });
};

export const postDeleteAssignment = async (req, res) => {
  await Assignment.destroy({ where: { id: req.params.id } });
  req.flash("success_msg", "Assignment deleted successfully");
  res.redirect("/assignments");
};
