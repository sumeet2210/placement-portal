import express from "express";
import { getStudentApplications, getStudentProfile } from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get all applications for the logged-in student
router.get("/applications", verifyJWT, getStudentApplications);

// Get profile for the logged-in student
router.get("/profile", verifyJWT, getStudentProfile);

// Logout route for student
router.post("/logout", (req, res) => {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default router;