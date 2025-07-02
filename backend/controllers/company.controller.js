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
