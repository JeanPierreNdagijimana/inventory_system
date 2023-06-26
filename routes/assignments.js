import express from "express";
import Assignment from "../models/Assignment.js";
import {
  getAssignments,
  postAssignments,
  getNewAssignment,
  postNewAssignment,
  getEditAssignment,
  postEditAssignment,
  deleteAssignment,
} from "../controllers/assignments.js";

const AssignmentRouter = express.Router();

//show all assignments
AssignmentRouter.get("/", getAssignments);
AssignmentRouter.post("/", postAssignments);

//new assignment page
AssignmentRouter.get("/new", getNewAssignment);
AssignmentRouter.post("/new", postNewAssignment);

//edit assignment page
AssignmentRouter.get("/edit/:id", getEditAssignment);
AssignmentRouter.post("/edit/:id", postEditAssignment);

//delete assignment
AssignmentRouter.delete("/:id", deleteAssignment);

export default AssignmentRouter;
