import express from "express";
import { approveCompany, rejectCompany, getPendingCompanies, getAdminProfile } from "../controllers/admin.controller.js";
// import { getAllJobs, getAllStudents, getAllApplications } from "../controllers/admin.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get all pending companies for approval
router.get("/companies/pending", verifyJWT, isAdmin, getPendingCompanies);

// Approve a company
router.post("/companies/:companyId/approve", verifyJWT, isAdmin, approveCompany);

// Reject a company
router.post("/companies/:companyId/reject", verifyJWT, isAdmin, rejectCompany);

// Get all jobs
// router.get("/jobs", verifyJWT, isAdmin, getAllJobs);

// Get all students
// router.get("/students", verifyJWT, isAdmin, getAllStudents);

// // Get all applications
// router.get("/applications", logincheck, isAdmin, getAllApplications);
// router.get("/applications/:applicationId", logincheck, isAdmin, getAllApplications);
// router.get("/applications/:applicationId/status", logincheck, isAdmin, getAllApplications);

// Get profile for the logged-in admin
router.get("/profile", verifyJWT, getAdminProfile);

// Logout route for admin
router.post("/logout", (req, res) => {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default router;
