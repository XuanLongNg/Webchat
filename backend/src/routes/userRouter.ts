import * as express from "express";
import UserController from "../controllers/userController";
import * as multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
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
userRouter.post(
  "/uploadImage",
  upload.single("image"),
  userController.uploadImage
);
userRouter.post("/searchData", userController.searchData);

export default userRouter;
