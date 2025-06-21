import asynchandler from "../utils/asynchandler.js";
import Student from "../models/student.models.js";
import Admin from "../models/admin.models.js";
import Company from "../models/company.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/apierror.js";
import { uploadResult } from "../config/cloudinary.js";
const registerStudent = asynchandler(async (req, res) => {
    // take input form the user
    // validate if it is empty or not
    // check if the user already exists
    //hash the password
    //create new obj in database
    // check for user creation
    // return the response after removing password and secretcode

    const { fullname, email, branch, year, password, gender, profilepic, rollno } = req.body;

    if (!fullname || !email || !branch || !year || !password || !gender || !rollno) {
        throw new ApiError(400, `all fields are required ${profilepic}`);
    }

    const existingStudent = await Student.findOne({
        $or: [{ email }, { rollno }]
    });
     if (existingStudent) {
        throw new ApiError(400, "Student already exists");
    }
    const profilepiclocalpath = req.files?.profilepic[0]?.path;
    if(!profilepiclocalpath){
        throw new ApiError(405, "Profile picture is required");
    }
    const profile = await uploadResult(profilepiclocalpath);

    if (!profile) {
        throw new ApiError(400, `Profile picture upload failed ${profile}`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
        fullname,
        email,
        branch,
        year,
        password: hashedPassword,
        gender,
        profilepic: profile.url,
        rollno
    });

    await student.save();
    res.status(201).json({
        message: "Student registered successfully",
        student: {
            id: student._id,
            fullname: student.fullname,
            email: student.email,
            branch: student.branch,
            year: student.year,
            gender: student.gender,
            profilepic: student.profilepic.url,
            rollno: student.rollno
        }
    }); 
});
const registerAdmin = asynchandler(async (req, res) => {
    const {name,email,password,secretcode,profilepic} = req.body;
    if (!name || !email || !password || !secretcode || !profilepic) {
        throw new ApiError(400, "All fields are required");
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        throw new ApiError(400, "Admin already exists");
    }
    const profilepiclocalpath = req.file?.profilepic[0].path;
    if(!profilepiclocalpath){
        throw new ApiError(400, "Profile picture is required");
    }
    const profile = await uploadResult(profilepiclocalpath);
    if (!profile) {
        throw new ApiError(400, "Profile picture upload failed");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if(secretcode===process.env.ADMIN_SECRET_CODE){
    const admin = new Admin({
        name,
        email,
        password: hashedPassword,
        secretcode,
        profilepic: profile.url
    });
    await admin.save();
    res.status(201).json({
        message: "Admin registered successfully",
        admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            secretcode: admin.secretcode,
            profilepic: admin.profilepic.url
        }
    });
}
else{
    throw new ApiError(400, "Invalid secret code");
}
});
const registerCompany = asynchandler(async (req, res) => {
    const { name, email, password, address, website, description, contactPerson, contactNumber, companyfield, companylogo } = req.body;
    if (!name || !email || !password || !address || !website || !description || !contactPerson || !contactNumber || !companyfield || !companylogo) {
        throw new ApiError(400, "All fields are required");
    }
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
        throw new ApiError(400, "Company already exists");
    }
    const companylogoLocalPath = req.file?.companylogo[0].path;
    if (!companylogoLocalPath) {
        throw new ApiError(400, "Company logo is required");
    }
    const logo = await uploadResult(companylogoLocalPath);
    if (!logo) {
        throw new ApiError(400, "Company logo upload failed");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = new Company({
        name,
        email,
        password: hashedPassword,
        address,
        website,
        description,
        contactPerson,
        contactNumber,
        companyfield,
        companylogo: logo.url
    });
    await company.save();
    res.status(201).json({
        message: "Company registered successfully",
        company: {
            id: company._id,
            name: company.name,
            email: company.email,
            address: company.address,
            website: company.website,
            description: company.description,
            contactPerson: company.contactPerson,
            contactNumber: company.contactNumber,
            companyfield: company.companyfield
        }
    }); 
});
export { registerStudent, registerAdmin, registerCompany };
