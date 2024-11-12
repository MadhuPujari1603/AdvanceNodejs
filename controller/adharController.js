import Adhar from "../schemas/adhar.js";
import asyncHandler from "express-async-handler";
import User from "../schemas/user.js";


export const addAadhar = asyncHandler(async (req, res) => {
    try {
        const { aadharNumber, user } = req.body;

        if (!aadharNumber || !user) {
            return res.status(400).json({
                success: false,
                msg: "Please provide all required fields",
            });
        }

        const existingAdhar = await Adhar.findOne({ aadharNumber });
        if (existingAdhar) {
            return res.status(409).json({
                success: false,
                msg: "Aadhaar number already exists",
            });
        }

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        const adhar = await Adhar.create({
            aadharNumber,
            user,
        });

        return res.status(201).json({
            success: true,
            adhar,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error adding Aadhaar",
        });
    }
});

export const getAadhar = asyncHandler(async (req, res) => {
    try {
        const adhar = await Adhar.findById(req.params.id);
        if (!adhar) {
            return res.status(404).json({
                success: false,
                msg: "Aadhaar not found",
            });
        }
        return res.status(200).json({
            success: true,
            adhar,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error getting Aadhaar",
        });
    }
});

export const updateAdhar = asyncHandler(async (req, res) => {
    try {
        const { aadharNumber } = req.body;
        const adhar = await Adhar.findByIdAndUpdate(req.params.id, { aadharNumber }, { new: true });
        if (!adhar) {
            return res.status(404).json({
                success: false,
                msg: "Aadhaar not found",
            });
        }
        return res.status(200).json({
            success: true,
            adhar,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error updating Aadhaar",
        }); 
    }
});

export const findByUserId = asyncHandler(async (req, res) => {
    try {
        const adhar = await Adhar.findOne({ user: req.params.id });
        if (!adhar) {
            return res.status(404).json({
                success: false,
                msg: "Aadhaar not found",
            });
        }
        return res.status(200).json({
            success: true,
            adhar,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error getting Aadhaar",
        });
    }
});


       