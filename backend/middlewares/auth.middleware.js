import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apierror.js";
import asynchandler from "../utils/asynchandler.js";
import Student from "../models/student.models.js";
import Company from "../models/company.models.js";
import Admin from "../models/admin.models.js";

// Middleware to verify JWT, fetch user from DB, and set req.user
export const verifyJWT = asynchandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let user = await Student.findById(decodedToken?.id).select("-password -refreshtoken");
    if (!user) {
      user = await Company.findById(decodedToken?._id).select("-password -refreshtoken");
    }
    if (!user) {
      user = await Admin.findById(decodedToken?._id).select("-password -refreshtoken");
    }
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

// Middleware to check if the authenticated user is an admin
export function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No user info found.' });
  }
  if (req.user.role && req.user.role.toLowerCase() === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied: Admins only.' });
}
export const isAuthenticated = asynchandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No user info found.' });
  }
  next();
});