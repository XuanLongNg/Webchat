import * as express from "express";
import UserController from "../controllers/userController";

const userRouter = express.Router();

const userController = UserController.getInstance();
userRouter.get("/", userController.isLogin);
userRouter.post("/login", userController.Login);
userRouter.post("/register", userController.Register);
userRouter.get("/getListChats", userController.getListChats);
userRouter.get("/getInfoBoxChat", userController.getInfoBoxChat);
userRouter.get("/getProfile", userController.getProfile);

export default userRouter;
