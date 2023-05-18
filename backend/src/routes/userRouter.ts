import * as express from "express";
import UserController from "../controllers/userController";

const userRouter = express.Router();

const userController = UserController.getInstance();
userRouter.post("/", userController.isLogin);
userRouter.post("/login", userController.Login);
userRouter.post("/register", userController.Register);
userRouter.get("/getListChats", userController.getListChats);
userRouter.post("/getInfoBoxChat", userController.getInfoBoxChat);
userRouter.post("/getProfile", userController.getProfile);
userRouter.post("/sendMessage", userController.sendMessage);
userRouter.post("/getMessage", userController.getMessage);
userRouter.post("/addFriend", userController.addFriend);
userRouter.post("/newGroup", userController.createGroup);
userRouter.post("/getSmallInformation", userController.getSmallInformation);
export default userRouter;
