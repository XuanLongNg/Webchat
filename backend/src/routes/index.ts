import * as express from "express";
import userRouter from "./userRouter";
const appRouter = express.Router();

appRouter.use("/user", userRouter);

export default appRouter;
