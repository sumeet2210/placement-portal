import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
 
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    website: {
        type: String
    },
    description: {
        type: String
    },
    contactPerson: {
        type: String
    },
    contactNumber: {
        type: String
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

// Hash password before saving
companySchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const Company = mongoose.model('Company', companySchema);
export default Company;