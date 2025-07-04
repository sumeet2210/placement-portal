import express from "express";
import { 
    applyForJob, 
    getStudentApplications, 
    getApplicationById, 
    getAllApplications, 
    updateApplicationStatus 
} from "../controllers/application.controller.js";
// import { logincheck } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Student routes
router.post("/apply", verifyJWT, upload.fields([{ name: "resume", maxCount: 1 }]), applyForJob);
router.get("/my-applications", verifyJWT, getStudentApplications);
router.get("/:applicationId", verifyJWT, getApplicationById);

// Admin/Company routes
router.get("/", verifyJWT, getAllApplications);
router.patch("/:applicationId/status", verifyJWT, updateApplicationStatus);

export default router;
