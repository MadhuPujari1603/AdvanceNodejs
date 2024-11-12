import express from "express";
import { addAadhar,getAadhar,findByUser,updateAdhar } from "../controller/adharController.js";

const adharRouter = express.Router();   

adharRouter.route("/addAdhar").post(addAadhar);
adharRouter.route("/getAdhar").get(getAadhar);
adharRouter.route("/findByUser/:id").get(findByUser);
adharRouter.route("/updateAdhar/:id").put(updateAdhar);


export default adharRouter