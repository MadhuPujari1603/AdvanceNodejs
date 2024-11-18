import express from "express";
import { adduser, deleteUser, findByPhone, findByUserNameContaining, getUserById, getUsers, updateUser,login } from "../controller/userController.js";


const userRouter = express.Router();

userRouter.route("/addUser").post(adduser);
userRouter.route("/getUsers").get(getUsers);
userRouter.route("/deleteUser/:id").delete(deleteUser);
userRouter.route("/getUserById/:id").get(getUserById);
userRouter.route("/updateUser/:id").post(updateUser);
userRouter.route("/findByPhone/:phone").get(findByPhone);
userRouter.route("/findByUserNameContaining/:name").get(findByUserNameContaining);
userRouter.route("/login").post(login);

export default userRouter;