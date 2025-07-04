import express from "express";
import { registerStudent, registerAdmin, registerCompany, Login, resetUserPassword } from "../controllers/auth.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();
router.route("/student/register").post(
    upload.fields([{ name: 'profilepic', maxCount: 1 }]),
    registerStudent
);

router.route("/admin/register").post(
    upload.fields([{ name: 'profilepic', maxCount: 1 }]),
    registerAdmin
);

router.route("/company/register").post(
    upload.fields([{ name: 'companylogo', maxCount: 1 }]),
    registerCompany
);

// Login route
router.route("/login").post(upload.none(), Login);

// Temporary password reset route (remove in production)
router.route("/reset-password").post(resetUserPassword);

export default router;
