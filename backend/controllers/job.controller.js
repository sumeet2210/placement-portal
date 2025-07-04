import Company from "../models/company.models.js";
import asynchandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Job from "../models/job.models.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
const postjob = asynchandler(async (req, res) => {
    const { title, description, requirements, salary, location, companyId } = req.body;

    if (!title || !description || !requirements || !salary || !location || !companyId) {
        throw new ApiError(400, "All fields are required");
    }

    const company = await Company.findById(companyId);
    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    const job = await Job.create({
        title,
        description,
        requirements,
        salary,
        location,
        company: companyId
    });

    company.jobs.push(job._id);
    await company.save();

    return res.status(201).json(new ApiResponse(true, job, "Job posted successfully"));
});
const getAllJobs = asynchandler(async (req, res) => {
    const jobs = await Job.find().populate('company', 'name');
    return res.status(200).json({ success: true, jobs });
});
export { postjob, getAllJobs };