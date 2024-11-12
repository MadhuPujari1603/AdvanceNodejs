import  mongoose from "mongoose";
import bcrypt from "bcryptjs";
import express from "express";
import User from "./user.js";

const AdharSchema = new mongoose.Schema({
    aadharNumber: {
        type: String,
        required: [true, 'Aadhaar number is required'],
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Adhar', AdharSchema);

    