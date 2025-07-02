import express from "express";
import { getCompanyProfile, postJob } from "../controllers/company.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get profile for the logged-in company
router.get("/profile", verifyJWT, getCompanyProfile);

// Post a new job for the logged-in company
router.post("/job", verifyJWT, postJob);

// Logout route for company
router.post("/logout", (req, res) => {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default router;
