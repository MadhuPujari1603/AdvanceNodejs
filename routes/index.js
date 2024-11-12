import expressRouter from "express";
import userRouter from "./userRoutes.js";
import adharRouter from "./adharRoutes.js";

const router = expressRouter();

router.use("/user", userRouter);
router.use("/adhar",adharRouter);

export default router;