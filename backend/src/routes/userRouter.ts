import * as express from "express";
import UserController from "../controllers/userController";

const userRouter = express.Router();

const userController = UserController.getInstance();
userRouter.get("/all", userController.Login);

export default userRouter;
