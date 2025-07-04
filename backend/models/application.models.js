import mongoose, { Schema } from "mongoose";
const applicationmodel = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true // Reference to the student who applied
    },
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    resume: {
        type: String,
        required: true // URL or file path
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    personalDescription: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true // Reference to job
    },
    status: {
        type: String,
        default: "pending" // e.g., pending/approved/rejected
    }
}, { timestamps: true });

// Create a compound unique index to ensure one application per student per job
applicationmodel.index({ student: 1, job: 1 }, { unique: true });

export default mongoose.model("Application", applicationmodel);