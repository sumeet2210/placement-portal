import Company from "../models/company.models.js";
import Job from "../models/job.models.js";

// Get profile for the logged-in company
export const getCompanyProfile = async (req, res) => {
    try {
        const companyEmail = req.user.email;
        const company = await Company.findOne({ email: companyEmail }).select("-password -refreshtoken");
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }
        res.json({ success: true, company });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch company profile", error: error.message });
    }
};

// Post a new job for the logged-in company
export const postJob = async (req, res) => {
    try {
        const { title, location, salary, description, requirements, deadline } = req.body;
        const company = req.user.name || req.user.company || req.user.email; // fallback for company name
        const job = new Job({
            title,
            location,
            salary,
            description,
            requirements,
            deadline,
            company
        });
        await job.save();
        res.status(201).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to post job", error: error.message });
    }
};

// Get all jobs posted by the logged-in company
export const getMyJobs = async (req, res) => {
    try {
        const companyName = req.user.name || req.user.company || req.user.email;
        const companyId = req.user.id;
        
        // Find jobs by company name or company ID (depending on how jobs are stored)
        const jobs = await Job.find({ 
            $or: [
                { company: companyName },
                { postedBy: companyId }
            ]
        }).sort({ createdAt: -1 }); // Most recent first
        
        res.json({ 
            success: true, 
            jobs,
            totalJobs: jobs.length 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch company jobs", 
            error: error.message 
        });
    }
};

// Get a specific job posted by the logged-in company
export const getMyJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const companyName = req.user.name || req.user.company || req.user.email;
        const companyId = req.user.id;
        
        const job = await Job.findOne({ 
            _id: jobId,
            $or: [
                { company: companyName },
                { postedBy: companyId }
            ]
        });
        
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: "Job not found or you don't have permission to view it" 
            });
        }
        
        res.json({ success: true, job });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch job details", 
            error: error.message 
        });
    }
};

// Update a job posted by the logged-in company
export const updateMyJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { title, location, salary, description, requirements, deadline, status } = req.body;
        const companyName = req.user.name || req.user.company || req.user.email;
        const companyId = req.user.id;
        
        const job = await Job.findOne({ 
            _id: jobId,
            $or: [
                { company: companyName },
                { postedBy: companyId }
            ]
        });
        
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: "Job not found or you don't have permission to update it" 
            });
        }
        
        // Update job fields
        if (title) job.title = title;
        if (location) job.location = location;
        if (salary) job.salary = salary;
        if (description) job.description = description;
        if (requirements) job.requirements = requirements;
        if (deadline) job.deadline = deadline;
        if (status) job.status = status;
        
        await job.save();
        
        res.json({ 
            success: true, 
            message: "Job updated successfully",
            job 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to update job", 
            error: error.message 
        });
    }
};

// Delete a job posted by the logged-in company
export const deleteMyJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const companyName = req.user.name || req.user.company || req.user.email;
        const companyId = req.user.id;
        
        const job = await Job.findOne({ 
            _id: jobId,
            $or: [
                { company: companyName },
                { postedBy: companyId }
            ]
        });
        
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: "Job not found or you don't have permission to delete it" 
            });
        }
        
        await Job.findByIdAndDelete(jobId);
        
        res.json({ 
            success: true, 
            message: "Job deleted successfully" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to delete job", 
            error: error.message 
        });
    }
};
