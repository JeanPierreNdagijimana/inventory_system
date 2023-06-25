import express from "express";
import Assignment from "../models/Assignment";

const AssignmentRouter = express.Router();

//get all assignments
AssignmentRouter.get("/", async (req, res) => {
  const assignments = await Assignment.findAll();

  res.render("assignments.ejs", { assignments });
});

//get add assignment page
AssignmentRouter.get("/new", (req, res) => {
  res.render("addAssignment.ejs");
});

//add new assignment
AssignmentRouter.post("/new", (req, res) => {
  const { employee_id, device_id, status } = req.body;
  let errors = [];

  //check required fields
  if (!employee_id || !device_id || !status) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if there are errors
  if (errors.length > 0) {
    res.render("addAssignment.ejs", {
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
        res.redirect("/assignments");
      })
      .catch((err) => console.log(err));
  }
});

export default AssignmentRouter;
