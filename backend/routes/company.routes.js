import express from "express";
import { 
    getCompanyProfile, 
    postJob, 
    getMyJobs, 
    getMyJobById, 
    updateMyJob, 
    deleteMyJob 
} from "../controllers/company.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get profile for the logged-in company
router.get("/profile", verifyJWT, getCompanyProfile);

// Job management routes for companies
router.post("/job", verifyJWT, postJob);               // Post a new job
router.get("/jobs", verifyJWT, getMyJobs);             // Get all my jobs
router.get("/job/:jobId", verifyJWT, getMyJobById);    // Get specific job
router.put("/job/:jobId", verifyJWT, updateMyJob);     // Update specific job
router.delete("/job/:jobId", verifyJWT, deleteMyJob);  // Delete specific job

// Logout route for company
router.post("/logout", (req, res) => {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default router;
