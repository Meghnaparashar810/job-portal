import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken";

import validator from "validator"

const userschema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "india"
    },
    role: {
        type: String,
        enum: ["student", "faculty"],
        default: "student"
    }
}, {
    timestamps: true
}

)


userschema.methods.createJWT = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

const User = mongoose.model('User', userschema)
export default User;
