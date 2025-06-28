import Company from "../models/company.models.js";

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
