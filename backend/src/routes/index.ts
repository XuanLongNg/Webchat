import * as express from "express";
import userRouter from "./userRouter";
import system from "./systemRoutes";
const appRouter = express.Router();
appRouter.use("/user", userRouter);
appRouter.use("/system", system);
export default appRouter;
