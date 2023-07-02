import express from "express";
import Assignment from "../models/Assignment.js";
import {
  getAssignments,
  getNewAssignment,
  postNewAssignment,
  getEditAssignment,
  postEditAssignment,
  getDeleteAssignment,
  postDeleteAssignment,
} from "../controllers/assignments.js";

const AssignmentRouter = express.Router();

//show all assignments
AssignmentRouter.get("/", getAssignments);

//new assignment page
AssignmentRouter.get("/new", getNewAssignment);
AssignmentRouter.post("/new", postNewAssignment);

//edit assignment page
AssignmentRouter.get("/edit/:id", getEditAssignment);
AssignmentRouter.post("/edit/:id", postEditAssignment);

//delete assignment
AssignmentRouter.get("/:id", getDeleteAssignment);
AssignmentRouter.post("/:id", postDeleteAssignment);

export default AssignmentRouter;
