import Application from "../models/application.models.js";
import Job from "../models/job.models.js";
import Student from "../models/student.models.js";
import asynchandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { uploadResult } from "../config/cloudinary.js";

// Apply for a job
const applyForJob = asynchandler(async (req, res) => {
    const { 
        name, 
        email, 
        year, 
        branch, 
        cgpa, 
        linkedin, 
        github, 
        personalDescription, 
        phone, 
        jobId 
    } = req.body;

    // Validate required fields
    if (!name || !email || !year || !branch || !cgpa || !jobId) {
        throw new ApiError(400, "All required fields must be provided");
    }

    // Check if resume file is uploaded
    const resumeLocalPath = req.files?.resume?.[0]?.path;
    if (!resumeLocalPath) {
        throw new ApiError(400, "Resume file is required");
    }

    // Verify the job exists
    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    // Get student from JWT token
    const student = await Student.findById(req.user.id);
    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    // Check if student has already applied for this job
    const existingApplication = await Application.findOne({
        student: student._id,
        job: jobId
    });

    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this job");
    }

    // Upload resume to cloudinary
    const resumeUpload = await uploadResult(resumeLocalPath);
    if (!resumeUpload) {
        throw new ApiError(400, "Resume upload failed");
    }

    // Create new application
    const application = new Application({
        student: student._id,
        name,
        email,
        year,
        branch,
        cgpa,
        resume: resumeUpload.url,
        linkedin,
        github,
        personalDescription,
        phone,
        job: jobId,
        status: "pending"
    });

    await application.save();

    res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        application: {
            id: application._id,
            status: application.status,
            appliedAt: application.createdAt
        }
    });
});

// Get all applications for the logged-in student
const getStudentApplications = asynchandler(async (req, res) => {
    const studentId = req.user.id;

    const applications = await Application.find({ student: studentId })
        .populate({
            path: 'job',
            select: 'title company location salary deadline status'
        })
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        applications
    });
});

// Get a specific application by ID
const getApplicationById = asynchandler(async (req, res) => {
    const { applicationId } = req.params;
    const studentId = req.user.id;

    const application = await Application.findOne({
        _id: applicationId,
        student: studentId
    }).populate({
        path: 'job',
        select: 'title company location salary deadline status'
    });

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    res.status(200).json({
        success: true,
        application
    });
});

// Get all applications for admin/company
const getAllApplications = asynchandler(async (req, res) => {
    const { jobId } = req.query;
    
    let filter = {};
    if (jobId) {
        filter.job = jobId;
    }

    const applications = await Application.find(filter)
        .populate({
            path: 'student',
            select: 'fullname email branch year'
        })
        .populate({
            path: 'job',
            select: 'title company location'
        })
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        applications
    });
});

// Update application status (for admin/company)
const updateApplicationStatus = asynchandler(async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status. Must be pending, approved, or rejected");
    }

    const application = await Application.findById(applicationId);
    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    application.status = status;
    await application.save();

    res.status(200).json({
        success: true,
        message: `Application ${status} successfully`,
        application
    });
});

export {
    applyForJob,
    getStudentApplications,
    getApplicationById,
    getAllApplications,
    updateApplicationStatus
};
