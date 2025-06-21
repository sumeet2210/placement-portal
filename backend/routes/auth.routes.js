import express from "express";
import { registerStudent, registerAdmin, registerCompany } from "../controllers/auth.controller.js";
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

export default router;
