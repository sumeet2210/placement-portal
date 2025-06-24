import express from "express";
import { postjob } from "../controllers/job.controller.js";
import { getAllJobs } from "../controllers/job.controller.js";
import { logincheck } from "../middlewares/auth.middleware.js";
// import other job-related controllers as needed

const router = express.Router();

// Route to post a new job (should be protected)
router.post("/job/create", logincheck, postjob);

// Route to get all available jobs (for students/admins, can be public or protected as needed)
router.get("/job/all", getAllJobs);

// You can add more routes here, e.g.:
// router.get('/:id', getJobById);
// router.put('/:id', updateJob);
// router.delete('/:id', deleteJob);

export default router;
