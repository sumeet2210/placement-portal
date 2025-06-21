import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const studentschema = new Schema({
    fullname:{
        type: String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    branch:{
        type:String,
        required:true,
        index:true,
    },
    year:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true,
    },
    profilepic:{
        type: String,
        required:true,

    },
    rollno:{
        type:String,
        required:true,
        index:true,
    },
    usermodel: {
        type: String,
        default: "student",
    },
})
studentschema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
export default mongoose.model("Student", studentschema);