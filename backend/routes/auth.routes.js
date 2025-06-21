import express from "express";
import { registerStudent, registerAdmin, registerCompany,Login } from "../controllers/auth.controller.js";
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
// secure routes can be added here in the future
router.route("/login").post(upload.none(), Login);
export default router;
