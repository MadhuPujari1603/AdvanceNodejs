import User from "../schemas/user.js";
import Adhar from "../schemas/adhar.js";
import asynchandler from "express-async-handler";
import bcrypt from "bcryptjs";

export const adduser = asynchandler(async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                msg: "user already exists with this email or phone number",
            });
        }
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || "user",
        });
        return res.status(201).json({
            success: true,
            msg: "user created succesffully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status,

            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            mesg: "error creating in user",
        })
    }

});

export const getUsers = asynchandler(async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({
                success: false,
                msg: "no users found",
            });
        }
        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "error getting users",
        });
    }

});

export const getUserById = asynchandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "user not found",
            });

        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "error getting user",

        });
    }
});

export const deleteUser = asynchandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "user not found",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "error deleting user",
        });
    }

});

export const updateUser = asynchandler(async (req, res) => {
    try {
        
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true});
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "No user found with this ID"
            });
        }
        updatedUser.save();
        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User updated successfully"
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating user"
        });
    }
});


export const findByPhone = asynchandler(async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.params.phone });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "user not found",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "error getting user",
        });
    }
});

export  const findByUserNameContaining = asynchandler(async (req, res) => {
    try {
        const user = await User.find({ name: { $regex: req.params.name, $options: "i" } });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "user not found",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error); 
        return res.status(500).json({
            success: false,
            msg: "error getting user",      
        });

    }       


});


 export const  finduserByAdhar = asynchandler(async (req, res) => {
    try {
        
        const user = await User.findOne({ adharNumber: req.params.adharNumber });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "user not found",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "error getting user",
        });
    }
});


export const login = asynchandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "user not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "Invalid credentials",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {        
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "error logging in",
        });
    }
});












