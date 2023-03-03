import * as express from "express";
import UserController from "../controllers/userController";

const userRouter = express.Router();

const userController = UserController.getInstance();
userRouter.post("/login", userController.Login);

export default userRouter;
