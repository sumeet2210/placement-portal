import mongoose, { Schema } from "mongoose";
const applicationmodel = new Schema({
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

export default mongoose.model("Application", applicationmodel);