import mongoose, { Schema } from "mongoose";
const jobmodel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String
    },
    requirements: [{
        type: String
    }],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    },
    status: {
        type: String,
        default: "pending"
    }, // pending/approved/closed
    deadline: {
        type: Date
    }
}, { timestamps: true });

export default mongoose.model("Job", jobmodel);