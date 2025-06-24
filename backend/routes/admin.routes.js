import express from "express";
import { approveCompany, rejectCompany, getPendingCompanies } from "../controllers/admin.controller.js";
import { getAllJobs, getAllStudents, getAllApplications } from "../controllers/admin.controller.js";
import { logincheck, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get all pending companies for approval
router.get("/companies/pending", logincheck, isAdmin, getPendingCompanies);

// Approve a company
router.post("/companies/:companyId/approve", logincheck, isAdmin, approveCompany);

// Reject a company
router.post("/companies/:companyId/reject", logincheck, isAdmin, rejectCompany);

// Get all jobs
router.get("/jobs", logincheck, isAdmin, getAllJobs);

// Get all students
router.get("/students", logincheck, isAdmin, getAllStudents);

// Get all applications
router.get("/applications", logincheck, isAdmin, getAllApplications);
router.get("/applications/:applicationId", logincheck, isAdmin, getAllApplications);
router.get("/applications/:applicationId/status", logincheck, isAdmin, getAllApplications);

export default router;
