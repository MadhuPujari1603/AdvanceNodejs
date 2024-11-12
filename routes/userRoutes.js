import express from "express";
import { adduser, deleteUser, findByPhone, findByUserNameContaining, getUserById, getUsers, updateUser } from "../controller/userController.js";


const userRouter = express.Router();

userRouter.route("/addUser").post(adduser);
userRouter.route("/getUsers").get(getUsers);
userRouter.route("/deleteUser").delete(deleteUser);
userRouter.route("/getUserById/:id").get(getUserById);
userRouter.route("/updateUser/:id").put(updateUser);
userRouter.route("/findByPhone/:phone").get(findByPhone);
userRouter.route("/findByUserNameContaining/:name").get(findByUserNameContaining);

export default userRouter;