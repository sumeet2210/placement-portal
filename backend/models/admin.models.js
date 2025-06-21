import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const adminmodel = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    secretcode: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    usermodel: {
        type: String,
        default: "admin"
    },
    profilepic: {
        type: String,
       required: true,
    }
}, { timestamps: true });

// Hash password and secretcode before saving
adminmodel.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    if (this.isModified("secretcode")) {
        this.secretcode = await bcrypt.hash(this.secretcode, 10);
    }
    next();
});

export default mongoose.model("Admin", adminmodel);