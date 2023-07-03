import express from "express";
import Assignment from "../models/Assignment.js";
import {
  getAssignments,
  getNewAssignment,
  postNewAssignment,
  postUnassignAssignment,
} from "../controllers/assignments.js";
import auth from "../config/auth.js";

const AssignmentRouter = express.Router();

//show all assignments
AssignmentRouter.get("/", auth.ensureAuthenticated, getAssignments);

//new assignment page
AssignmentRouter.get("/new", auth.ensureAuthenticated, getNewAssignment);
AssignmentRouter.post("/new", auth.ensureAuthenticated, postNewAssignment);

// Unassign
AssignmentRouter.post(
  "/unassign/:id",
  auth.ensureAuthenticated,
  postUnassignAssignment
);

export default AssignmentRouter;
