import express from "express";
import { addAadhar,getAadhar,findByUserId,updateAdhar } from "../controller/adharController.js";

const adharRouter = express.Router();   

adharRouter.route("/addAdhar").post(addAadhar);
adharRouter.route("/getAdhar").get(getAadhar);
adharRouter.route("/findByUserId/:id").get(findByUserId);
adharRouter.route("/updateAdhar/:id").put(updateAdhar);


export default adharRouter