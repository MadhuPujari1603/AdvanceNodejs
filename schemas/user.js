import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import express from "express";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
},
password:{
  type:String,
  required:true
},
phone:{
    type:Number,
    required:true,
    unique:true
},
role:{
  type:String,
  default:"user"
},
date:{
  
  type:Date,
  default:Date.now
},
aadharDetails: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Aadhar"
}
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
const User = mongoose.model("User",userSchema);
export default User
  