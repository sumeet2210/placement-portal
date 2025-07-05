import asynchandler from "../utils/asynchandler.js";
import Admin from "../models/admin.models.js";
import Student from "../models/student.models.js";

const getPendingCompanies = asynchandler(async (req, res) => {
    const pendingCompanies = await req.db.Company.find({ status: "pending" });
    return res.status(200).json({
        success: true,
        data: pendingCompanies,
        message: "Pending companies retrieved successfully"
    });
});
const approveCompany = asynchandler(async (req, res) => {
    const { companyId } = req.body;
    if (!companyId) {
        return res.status(400).json({
            success: false,
            message: "Company ID is required"
        });
    }

    const company = await req.db.Company.findById(companyId);
    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company not found"
        });
    }

    company.status = "approved";
    await company.save();

    return res.status(200).json({
        success: true,
        data: company,
        message: "Company approved successfully"
    });
});
const rejectCompany = asynchandler(async (req, res) => {
    const { companyId } = req.body;
    if (!companyId) {
        return res.status(400).json({
            success: false,
            message: "Company ID is required"
        });
    }

    const company = await req.db.Company.findById(companyId);
    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company not found"
        });
    }

    company.status = "rejected";
    await company.save();

    return res.status(200).json({
        success: true,
        data: company,
        message: "Company rejected successfully"
    });
});
const getPendingJobs = asynchandler(async (req, res) => {
    const pendingJobs = await req.db.Job.find({ status: "pending" });
    return res.status(200).json({
        success: true,
        data: pendingJobs,
        message: "Pending jobs retrieved successfully"
    });
}); 
const approveJob = asynchandler(async (req, res) => {
    const { jobId } = req.body;
    if (!jobId) {
        return res.status(400).json({
            success: false,
            message: "Job ID is required"
        });
    }

    const job = await req.db.Job.findById(jobId);
    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found"
        });
    }

    job.status = "approved";
    await job.save();

    return res.status(200).json({
        success: true,
        data: job,
        message: "Job approved successfully"
    });
});
const rejectJob = asynchandler(async (req, res) => {
    const { jobId } = req.body;
    if (!jobId) {
        return res.status(400).json({
            success: false,
            message: "Job ID is required"
        });
    }

    const job = await req.db.Job.findById(jobId);
    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found"
        });
    }

    job.status = "rejected";
    await job.save();

    return res.status(200).json({
        success: true,
        data: job,
        message: "Job rejected successfully"
    });
});
// Get profile for the logged-in admin
export const getAdminProfile = async (req, res) => {
    try {
        const adminEmail = req.user.email;
        const admin = await Admin.findOne({ email: adminEmail }).select("-password -refreshtoken");
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }
        res.json({ success: true, admin });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch admin profile", error: error.message });
    }
};
const getAllApplications = asynchandler(async (req, res) => {
    try {
        const applications = await req.db.Application.find();
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch applications", error: error.message });
    }
});
const getAllStudents = asynchandler(async (req, res) => {
    try {
        console.log('📋 Fetching all students from database...');
        const rawStudents = await Student.find();
        console.log('👥 Found', rawStudents.length, 'students');
        
        // Map the database fields to frontend-expected field names
        const students = rawStudents.map(student => ({
            _id: student._id,
            name: student.fullname,           // Map fullname -> name
            email: student.email,
            rollNumber: student.rollno,       // Map rollno -> rollNumber
            branch: student.branch,
            year: student.year,
            gender: student.gender,
            profilepic: student.profilepic,
            status: 'active',                 // Default status
            usermodel: student.usermodel,
            cgpa: student.cgpa || 'N/A'       // Add CGPA if available
        }));
        
        console.log('✅ Mapped students:', students);
        
        res.status(200).json({ 
            success: true, 
            students: students,
            message: `Retrieved ${students.length} students successfully` 
        });
    } catch (error) {
        console.error('❌ Error fetching students:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch students", 
            error: error.message 
        });
    }
});
export {
    getPendingCompanies,
    approveCompany,
    rejectCompany,
    getPendingJobs,
    getAllStudents,
    approveJob,
    rejectJob,
    getAllApplications
};