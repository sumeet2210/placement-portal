import asynchandler from "../utils/asynchandler";

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
export {
    getPendingCompanies,
    approveCompany,
    rejectCompany,
    getPendingJobs,
    approveJob,
    rejectJob
};