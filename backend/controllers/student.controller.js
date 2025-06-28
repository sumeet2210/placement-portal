import Application from "../models/application.models.js";
import Student from "../models/student.models.js";

// Get all applications for the logged-in student
export const getStudentApplications = async (req, res) => {
    try {
        const studentEmail = req.user.email; // assuming req.user is set by auth middleware
        const applications = await Application.find({ email: studentEmail })
            .populate("job");
        res.json({ success: true, applications });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch applications", error: error.message });
    }
};

// Get profile for the logged-in student
export const  getStudentProfile = async (req, res) => {
    try {
        const studentEmail = req.user.email;
        const student = await Student.findOne({ email: studentEmail }).select("-password -refreshtoken");
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.json({ success: true, student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch student profile", error: error.message });
    }
};